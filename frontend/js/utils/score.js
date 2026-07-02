// 雅思分数换算工具

/** 四项分数 → Overall（均值取0.5向上取整） */
export function calculateOverall(L, R, W, S) {
  const avg = (L + R + W + S) / 4;
  // 0.25 → 0.5, 0.75 → 0.5, 其他四舍五入
  return Math.round(avg * 2) / 2;
}

/** 验证分数是否在 0-9 之间，且为 0.5 的倍数 */
export function isValidBand(score) {
  return score >= 0 && score <= 9 && score * 2 === Math.floor(score * 2);
}

/** 听力正确题数 → 分数（Academic） */
export function listeningScore(correctCount) {
  if (correctCount >= 39) return 9.0;
  if (correctCount >= 37) return 8.5;
  if (correctCount >= 35) return 8.0;
  if (correctCount >= 32) return 7.5;
  if (correctCount >= 30) return 7.0;
  if (correctCount >= 26) return 6.5;
  if (correctCount >= 23) return 6.0;
  if (correctCount >= 18) return 5.5;
  if (correctCount >= 16) return 5.0;
  if (correctCount >= 13) return 4.5;
  return 4.0;
}

/** 阅读正确题数 → 分数（Academic） */
export function readingScore(correctCount) {
  if (correctCount >= 39) return 9.0;
  if (correctCount >= 37) return 8.5;
  if (correctCount >= 35) return 8.0;
  if (correctCount >= 33) return 7.5;
  if (correctCount >= 30) return 7.0;
  if (correctCount >= 27) return 6.5;
  if (correctCount >= 23) return 6.0;
  if (correctCount >= 19) return 5.5;
  if (correctCount >= 15) return 5.0;
  if (correctCount >= 13) return 4.5;
  return 4.0;
}

/** 将分数映射到颜色（用于UI展示） */
export function bandColor(score) {
  if (score >= 8) return "var(--color-success)";
  if (score >= 7) return "var(--color-primary)";
  if (score >= 6) return "var(--color-warning)";
  return "var(--color-danger)";
}
