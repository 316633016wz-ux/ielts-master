import { addDays, today } from "./date.js";

export function createVocabRecord(word) {
  return {
    word: word.word,
    meaning: word.meaning,
    englishMeaning: word.englishMeaning || "",
    example: word.example,
    phonetic: word.phonetic,
    theme: word.theme,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    firstSeen: today(),
    learningStage: 1,
    nextReview: today(),
    lastReview: null,
    lastQuality: null,
    weakCount: 0,
    status: "new",
  };
}

export function reviewVocab(word, currentRecord, quality) {
  const record = currentRecord ? { ...currentRecord } : createVocabRecord(word);
  let repetitions = record.repetitions || 0;
  let interval = record.interval || 0;
  let easeFactor = record.easeFactor || 2.5;
  let weakCount = record.weakCount || 0;

  if (quality < 3) {
    repetitions = 0;
    interval = 0;
  } else {
    if (repetitions === 0) interval = 0;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  }

  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  easeFactor = Math.max(1.3, Number(easeFactor.toFixed(2)));

  weakCount = quality < 3 ? weakCount + 1 : Math.max(0, weakCount - 1);

  return {
    ...record,
    word: word.word,
    meaning: word.meaning,
    englishMeaning: word.englishMeaning || record.englishMeaning || "",
    example: word.example,
    phonetic: word.phonetic,
    theme: word.theme,
    easeFactor,
    interval,
    repetitions,
    firstSeen: record.firstSeen || today(),
    learningStage: quality < 3 ? 1 : Math.max(2, record.learningStage || 1),
    lastReview: today(),
    lastQuality: quality,
    weakCount,
    nextReview: addDays(today(), interval),
    status: getStatus(repetitions, interval, quality, weakCount),
  };
}

export function reviewVocabChoice(word, currentRecord, stage, isCorrect) {
  const record = currentRecord ? { ...currentRecord } : createVocabRecord(word);
  const weakCount = isCorrect ? 0 : (record.weakCount || 0) + 1;
  const repetitions = isCorrect ? (record.repetitions || 0) + 1 : 0;
  const learningStage = getNextLearningStage(stage, isCorrect);

  return {
    ...record,
    word: word.word,
    meaning: word.meaning,
    englishMeaning: word.englishMeaning || record.englishMeaning || "",
    example: word.example,
    phonetic: word.phonetic,
    theme: word.theme,
    interval: isCorrect && learningStage > 3 ? Math.max(1, record.interval || 1) : 0,
    repetitions,
    firstSeen: record.firstSeen || today(),
    learningStage,
    lastReview: today(),
    lastQuality: isCorrect ? 5 : 0,
    weakCount,
    nextReview: today(),
    status: getChoiceStatus(learningStage, isCorrect),
  };
}

export function isDue(record) {
  return record && record.nextReview <= today();
}

export function getLearningStage(record) {
  if (!record) return 1;
  if (record.status === "mastered") return 4;
  return Math.min(3, Math.max(1, record.learningStage || 1));
}

export function getLearningStageLabel(stage) {
  const labels = {
    1: "第一关：翻卡自评",
    2: "第二关：释义选择",
    3: "第三关：例句语境选择",
    4: "已掌握",
  };
  return labels[stage] || labels[1];
}

function getStatus(repetitions, interval, quality, weakCount) {
  if (quality < 3) return "weak";
  if (weakCount > 0) return "weak";
  if (repetitions >= 4) return "mastered";
  if (repetitions >= 2) return "review";
  return "learning";
}

function getNextLearningStage(stage, isCorrect) {
  if (!isCorrect) return Math.min(3, Math.max(2, stage));
  if (stage >= 3) return 4;
  return Math.min(3, stage + 1);
}

function getChoiceStatus(learningStage, isCorrect) {
  if (!isCorrect) return "weak";
  if (learningStage > 3) return "mastered";
  return "learning";
}
