import { clearState, exportJSON, getState, importJSON, replaceState, updateState } from "../state.js";
import { escapeHTML, formValue } from "../utils/html.js";
import { pullStateFromCloud, pushStateToCloud } from "../sync.js";

export const renderSettings = {
  html(state) {
    return `
      <div class="view-header">
        <h2 class="view-title">设置</h2>
        <p class="view-subtitle">管理本地数据、iPhone 同步和备份恢复。</p>
      </div>

      <section class="settings-section">
        <div class="settings-section-title">云同步</div>
        <form class="card" id="syncForm">
          <div class="plan-form-row">
            <label class="label" for="supabaseUrl">Supabase URL</label>
            <input class="input" id="supabaseUrl" name="supabaseUrl" value="${escapeHTML(state.sync.supabaseUrl)}" placeholder="https://xxxx.supabase.co">
          </div>
          <div class="plan-form-row">
            <label class="label" for="supabaseKey">Supabase anon key</label>
            <input class="input" id="supabaseKey" name="supabaseKey" value="${escapeHTML(state.sync.supabaseKey)}" placeholder="sb_publishable_...">
          </div>
          <div class="plan-form-row">
            <label class="label" for="syncPassphrase">同步口令</label>
            <input class="input" id="syncPassphrase" name="syncPassphrase" type="password" value="${escapeHTML(state.sync.syncPassphrase)}" placeholder="电脑和手机填同一个口令">
          </div>
          <div class="view-actions">
            <button class="btn btn-secondary" type="submit">保存配置</button>
            <button class="btn btn-primary" id="pushCloud" type="button">推送到云端</button>
            <button class="btn btn-secondary" id="pullCloud" type="button">从云端拉取</button>
          </div>
          <div class="sync-status" id="syncStatus">
            上次推送：${state.sync.lastPush || "无"} · 上次拉取：${state.sync.lastPull || "无"}。URL 推荐填写 Project URL，若误填 Data API URL 会自动兼容。
          </div>
        </form>
      </section>

      <section class="settings-section">
        <div class="settings-section-title">本地备份</div>
        <div class="card">
          <div class="view-actions">
            <button class="btn btn-secondary" id="exportData" type="button">导出 JSON</button>
            <button class="btn btn-secondary" id="importData" type="button">导入 JSON</button>
            <button class="btn btn-danger" id="resetData" type="button">清空本地数据</button>
          </div>
          <textarea class="input" id="backupBox" rows="8" placeholder="导出的 JSON 会显示在这里；也可以粘贴 JSON 后导入。"></textarea>
        </div>
      </section>
    `;
  },

  mount(container, context) {
    const syncForm = container.querySelector("#syncForm");
    const status = container.querySelector("#syncStatus");
    const backupBox = container.querySelector("#backupBox");

    syncForm?.addEventListener("submit", event => {
      event.preventDefault();
      saveSyncForm(syncForm);
      setStatus(status, "同步配置已保存。");
    });

    container.querySelector("#pushCloud")?.addEventListener("click", async () => {
      try {
        saveSyncForm(syncForm);
        setStatus(status, "正在加密并推送到云端...");
        const pushedAt = await pushStateToCloud(getState());
        updateState({ sync: { lastPush: pushedAt } });
        setStatus(status, `已推送到云端：${pushedAt}`);
      } catch (err) {
        setStatus(status, `推送失败：${err.message}`);
      }
    });

    container.querySelector("#pullCloud")?.addEventListener("click", async () => {
      try {
        saveSyncForm(syncForm);
        setStatus(status, "正在从云端拉取并解密...");
        const localSync = getState().sync;
        const cloudState = await pullStateFromCloud(getState());
        replaceState({
          ...cloudState,
          sync: {
            ...localSync,
            lastPull: new Date().toISOString(),
          },
        });
        context.refresh();
      } catch (err) {
        setStatus(status, `拉取失败：${err.message}`);
      }
    });

    container.querySelector("#exportData")?.addEventListener("click", () => {
      backupBox.value = exportJSON();
    });

    container.querySelector("#importData")?.addEventListener("click", () => {
      if (!backupBox.value.trim()) return;
      const ok = importJSON(backupBox.value);
      setStatus(status, ok ? "导入成功。" : "导入失败：JSON 格式不正确。");
      if (ok) context.refresh();
    });

    container.querySelector("#resetData")?.addEventListener("click", () => {
      if (!confirm("确定清空本地数据吗？这个操作不能撤销。")) return;
      clearState();
      context.refresh();
    });
  },
};

function saveSyncForm(form) {
  updateState({
    sync: {
      supabaseUrl: formValue(form, "supabaseUrl"),
      supabaseKey: formValue(form, "supabaseKey"),
      syncPassphrase: formValue(form, "syncPassphrase"),
    },
  });
}

function setStatus(element, message) {
  element.textContent = message;
}
