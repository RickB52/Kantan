import type { SrsQuality, SrsReviewResult } from '@bjt/types';

const MIN_EASE_FACTOR = 1.3;
const INITIAL_EASE_FACTOR = 2.5;

/**
 * SM-2 Spaced Repetition Algorithm.
 * Calculates next review schedule based on quality of recall.
 *
 * @param easeFactor  Current ease factor (default 2.5, min 1.3)
 * @param interval    Current interval in days
 * @param repetitions Consecutive successful reviews count
 * @param quality     Recall quality 0-5 (0=blackout, 5=perfect)
 */
export function calculateNextReview(
  easeFactor: number,
  interval: number,
  repetitions: number,
  quality: SrsQuality,
): SrsReviewResult {
  let newEaseFactor = easeFactor;
  let newInterval: number;
  let newRepetitions: number;

  if (quality < 3) {
    // Failed: restart sequence, EF unchanged
    newRepetitions = 0;
    newInterval = 1;
  } else {
    newRepetitions = repetitions + 1;

    if (newRepetitions === 1) {
      newInterval = 1;
    } else if (newRepetitions === 2) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * easeFactor);
    }

    // EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
    newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    newEaseFactor = Math.max(MIN_EASE_FACTOR, newEaseFactor);
  }

  const dueAt = new Date();
  dueAt.setDate(dueAt.getDate() + newInterval);
  dueAt.setHours(0, 0, 0, 0);

  return {
    easeFactor: Math.round(newEaseFactor * 100) / 100,
    interval: newInterval,
    repetitions: newRepetitions,
    dueAt,
  };
}

export { INITIAL_EASE_FACTOR, MIN_EASE_FACTOR };
