import { calculateNextReview, MIN_EASE_FACTOR } from './srs';

describe('calculateNextReview (SM-2)', () => {
  const ef = 2.5;

  describe('quality < 3 — fail, reset', () => {
    it.each([0, 1, 2] as const)('quality %i resets interval=1 repetitions=0', (q) => {
      const r = calculateNextReview(ef, 10, 5, q);
      expect(r.interval).toBe(1);
      expect(r.repetitions).toBe(0);
    });
  });

  describe('first review (rep 0→1)', () => {
    it('sets interval=1', () => {
      expect(calculateNextReview(ef, 0, 0, 4).interval).toBe(1);
      expect(calculateNextReview(ef, 0, 0, 4).repetitions).toBe(1);
    });
  });

  describe('second review (rep 1→2)', () => {
    it('sets interval=6', () => {
      expect(calculateNextReview(ef, 1, 1, 4).interval).toBe(6);
    });
  });

  describe('subsequent reviews (rep>=2)', () => {
    it('grows interval by EF', () => {
      expect(calculateNextReview(2.5, 6, 2, 4).interval).toBe(Math.round(6 * 2.5));
    });
    it('increases EF on quality 5', () => {
      expect(calculateNextReview(2.5, 6, 2, 5).easeFactor).toBeGreaterThan(2.5);
    });
    it('decreases EF on quality 3', () => {
      expect(calculateNextReview(2.5, 6, 2, 3).easeFactor).toBeLessThan(2.5);
    });
  });

  describe('EF floor', () => {
    it('never goes below MIN_EASE_FACTOR', () => {
      let currentEf = 1.4;
      for (let i = 0; i < 20; i++) {
        currentEf = calculateNextReview(currentEf, 6, 3, 3).easeFactor;
      }
      expect(currentEf).toBeGreaterThanOrEqual(MIN_EASE_FACTOR);
    });
  });

  describe('dueAt', () => {
    it('dueAt = today + interval days', () => {
      const r = calculateNextReview(ef, 0, 0, 4);
      const expected = new Date();
      expected.setDate(expected.getDate() + r.interval);
      expect(r.dueAt.toDateString()).toBe(expected.toDateString());
    });
  });
});
