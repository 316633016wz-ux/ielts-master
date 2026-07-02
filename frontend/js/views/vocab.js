import { getState, updateState } from "../state.js";
import { today } from "../utils/date.js";
import { escapeHTML, formNumber } from "../utils/html.js";
import { createVocabRecord, isDue, reviewVocab } from "../utils/sm2.js";
import { getThemes, VOCAB_DATABASE } from "../utils/vocab-data.js";

export const renderVocab = {
  html(state) {
    const stats = getStats(state);
    const card = getNextCard(state);
    const themes = getThemes();

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
              <input class="input" id="dailyNew" name="dailyNew" type="number" min="5" max="50" step="5" value="${state.vocabSettings.dailyNew}">
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
          <p class="card-subtitle">今日已复习 ${stats.reviewedToday} 个，词库共 ${VOCAB_DATABASE.length} 个示例词。</p>
          <div class="progress-bar">
            <div class="progress-fill success" style="width:${stats.progress}%"></div>
          </div>
        </div>
      </section>

      ${card ? renderCard(card, state) : `
        <div class="card empty-state">
          <div class="empty-state-icon">✅</div>
          <div class="empty-state-text">今天的词汇任务完成了。明天会自动出现新的复习队列。</div>
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
          dailyNew: Math.min(50, Math.max(5, formNumber(form, "dailyNew", 20))),
          themes: [theme],
        },
      });
      context.refresh();
    });

    container.querySelector("[data-flip-card]")?.addEventListener("click", event => {
      event.currentTarget.classList.toggle("flipped");
    });

    container.querySelectorAll("[data-quality]").forEach(button => {
      button.addEventListener("click", () => {
        const state = getState();
        const word = VOCAB_DATABASE.find(item => item.id === button.dataset.wordId);
        if (!word) return;
        const updated = reviewVocab(word, state.vocab[word.id], Number(button.dataset.quality));
        updateState({ vocab: { [word.id]: updated } });
        context.refresh();
      });
    });
  },
};

function renderCard(word, state) {
  const record = state.vocab[word.id] || createVocabRecord(word);
  return `
    <section class="section">
      <div class="vocab-card-wrapper" data-flip-card>
        <div class="vocab-card-inner">
          <div class="vocab-face vocab-face-front">
            <div class="vocab-word">${escapeHTML(word.word)}</div>
            <div class="vocab-phonetic">${escapeHTML(word.phonetic)}</div>
            <div class="vocab-hint">点击卡片查看释义</div>
            <span class="badge badge-blue vocab-theme">${escapeHTML(word.theme)}</span>
          </div>
          <div class="vocab-face vocab-face-back">
            <div class="vocab-meaning">${escapeHTML(word.meaning)}</div>
            <div class="vocab-example">${escapeHTML(word.example)}</div>
            <div class="vocab-hint">下次复习：${escapeHTML(record.nextReview)}</div>
          </div>
        </div>
      </div>
      <div class="vocab-actions">
        <button class="vocab-btn vocab-btn-again" data-word-id="${word.id}" data-quality="0" type="button">不认识</button>
        <button class="vocab-btn vocab-btn-hard" data-word-id="${word.id}" data-quality="2" type="button">模糊</button>
        <button class="vocab-btn vocab-btn-good" data-word-id="${word.id}" data-quality="4" type="button">认识</button>
        <button class="vocab-btn vocab-btn-easy" data-word-id="${word.id}" data-quality="5" type="button">熟练</button>
      </div>
    </section>
  `;
}

function getNextCard(state) {
  const words = getEnabledWords(state);
  const dueWord = words.find(word => isDue(state.vocab[word.id]));
  if (dueWord) return dueWord;

  const todayNewCount = Object.values(state.vocab).filter(record => record.lastReview === today()).length;
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
  const due = records.filter(isDue).length;
  const reviewedToday = records.filter(record => record.lastReview === today()).length;
  return {
    learned,
    mastered,
    due,
    reviewedToday,
    progress: Math.min(100, Math.round((reviewedToday / Math.max(1, state.vocabSettings.dailyNew)) * 100)),
  };
}
