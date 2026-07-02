import { getState, updateState } from "../state.js";
import { addDays, today } from "../utils/date.js";
import { escapeHTML, formValue, uid } from "../utils/html.js";

export const renderNotebook = {
  html(state) {
    const openCount = state.mistakes.filter(item => item.status !== "resolved").length;
    return `
      <div class="view-header">
        <h2 class="view-title">错题本</h2>
        <p class="view-subtitle">不要只收藏错误，要写清楚下一次怎么避免。</p>
      </div>

      <section class="section grid-2">
        <form class="card" id="mistakeForm">
          <h3 class="card-title">新增错题</h3>
          <div class="plan-form-row">
            <label class="label" for="skill">科目</label>
            <select class="input" id="skill" name="skill">
              <option value="listening">听力</option>
              <option value="reading">阅读</option>
              <option value="writing">写作</option>
              <option value="speaking">口语</option>
            </select>
          </div>
          <div class="plan-form-row">
            <label class="label" for="source">来源</label>
            <input class="input" id="source" name="source" placeholder="如 剑雅18 Test 1 Passage 2">
          </div>
          <div class="plan-form-row">
            <label class="label" for="questionType">题型</label>
            <input class="input" id="questionType" name="questionType" placeholder="如 判断题 / 填空题">
          </div>
          <div class="plan-form-row">
            <label class="label" for="issue">错因</label>
            <input class="input" id="issue" name="issue" placeholder="如 定位词替换没看出来">
          </div>
          <div class="plan-form-row">
            <label class="label" for="fix">解决办法</label>
            <textarea class="input" id="fix" name="fix" rows="3" placeholder="下次遇到类似题先做什么"></textarea>
          </div>
          <button class="btn btn-primary btn-full" type="submit">保存错题</button>
        </form>

        <div class="card">
          <h3 class="card-title">复盘状态</h3>
          <div class="grid-2">
            <div class="stat-card">
              <div class="stat-number">${openCount}</div>
              <div class="stat-label">待解决</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${state.mistakes.length - openCount}</div>
              <div class="stat-label">已解决</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h3 class="section-title">错题列表</h3>
        ${state.mistakes.length ? state.mistakes.slice().reverse().map(renderMistake).join("") : `
          <div class="card empty-state">
            <div class="empty-state-icon">❌</div>
            <div class="empty-state-text">还没有错题。记录第一条，复盘才会开始变清楚。</div>
          </div>
        `}
      </section>
    `;
  },

  mount(container, context) {
    container.querySelector("#mistakeForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      const mistake = {
        id: uid("mistake"),
        date: today(),
        skill: formValue(form, "skill", "reading"),
        questionType: formValue(form, "questionType"),
        source: formValue(form, "source"),
        issue: formValue(form, "issue"),
        fix: formValue(form, "fix"),
        status: "open",
        reviewCount: 0,
        nextReview: addDays(today(), 3),
      };
      updateState({ mistakes: [...getState().mistakes, mistake] });
      context.refresh();
    });

    container.querySelectorAll("[data-resolve-id]").forEach(button => {
      button.addEventListener("click", () => {
        const state = getState();
        updateState({
          mistakes: state.mistakes.map(item => item.id === button.dataset.resolveId
            ? { ...item, status: item.status === "resolved" ? "open" : "resolved" }
            : item),
        });
        context.refresh();
      });
    });
  },
};

function renderMistake(item) {
  return `
    <div class="mistake-item ${item.status === "resolved" ? "resolved" : ""}">
      <div class="mistake-header">
        <span class="badge badge-${escapeHTML(item.skill)}">${escapeHTML(skillName(item.skill))}</span>
        <span class="mistake-issue">${escapeHTML(item.issue || "未填写错因")}</span>
      </div>
      <div class="mistake-fix">${escapeHTML(item.fix || "还没有写解决办法")}</div>
      <div class="mistake-meta">${escapeHTML(item.date)} · ${escapeHTML(item.source)} · ${escapeHTML(item.questionType)}</div>
      <div class="view-actions">
        <button class="btn btn-secondary btn-sm" data-resolve-id="${item.id}" type="button">
          ${item.status === "resolved" ? "重新打开" : "标记解决"}
        </button>
      </div>
    </div>
  `;
}

function skillName(skill) {
  const names = { listening: "听力", reading: "阅读", writing: "写作", speaking: "口语" };
  return names[skill] || "练习";
}
