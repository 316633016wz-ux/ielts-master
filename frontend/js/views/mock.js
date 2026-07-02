import { getState, updateState } from "../state.js";
import { today } from "../utils/date.js";
import { escapeHTML, formNumber, formValue, uid } from "../utils/html.js";
import { calculateOverall } from "../utils/score.js";

const BANDS = ["L", "R", "W", "S"];

export const renderMock = {
  html(state) {
    const latest = state.mocks[state.mocks.length - 1];
    return `
      <div class="view-header">
        <h2 class="view-title">模考记录</h2>
        <p class="view-subtitle">记录每次套题表现，后续会用趋势决定计划里的重点。</p>
      </div>

      <section class="section grid-2">
        <form class="card" id="mockForm">
          <h3 class="card-title">新增模考</h3>
          <div class="plan-form-row">
            <label class="label" for="source">套题来源</label>
            <input class="input" id="source" name="source" placeholder="如 剑雅18 Test 2">
          </div>
          <div class="mock-score-grid">
            ${BANDS.map(band => `
              <div class="score-input-item">
                <label class="label" for="${band}">${band}</label>
                <input class="input" id="${band}" name="${band}" type="number" min="0" max="9" step="0.5" value="6.5">
              </div>
            `).join("")}
          </div>
          <div class="plan-form-row">
            <label class="label" for="notes">复盘笔记</label>
            <textarea class="input" id="notes" name="notes" rows="3" placeholder="本次最需要解决的问题"></textarea>
          </div>
          <button class="btn btn-primary btn-full" type="submit">保存模考</button>
        </form>

        <div class="card">
          <h3 class="card-title">最近一次</h3>
          ${latest ? `
            <div class="score-overall">
              <div class="score-overall-num">${latest.overall}</div>
              <div class="stat-label">Overall</div>
            </div>
            <hr class="divider">
            <div class="mock-scores">${renderScoreBands(latest)}</div>
          ` : `
            <div class="empty-state">
              <div class="empty-state-icon">📝</div>
              <div class="empty-state-text">还没有模考记录。</div>
            </div>
          `}
        </div>
      </section>

      <section class="section">
        <h3 class="section-title">历史记录</h3>
        <div class="card">
          ${state.mocks.length ? state.mocks.slice().reverse().map(renderMockItem).join("") : `
            <div class="empty-state">
              <div class="empty-state-icon">📈</div>
              <div class="empty-state-text">保存模考后，这里会形成分数轨迹。</div>
            </div>
          `}
        </div>
      </section>
    `;
  },

  mount(container, context) {
    container.querySelector("#mockForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      const scores = Object.fromEntries(BANDS.map(band => [band, formNumber(form, band, 6.5)]));
      const mock = {
        id: uid("mock"),
        date: today(),
        source: formValue(form, "source"),
        ...scores,
        overall: calculateOverall(scores.L, scores.R, scores.W, scores.S),
        notes: formValue(form, "notes"),
      };
      updateState({ mocks: [...getState().mocks, mock] });
      context.refresh();
    });
  },
};

function renderMockItem(item) {
  return `
    <div class="mock-item">
      <div class="session-date">${escapeHTML(item.date)}</div>
      <div class="session-body">
        <div class="session-source">${escapeHTML(item.source || "未填写套题来源")}</div>
        <div class="session-result">${escapeHTML(item.notes || "暂无复盘")}</div>
      </div>
      <div class="mock-scores">
        <div class="mock-score-band">
          <div class="mock-band-num">${item.overall}</div>
          <div class="mock-band-label">O</div>
        </div>
      </div>
    </div>
  `;
}

function renderScoreBands(item) {
  return BANDS.map(band => `
    <div class="mock-score-band">
      <div class="mock-band-num">${item[band]}</div>
      <div class="mock-band-label">${band}</div>
    </div>
  `).join("");
}
