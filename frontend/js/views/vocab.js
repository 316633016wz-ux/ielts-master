import { getState, updateState } from "../state.js";
import { today } from "../utils/date.js";
import { escapeHTML, formNumber } from "../utils/html.js";
import { createVocabRecord, isDue, reviewVocab } from "../utils/sm2.js";
import { getThemes, VOCAB_DATABASE } from "../utils/vocab-data.js";

const FEEDBACK_KEY = "ielts-master-vocab-feedback";

export const renderVocab = {
  html(state) {
    const stats = getStats(state);
    const card = getNextCard(state);
    const themes = getThemes();
    const feedback = getFeedback();

    return `
      <div class="view-header">
        <h2 class="view-title">雅思词汇</h2>
        <p class="view-subtitle">先用小词表跑通记忆流程，后续可以持续扩展到完整雅思高频词库。</p>
      </div>

      <div class="vocab-progress-row">
        <div class="stat-card">
          <div class="stat-number">${stats.learned}</div>
          <div class="stat-label">已学</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${stats.due}</div>
          <div class="stat-label">待复习</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${stats.weak}</div>
          <div class="stat-label">未掌握</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${stats.mastered}</div>
          <div class="stat-label">已掌握</div>
        </div>
      </div>

      <section class="section grid-2">
        <div class="card">
          <h3 class="card-title">学习设置</h3>
          <form id="vocabSettingsForm">
            <div class="plan-form-row">
              <label class="label" for="dailyNew">每日新词数量</label>
              <input class="input" id="dailyNew" name="dailyNew" type="number" min="5" max="200" step="5" value="${state.vocabSettings.dailyNew}">
            </div>
            <div class="plan-form-row">
              <label class="label" for="theme">主题</label>
              <select class="input" id="theme" name="theme">
                <option value="all" ${state.vocabSettings.themes.includes("all") ? "selected" : ""}>全部主题</option>
                ${themes.map(theme => `
                  <option value="${escapeHTML(theme)}" ${state.vocabSettings.themes.includes(theme) ? "selected" : ""}>${escapeHTML(theme)}</option>
                `).join("")}
              </select>
            </div>
            <button class="btn btn-secondary btn-full" type="submit">保存设置</button>
          </form>
        </div>

        <div class="card">
          <h3 class="card-title">今日队列</h3>
          <p class="card-subtitle">今日新词 ${stats.newToday}/${state.vocabSettings.dailyNew}，已复习 ${stats.reviewedToday} 个；词库共 ${VOCAB_DATABASE.length} 个词。</p>
          <div class="progress-bar">
            <div class="progress-fill success" style="width:${stats.progress}%"></div>
          </div>
        </div>
      </section>

      ${feedback ? renderFeedback(feedback) : ""}

      <section class="section grid-2">
        ${renderWordPanel("未掌握词", getWeakWords(state), "不认识/模糊会进入这里，多次答对后移出。", "badge-red")}
        ${renderWordPanel("已掌握词", getMasteredWords(state), "连续多次答对并达到间隔复习要求后进入这里。", "badge-green")}
      </section>

      ${card ? renderCard(card, state) : `
        <div class="card empty-state">
          <div class="empty-state-icon">✅</div>
          <div class="empty-state-text">这一轮词汇完成了。可以继续学习新词，也可以休息一下。</div>
          <div class="view-actions" style="justify-content:center">
            <button class="btn btn-primary" data-more-new-words type="button">再学 10 个新词</button>
          </div>
        </div>
      `}
    `;
  },

  mount(container, context) {
    container.querySelector("#vocabSettingsForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      const theme = form.elements.theme.value;
      updateState({
        vocabSettings: {
          dailyNew: Math.min(200, Math.max(5, formNumber(form, "dailyNew", 20))),
          themes: [theme],
        },
      });
      context.refresh();
    });

    container.querySelector("[data-dismiss-feedback]")?.addEventListener("click", () => {
      sessionStorage.removeItem(FEEDBACK_KEY);
      context.refresh();
    });

    container.querySelector("[data-more-new-words]")?.addEventListener("click", () => {
      const state = getState();
      updateState({
        vocabSettings: {
          dailyNew: Math.min(200, (state.vocabSettings.dailyNew || 20) + 10),
        },
      });
      context.refresh();
    });

    container.querySelector("[data-flip-card]")?.addEventListener("click", event => {
      const card = event.currentTarget;
      card.classList.add("flipped");
      container.querySelector("[data-answer-hint]")?.setAttribute("hidden", "");
      container.querySelectorAll("[data-quality]").forEach(button => {
        button.disabled = false;
      });
    });

    container.querySelectorAll("[data-quality]").forEach(button => {
      button.addEventListener("click", () => {
        const state = getState();
        const word = VOCAB_DATABASE.find(item => item.id === button.dataset.wordId);
        if (!word) return;
        const quality = Number(button.dataset.quality);
        const updated = reviewVocab(word, state.vocab[word.id], quality);
        updateState({ vocab: { [word.id]: updated } });
        if (quality < 3) {
          sessionStorage.setItem(FEEDBACK_KEY, JSON.stringify({
            word,
            record: updated,
            label: quality === 0 ? "不认识" : "模糊",
          }));
        } else {
          sessionStorage.removeItem(FEEDBACK_KEY);
        }
        context.refresh();
      });
    });
  },
};

function renderCard(word, state) {
  const record = state.vocab[word.id] || createVocabRecord(word);
  const isWeak = record.status === "weak" || (record.weakCount || 0) > 0;
  return `
    <section class="section">
      <div class="vocab-card-wrapper" data-flip-card>
        <div class="vocab-card-inner">
          <div class="vocab-face vocab-face-front">
            <div class="vocab-word">${escapeHTML(word.word)}</div>
            ${word.phonetic ? `<div class="vocab-phonetic">${escapeHTML(word.phonetic)}</div>` : ""}
            <div class="vocab-hint">先想意思，再点击卡片查看释义和例句</div>
            <span class="badge badge-blue vocab-theme">${escapeHTML(word.theme)}</span>
            ${isWeak ? `<span class="badge badge-red vocab-theme">薄弱词</span>` : ""}
          </div>
          <div class="vocab-face vocab-face-back">
            <div class="vocab-word vocab-word-small">${escapeHTML(word.word)}</div>
            <div class="vocab-meaning">${escapeHTML(word.meaning)}</div>
            ${word.englishMeaning ? `<div class="vocab-english">${escapeHTML(word.englishMeaning)}</div>` : ""}
            <div class="vocab-example">${escapeHTML(word.example)}</div>
            <div class="vocab-meta">
              <span>主题：${escapeHTML(word.theme)}</span>
              <span>来源：${escapeHTML(word.source || "curated")}</span>
              <span>下次复习：${escapeHTML(record.nextReview)}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="vocab-answer-hint" data-answer-hint>先点击卡片看释义，再选择熟悉度。</div>
      <div class="vocab-actions">
        <button class="vocab-btn vocab-btn-again" data-word-id="${word.id}" data-quality="0" type="button" disabled>不认识</button>
        <button class="vocab-btn vocab-btn-hard" data-word-id="${word.id}" data-quality="2" type="button" disabled>模糊</button>
        <button class="vocab-btn vocab-btn-good" data-word-id="${word.id}" data-quality="4" type="button" disabled>认识</button>
        <button class="vocab-btn vocab-btn-easy" data-word-id="${word.id}" data-quality="5" type="button" disabled>熟练</button>
      </div>
    </section>
  `;
}

function getNextCard(state) {
  const words = getEnabledWords(state);
  const weakDueWord = words.find(word => isWeakRecord(state.vocab[word.id]) && isDue(state.vocab[word.id]));
  if (weakDueWord) return weakDueWord;

  const dueWord = words.find(word => isDue(state.vocab[word.id]));
  if (dueWord) return dueWord;

  const weakWord = words.find(word => isWeakRecord(state.vocab[word.id]));
  if (weakWord) return weakWord;

  const todayNewCount = Object.values(state.vocab).filter(record => record.firstSeen === today()).length;
  if (todayNewCount >= state.vocabSettings.dailyNew) return null;
  return words.find(word => !state.vocab[word.id]) || null;
}

function getEnabledWords(state) {
  const themes = state.vocabSettings.themes || ["all"];
  if (themes.includes("all")) return VOCAB_DATABASE;
  return VOCAB_DATABASE.filter(word => themes.includes(word.theme));
}

function getStats(state) {
  const records = Object.values(state.vocab);
  const learned = records.length;
  const mastered = records.filter(record => record.status === "mastered").length;
  const weak = records.filter(isWeakRecord).length;
  const due = records.filter(isDue).length;
  const reviewedToday = records.filter(record => record.lastReview === today()).length;
  const newToday = records.filter(record => record.firstSeen === today()).length;
  return {
    learned,
    mastered,
    weak,
    due,
    reviewedToday,
    newToday,
    progress: Math.min(100, Math.round((newToday / Math.max(1, state.vocabSettings.dailyNew)) * 100)),
  };
}

function isWeakRecord(record) {
  return Boolean(record && (record.status === "weak" || (record.weakCount || 0) > 0));
}

function getWeakWords(state) {
  return VOCAB_DATABASE
    .filter(word => isWeakRecord(state.vocab[word.id]))
    .sort((a, b) => (state.vocab[b.id]?.weakCount || 0) - (state.vocab[a.id]?.weakCount || 0))
    .slice(0, 8);
}

function getMasteredWords(state) {
  return VOCAB_DATABASE
    .filter(word => state.vocab[word.id]?.status === "mastered")
    .slice(0, 8);
}

function renderWordPanel(title, words, subtitle, badgeClass) {
  return `
    <div class="card">
      <h3 class="card-title">${escapeHTML(title)}</h3>
      <p class="card-subtitle">${escapeHTML(subtitle)}</p>
      ${words.length ? `
        <div class="vocab-word-list">
          ${words.map(word => `
            <span class="badge ${badgeClass}">${escapeHTML(word.word)}</span>
          `).join("")}
        </div>
      ` : `
        <div class="empty-state">
          <div class="empty-state-text">暂无词汇。</div>
        </div>
      `}
    </div>
  `;
}

function renderFeedback(feedback) {
  const word = feedback.word;
  const record = feedback.record;
  return `
    <section class="section">
      <div class="card vocab-feedback">
        <span class="badge badge-red">已加入未掌握 · ${escapeHTML(feedback.label)}</span>
        <h3 class="vocab-feedback-word">${escapeHTML(word.word)}</h3>
        ${word.phonetic ? `<div class="vocab-phonetic">${escapeHTML(word.phonetic)}</div>` : ""}
        <div class="vocab-meaning">${escapeHTML(word.meaning)}</div>
        ${word.englishMeaning ? `<div class="vocab-english">${escapeHTML(word.englishMeaning)}</div>` : ""}
        <div class="vocab-example">${escapeHTML(word.example)}</div>
        <p class="view-subtitle">这个词会优先反复出现。连续答对后，未掌握次数会下降；达到掌握标准后进入已掌握。</p>
        <div class="vocab-meta">
          <span>未掌握次数：${record.weakCount || 0}</span>
          <span>下次复习：${escapeHTML(record.nextReview)}</span>
        </div>
        <div class="view-actions">
          <button class="btn btn-primary" data-dismiss-feedback type="button">继续练习</button>
        </div>
      </div>
    </section>
  `;
}

function getFeedback() {
  try {
    return JSON.parse(sessionStorage.getItem(FEEDBACK_KEY));
  } catch {
    return null;
  }
}
