import { today } from "../utils/date.js";
import { escapeHTML } from "../utils/html.js";
import { getPlanSummary } from "../utils/plan.js";
import { VOCAB_DATABASE } from "../utils/vocab-data.js";
import { getState, updateState } from "../state.js";

export const renderDashboard = {
  html(state) {
    const summary = getPlanSummary(state);
    const vocabStats = getVocabStats(state);
    const recentSessions = state.sessions.slice(-4).reverse();

    return `
      <div class="view-header">
        <h2 class="view-title">今日总览</h2>
        <p class="view-subtitle">${today()} · 把今天该做的事完成，就已经在往前走。</p>
      </div>

      ${renderCountdown(state, summary)}

      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-number">${summary.progress}%</div>
          <div class="stat-label">今日任务</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${vocabStats.learned}</div>
          <div class="stat-label">已学词汇</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${vocabStats.due}</div>
          <div class="stat-label">待复习</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${state.sessions.length}</div>
          <div class="stat-label">训练记录</div>
        </div>
      </div>

      <section class="section grid-2">
        <div class="card">
          <h3 class="card-title">今日学习内容</h3>
          ${renderTasks(state, summary)}
        </div>
        <div class="card">
          <h3 class="card-title">最近练习</h3>
          ${recentSessions.length ? recentSessions.map(renderSession).join("") : `
            <div class="empty-state">
              <div class="empty-state-icon">🎯</div>
              <div class="empty-state-text">还没有练习记录，完成一次训练后会显示在这里。</div>
            </div>
          `}
        </div>
      </section>
    `;
  },

  mount(container, context) {
    container.querySelectorAll("[data-task-id]").forEach(input => {
      input.addEventListener("change", () => {
        const dateKey = today();
        const current = { ...(getState().completions[dateKey] || {}) };
        current[input.dataset.taskId] = input.checked;
        updateState({ completions: { [dateKey]: current } });
        context.refresh();
      });
    });
  },
};

function renderCountdown(state, summary) {
  if (!state.profile.examDate) {
    return `
      <div class="countdown-card">
        <div>
          <div class="countdown-days">未设置</div>
          <div class="countdown-label">先填写考试日期，系统会生成每日计划</div>
        </div>
        <button class="btn btn-secondary" data-nav="plan" type="button">创建计划</button>
      </div>
    `;
  }

  const daysText = summary.daysLeft >= 0 ? `${summary.daysLeft}` : "已结束";
  return `
    <div class="countdown-card">
      <div>
        <div class="countdown-days">${daysText}</div>
        <div class="countdown-label">距离考试天数 · ${escapeHTML(state.profile.examDate)}</div>
      </div>
      <div>
        <div class="countdown-phase">${summary.phase ? escapeHTML(summary.phase.name) : "计划未生成"}</div>
        <div class="countdown-label">${summary.phase ? escapeHTML(summary.phase.description) : "去计划页生成阶段"}</div>
      </div>
    </div>
  `;
}

function renderTasks(state, summary) {
  if (!summary.tasks.length) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">📅</div>
        <div class="empty-state-text">暂无今日任务。去计划页设置考试日期和每日学习时长。</div>
      </div>
    `;
  }

  const doneMap = state.completions[today()] || {};
  return `
    <div class="progress-bar" aria-label="今日任务进度">
      <div class="progress-fill" style="width:${summary.progress}%"></div>
    </div>
    <hr class="divider">
    ${summary.tasks.map(task => `
      <label class="task-item ${doneMap[task.id] ? "done" : ""}">
        <input type="checkbox" data-task-id="${task.id}" ${doneMap[task.id] ? "checked" : ""}>
        <span class="task-label">${escapeHTML(task.label)}</span>
        <span class="task-minutes">${task.minutes} 分钟</span>
      </label>
    `).join("")}
  `;
}

function renderSession(session) {
  return `
    <div class="session-item">
      <div class="session-date">${escapeHTML(session.date)}</div>
      <div class="session-body">
        <div class="session-source">${escapeHTML(session.source || "未填写材料")}</div>
        <div class="session-result">${escapeHTML(session.result || session.notes || "已完成训练")}</div>
        <div class="session-minutes">${escapeHTML(skillName(session.skill))} · ${session.minutes} 分钟</div>
      </div>
    </div>
  `;
}

function getVocabStats(state) {
  const records = Object.values(state.vocab);
  const due = records.filter(record => record.nextReview <= today()).length;
  return {
    learned: records.length,
    due,
    total: VOCAB_DATABASE.length,
  };
}

function skillName(skill) {
  const names = { listening: "听力", reading: "阅读", writing: "写作", speaking: "口语" };
  return names[skill] || "练习";
}
