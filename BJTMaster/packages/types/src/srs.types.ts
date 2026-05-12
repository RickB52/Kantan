export type SrsItemType = 'vocab' | 'grammar' | 'keigo';

/** SM-2 quality rating: 0 (blackout) to 5 (perfect) */
export type SrsQuality = 0 | 1 | 2 | 3 | 4 | 5;

export interface SrsCard {
  id: string;
  userId: string;
  itemId: string;
  itemType: SrsItemType;
  easeFactor: number;
  interval: number;
  repetitions: number;
  dueAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SrsReviewResult {
  easeFactor: number;
  interval: number;
  repetitions: number;
  dueAt: Date;
}
