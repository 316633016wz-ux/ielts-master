// 状态管理：localStorage 读写、默认值、数据迁移

import { today } from "./utils/date.js";

const STORE_KEY = "ielts-master-state-v1";

/** 默认状态 */
export const DEFAULT_STATE = {
  version: 1,
  activeView: "dashboard",
  updatedAt: today(),

  profile: {
    name: "我的雅思",
    examType: "Academic",
    targetOverall: 7.0,
    targetL: 7.0,
    targetR: 7.0,
    targetW: 6.5,
    targetS: 6.5,
    examDate: "",
    dailyMinutes: 120,
    focus: "",
  },

  plan: {
    startDate: today(),
    phases: [],
  },

  vocabSettings: {
    dailyNew: 20,
    themes: ["all"],
  },

  vocab: {},           // { "word-id": { easeFactor, interval, nextReview, ... } }
  sessions: [],        // 训练记录
  mistakes: [],        // 错题本
  expressions: [],     // 表达本
  mocks: [],           // 模考记录
  completions: {},     // { "YYYY-MM-DD": { taskId: true } }

  sync: {
    supabaseUrl: "",
    supabaseKey: "",
    syncPassphrase: "",
    lastPush: null,
    lastPull: null,
  },
};

let state = null;

/** 初始化状态（从 localStorage 加载或使用默认值） */
export function initState() {
  const stored = localStorage.getItem(STORE_KEY);
  if (stored) {
    try {
      state = JSON.parse(stored);
      // 数据迁移逻辑（如果版本不匹配）
      if (state.version !== DEFAULT_STATE.version) {
        state = migrateState(state);
      }
    } catch (err) {
      console.error("Failed to parse state:", err);
      state = cloneDefaultState();
    }
  } else {
    state = cloneDefaultState();
  }
  return state;
}

/** 获取当前状态 */
export function getState() {
  if (!state) initState();
  return state;
}

/** 更新状态（部分更新，深度合并） */
export function updateState(updates) {
  if (!state) initState();
  state = deepMerge(state, updates);
  state.updatedAt = new Date().toISOString();
  saveState();
  return state;
}

/** 完全替换状态（用于同步拉取） */
export function replaceState(newState) {
  state = newState;
  saveState();
}

/** 保存状态到 localStorage */
function saveState() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state:", err);
  }
}

/** 深度合并对象 */
function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

/** 数据迁移（版本升级时使用） */
function migrateState(oldState) {
  // 示例：从 v0 升级到 v1
  if (!oldState.version) {
    return { ...DEFAULT_STATE, ...oldState, version: 1 };
  }
  return oldState;
}

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

/** 清空所有数据（重置） */
export function clearState() {
  localStorage.removeItem(STORE_KEY);
  state = cloneDefaultState();
  saveState();
  return state;
}

/** 导出 JSON（用户备份） */
export function exportJSON() {
  return JSON.stringify(getState(), null, 2);
}

/** 导入 JSON（用户恢复） */
export function importJSON(jsonString) {
  try {
    const imported = JSON.parse(jsonString);
    replaceState(imported);
    return true;
  } catch (err) {
    console.error("Failed to import JSON:", err);
    return false;
  }
}
