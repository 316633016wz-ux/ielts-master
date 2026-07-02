import { addDays, daysBetween, displayDate, today } from "./date.js";

const MINUTES = {
  vocab: 25,
  listening: 35,
  reading: 40,
  writing: 30,
  speaking: 25,
  review: 20,
  mock: 120,
};

const TASK_LABELS = {
  vocab: "雅思核心词汇记忆",
  listening: "听力精听与错题复盘",
  reading: "阅读长难句与定位训练",
  writing: "写作观点积累",
  speaking: "口语 Part 1/2 练习",
  review: "整理今日错题和表达",
  mock: "限时模考或套题复盘",
};

export function buildStudyPlan({ examDate, dailyMinutes, startDate = today() }) {
  const totalDays = Math.max(1, daysBetween(startDate, examDate) + 1);
  const profile = getPlanProfile(totalDays);
  let cursor = 1;

  return profile.map((phase, index) => {
    const length = index === profile.length - 1
      ? totalDays - cursor + 1
      : Math.max(1, Math.round(totalDays * phase.ratio));
    const startDay = cursor;
    const endDay = Math.min(totalDays, cursor + length - 1);
    cursor = endDay + 1;

    return {
      id: `phase-${index + 1}`,
      name: phase.name,
      startDay,
      endDay,
      startDate: addDays(startDate, startDay - 1),
      endDate: addDays(startDate, endDay - 1),
      description: phase.description,
      dailyTasks: scaleTasks(phase.tasks, dailyMinutes),
    };
  });
}

export function getCurrentPhase(state) {
  if (!state.profile.examDate || !state.plan.phases.length) return null;
  const dayIndex = Math.max(1, daysBetween(state.plan.startDate, today()) + 1);
  return state.plan.phases.find(phase => dayIndex >= phase.startDay && dayIndex <= phase.endDay)
    ?? state.plan.phases[state.plan.phases.length - 1];
}

export function getTodayTasks(state) {
  const phase = getCurrentPhase(state);
  if (!phase) return [];
  return phase.dailyTasks.map(task => ({
    ...task,
    id: `${today()}-${phase.id}-${task.type}`,
  }));
}

export function getPlanSummary(state) {
  const examDate = state.profile.examDate;
  const daysLeft = examDate ? daysBetween(today(), examDate) : null;
  const phase = getCurrentPhase(state);
  const tasks = getTodayTasks(state);
  const doneMap = state.completions[today()] || {};
  const doneCount = tasks.filter(task => doneMap[task.id]).length;
  const progress = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  return { daysLeft, phase, tasks, doneCount, progress };
}

export function formatPhaseRange(phase) {
  return `${displayDate(phase.startDate)} - ${displayDate(phase.endDate)}`;
}

function getPlanProfile(totalDays) {
  if (totalDays < 30) {
    return [
      {
        name: "冲刺期",
        ratio: 1,
        description: "优先补短板，每天保持真题手感和错题复盘。",
        tasks: ["vocab", "listening", "reading", "review", "mock"],
      },
    ];
  }

  if (totalDays <= 60) {
    return [
      {
        name: "强化期",
        ratio: 0.65,
        description: "建立四科训练节奏，重点提升阅读听力正确率。",
        tasks: ["vocab", "listening", "reading", "writing", "review"],
      },
      {
        name: "冲刺期",
        ratio: 0.35,
        description: "进入套题训练，集中处理错题和薄弱题型。",
        tasks: ["vocab", "reading", "listening", "speaking", "mock", "review"],
      },
    ];
  }

  return [
    {
      name: "基础期",
      ratio: 0.35,
      description: "夯实词汇、语法和听读基础，建立每日学习习惯。",
      tasks: ["vocab", "listening", "reading", "review"],
    },
    {
      name: "强化期",
      ratio: 0.4,
      description: "按题型专项训练，开始稳定记录错题和表达。",
      tasks: ["vocab", "listening", "reading", "writing", "speaking", "review"],
    },
    {
      name: "冲刺期",
      ratio: 0.25,
      description: "以真题套卷、限时训练和复盘为主，减少盲目刷题。",
      tasks: ["vocab", "reading", "listening", "mock", "review"],
    },
  ];
}

function scaleTasks(taskTypes, dailyMinutes) {
  const selected = fitTasks(taskTypes, dailyMinutes);
  const baseTotal = selected.reduce((sum, type) => sum + MINUTES[type], 0);
  const scale = baseTotal > 0 ? Math.min(1.35, Math.max(0.75, dailyMinutes / baseTotal)) : 1;

  return selected.map(type => ({
    type,
    label: TASK_LABELS[type],
    minutes: Math.max(10, Math.round((MINUTES[type] * scale) / 5) * 5),
  }));
}

function fitTasks(taskTypes, dailyMinutes) {
  const required = ["vocab", "review"];
  const result = [];

  for (const type of taskTypes) {
    if (required.includes(type) || totalMinutes(result) + MINUTES[type] <= dailyMinutes + 20) {
      result.push(type);
    }
  }

  return result.length ? result : ["vocab"];
}

function totalMinutes(types) {
  return types.reduce((sum, type) => sum + MINUTES[type], 0);
}
