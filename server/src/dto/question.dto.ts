import { Types } from 'mongoose';
import { toResponse, toResponseList } from '../util/toResponse';

export interface QuestionResponse {
  id: string;
  categoryId: string;
  groupId: string;
  topicId: string;
  question: string;
  answer: string;
}

type QuestionDoc = {
  _id: Types.ObjectId;
  categoryId: Types.ObjectId;
  groupId: Types.ObjectId;
  topicId: Types.ObjectId;
  question: string;
  answer: string;
};

export function mapQuestion(doc: QuestionDoc | null): QuestionResponse | null {
  return doc ? (toResponse(doc) as unknown as QuestionResponse) : null;
}

export function mapQuestionList(docs: QuestionDoc[]): QuestionResponse[] {
  return toResponseList(docs) as unknown as QuestionResponse[];
}
