// 日期工具函数

/** 返回今天日期字符串 "YYYY-MM-DD" */
export function today() {
  return formatDate(new Date());
}

/** Date 对象 → "YYYY-MM-DD" */
export function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** "YYYY-MM-DD" → Date 对象（本地时间，不受时区偏移影响） */
export function parseDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** 两个 "YYYY-MM-DD" 字符串之间的天数差（b - a，正数代表 b 在 a 之后） */
export function daysBetween(a, b) {
  const da = parseDate(a);
  const db = parseDate(b);
  return Math.round((db - da) / 86400000);
}

/** 在 "YYYY-MM-DD" 上加 n 天，返回新字符串 */
export function addDays(str, n) {
  const d = parseDate(str);
  d.setDate(d.getDate() + n);
  return formatDate(d);
}

/** 距离考试还有多少天（负数代表已过期） */
export function daysUntilExam(examDate) {
  return daysBetween(today(), examDate);
}

/** "YYYY-MM-DD" → "M月D日" 显示格式 */
export function displayDate(str) {
  const [, m, d] = str.split("-");
  return `${Number(m)}月${Number(d)}日`;
}
