import { getState, updateState } from "../state.js";
import { today } from "../utils/date.js";
import { escapeHTML, formNumber, formValue, uid } from "../utils/html.js";

const SKILLS = [
  ["listening", "听力"],
  ["reading", "阅读"],
  ["writing", "写作"],
  ["speaking", "口语"],
];

export const renderPractice = {
  html(state) {
    return `
      <div class="view-header">
        <h2 class="view-title">四科练习</h2>
        <p class="view-subtitle">先记录训练材料、时长和结果，后续刷题系统会自动写入这里。</p>
      </div>

      <section class="section grid-2">
        <form class="card" id="sessionForm">
          <h3 class="card-title">新增练习</h3>
          <div class="plan-form-row">
            <label class="label" for="skill">科目</label>
            <select class="input" id="skill" name="skill">
              ${SKILLS.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}
            </select>
          </div>
          <div class="plan-form-row">
            <label class="label" for="source">材料来源</label>
            <input class="input" id="source" name="source" placeholder="如 剑雅18 Test 1 Reading">
          </div>
          <div class="plan-form-row">
            <label class="label" for="minutes">训练时长（分钟）</label>
            <input class="input" id="minutes" name="minutes" type="number" min="5" max="240" value="45">
          </div>
          <div class="plan-form-row">
            <label class="label" for="result">结果</label>
            <input class="input" id="result" name="result" placeholder="如 正确率 75%，错 10 题">
          </div>
          <div class="plan-form-row">
            <label class="label" for="notes">复盘笔记</label>
            <textarea class="input" id="notes" name="notes" rows="3" placeholder="写下本次最大问题"></textarea>
          </div>
          <button class="btn btn-primary btn-full" type="submit">保存练习</button>
        </form>

        <div class="card">
          <h3 class="card-title">训练统计</h3>
          <div class="grid-2">
            ${SKILLS.map(([value, label]) => {
              const total = state.sessions.filter(item => item.skill === value).reduce((sum, item) => sum + Number(item.minutes || 0), 0);
              return `
                <div class="stat-card">
                  <div class="stat-number">${total}</div>
                  <div class="stat-label">${label}分钟</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <h3 class="section-title">练习记录</h3>
        <div class="card">
          ${state.sessions.length ? state.sessions.slice().reverse().map(renderSession).join("") : `
            <div class="empty-state">
              <div class="empty-state-icon">🎯</div>
              <div class="empty-state-text">还没有练习记录。</div>
            </div>
          `}
        </div>
      </section>
    `;
  },

  mount(container, context) {
    container.querySelector("#sessionForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      const session = {
        id: uid("session"),
        date: today(),
        skill: formValue(form, "skill", "reading"),
        minutes: formNumber(form, "minutes", 45),
        source: formValue(form, "source"),
        result: formValue(form, "result"),
        notes: formValue(form, "notes"),
        createdAt: new Date().toISOString(),
      };
      updateState({ sessions: [...getState().sessions, session] });
      context.refresh();
    });
  },
};

function renderSession(session) {
  return `
    <div class="session-item">
      <div class="session-date">${escapeHTML(session.date)}</div>
      <div class="session-body">
        <span class="badge badge-${escapeHTML(session.skill)}">${escapeHTML(skillName(session.skill))}</span>
        <div class="session-source">${escapeHTML(session.source || "未填写材料")}</div>
        <div class="session-result">${escapeHTML(session.result || session.notes || "已完成")}</div>
        <div class="session-minutes">${session.minutes} 分钟</div>
      </div>
    </div>
  `;
}

function skillName(skill) {
  return Object.fromEntries(SKILLS)[skill] || "练习";
}
