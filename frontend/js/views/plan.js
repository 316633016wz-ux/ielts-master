import { updateState } from "../state.js";
import { today } from "../utils/date.js";
import { escapeHTML, formNumber, formValue } from "../utils/html.js";
import { buildStudyPlan, formatPhaseRange, getPlanSummary } from "../utils/plan.js";

export const renderPlan = {
  html(state) {
    const summary = getPlanSummary(state);
    return `
      <div class="view-header">
        <h2 class="view-title">备考计划</h2>
        <p class="view-subtitle">输入考试日期和每天可用时间，系统会先生成一个能执行的基础计划。</p>
      </div>

      <section class="section grid-2">
        <form class="card plan-setup" id="planForm">
          <h3 class="card-title">计划设置</h3>
          <div class="plan-form-row">
            <label class="label" for="name">计划名称</label>
            <input class="input" id="name" name="name" value="${escapeHTML(state.profile.name)}" placeholder="我的雅思备考">
          </div>
          <div class="plan-form-row">
            <label class="label" for="examDate">考试日期</label>
            <input class="input" id="examDate" name="examDate" type="date" value="${escapeHTML(state.profile.examDate)}" min="${today()}" required>
          </div>
          <div class="plan-form-row">
            <label class="label" for="dailyMinutes">每日学习时长（分钟）</label>
            <input class="input" id="dailyMinutes" name="dailyMinutes" type="number" min="30" max="300" step="15" value="${state.profile.dailyMinutes}">
          </div>
          <div class="plan-form-row score-targets">
            <div>
              <label class="label" for="targetOverall">目标总分</label>
              <input class="input" id="targetOverall" name="targetOverall" type="number" min="4" max="9" step="0.5" value="${state.profile.targetOverall}">
            </div>
            <div>
              <label class="label" for="focus">当前重点</label>
              <input class="input" id="focus" name="focus" value="${escapeHTML(state.profile.focus)}" placeholder="如阅读/听力">
            </div>
          </div>
          <button class="btn btn-primary btn-full" type="submit">生成或更新计划</button>
        </form>

        <div class="card">
          <h3 class="card-title">当前状态</h3>
          ${state.profile.examDate ? `
            <div class="stat-card">
              <div class="stat-number">${summary.daysLeft}</div>
              <div class="stat-label">距离考试天数</div>
            </div>
            <hr class="divider">
            <p class="card-subtitle">当前阶段</p>
            <p><strong>${summary.phase ? escapeHTML(summary.phase.name) : "尚未生成"}</strong></p>
            <p class="view-subtitle">${summary.phase ? escapeHTML(summary.phase.description) : "点击左侧按钮生成计划。"}</p>
          ` : `
            <div class="empty-state">
              <div class="empty-state-icon">📅</div>
              <div class="empty-state-text">填写考试日期后，计划会从今天开始自动拆分。</div>
            </div>
          `}
        </div>
      </section>

      <section class="section">
        <h3 class="section-title">阶段安排</h3>
        ${state.plan.phases.length ? state.plan.phases.map(phase => renderPhase(phase, summary.phase)).join("") : `
          <div class="card empty-state">
            <div class="empty-state-icon">🧭</div>
            <div class="empty-state-text">还没有阶段安排。先生成计划。</div>
          </div>
        `}
      </section>
    `;
  },

  mount(container, context) {
    container.querySelector("#planForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      const examDate = formValue(form, "examDate");
      const dailyMinutes = Math.min(300, Math.max(30, formNumber(form, "dailyMinutes", 120)));
      const phases = buildStudyPlan({ examDate, dailyMinutes });

      updateState({
        profile: {
          name: formValue(form, "name", "我的雅思"),
          examDate,
          dailyMinutes,
          targetOverall: formNumber(form, "targetOverall", 7),
          focus: formValue(form, "focus"),
        },
        plan: {
          startDate: today(),
          phases,
        },
      });

      context.refresh();
    });
  },
};

function renderPhase(phase, currentPhase) {
  const stateClass = currentPhase?.id === phase.id ? "current" : "";
  return `
    <div class="phase-card ${stateClass}">
      <div class="phase-name">${escapeHTML(phase.name)}</div>
      <div class="phase-dates">第 ${phase.startDay}-${phase.endDay} 天 · ${escapeHTML(formatPhaseRange(phase))}</div>
      <p class="view-subtitle">${escapeHTML(phase.description)}</p>
      <hr class="divider">
      ${phase.dailyTasks.map(task => `
        <div class="task-item">
          <span class="badge badge-vocab">${escapeHTML(task.type)}</span>
          <span class="task-label">${escapeHTML(task.label)}</span>
          <span class="task-minutes">${task.minutes} 分钟</span>
        </div>
      `).join("")}
    </div>
  `;
}
