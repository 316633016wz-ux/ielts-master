import { addDays, today } from "./date.js";

export function createVocabRecord(word) {
  return {
    word: word.word,
    meaning: word.meaning,
    example: word.example,
    phonetic: word.phonetic,
    theme: word.theme,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: today(),
    lastReview: null,
    status: "new",
  };
}

export function reviewVocab(word, currentRecord, quality) {
  const record = currentRecord ? { ...currentRecord } : createVocabRecord(word);
  let repetitions = record.repetitions || 0;
  let interval = record.interval || 0;
  let easeFactor = record.easeFactor || 2.5;

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

  return {
    ...record,
    word: word.word,
    meaning: word.meaning,
    example: word.example,
    phonetic: word.phonetic,
    theme: word.theme,
    easeFactor,
    interval,
    repetitions,
    lastReview: today(),
    nextReview: addDays(today(), interval),
    status: getStatus(repetitions, interval, quality),
  };
}

export function isDue(record) {
  return record && record.nextReview <= today();
}

function getStatus(repetitions, interval, quality) {
  if (quality < 3) return "learning";
  if (repetitions >= 4 && interval >= 21) return "mastered";
  if (repetitions >= 2) return "review";
  return "learning";
}
