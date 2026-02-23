import { z } from 'zod';

const objectIdString = z.string().regex(/^[0-9a-fA-F]{24}$/, 'topicId must be a valid 24-character hex ID');

export const createQuestionSchema = z.object({
  topicId: objectIdString,
  question: z.string().min(1, 'question is required').trim(),
  answer: z.string().min(1, 'answer is required').trim(),
});

export type CreateQuestionBody = z.infer<typeof createQuestionSchema>;

export const questionsByTopicIdsSchema = z.object({
  topicIds: z.array(objectIdString).min(1, 'At least one topicId is required'),
});
export type QuestionsByTopicIdsBody = z.infer<typeof questionsByTopicIdsSchema>;
