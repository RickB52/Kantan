export type ExamSection = 'listening' | 'listening_reading' | 'reading';

export type QuestionType =
  | 'scene_understanding'
  | 'utterance_listening'
  | 'comprehensive_listening'
  | 'situation_understanding'
  | 'document_lr'
  | 'comprehensive_lr'
  | 'vocab_grammar'
  | 'expression_reading'
  | 'comprehensive_reading';

export interface Question {
  id: string;
  section: ExamSection;
  questionType: QuestionType;
  level: string;
  topic: string | null;
  contentJa: string;
  contentEn: string | null;
  audioUrl: string | null;
  createdAt: Date;
}

export interface QuestionChoice {
  id: string;
  questionId: string;
  contentJa: string;
  isCorrect: boolean;
  orderIndex: number;
}
