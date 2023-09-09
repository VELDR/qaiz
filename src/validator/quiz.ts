import { z } from 'zod';

export const createQuizValidator = z.object({
  topic: z
    .string()
    .min(3, { message: 'Topic must be at least 3 characters long' })
    .max(50, { message: 'Topic must contain at most 50 characters long' }),
  amount: z
    .number()
    .min(1, { message: 'Number of questions can only be 1-20 questions' })
    .max(20, { message: 'Number of questions can only be 1-20 questions' }),
});

export const answerValidator = z.object({
  questionId: z.string(),
  userAnswer: z.string(),
});

export const endQuizValidator = z.object({
  quizId: z.string(),
});
