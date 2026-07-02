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
    interval = 1;
  } else {
    if (repetitions === 0) interval = 1;
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
    lastReview: today(),
    lastQuality: quality,
    weakCount,
    nextReview: addDays(today(), interval),
    status: getStatus(repetitions, interval, quality, weakCount),
  };
}

export function isDue(record) {
  return record && record.nextReview <= today();
}

function getStatus(repetitions, interval, quality, weakCount) {
  if (quality < 3) return "weak";
  if (weakCount > 0) return "weak";
  if (repetitions >= 4) return "mastered";
  if (repetitions >= 2) return "review";
  return "learning";
}
