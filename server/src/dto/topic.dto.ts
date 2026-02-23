import { Types } from 'mongoose';
import { toResponse, toResponseList } from '../util/toResponse';

export interface TopicResponse {
  id: string;
  groupId: string;
  categoryId: string;
  name: string;
  title: string;
  questionCount?: number;
}

type TopicDoc = {
  _id: Types.ObjectId;
  groupId: Types.ObjectId;
  categoryId: Types.ObjectId;
  name: string;
  title: string;
  questionCount?: number;
};

export function mapTopic(doc: TopicDoc | null): TopicResponse | null {
  return doc ? (toResponse(doc) as unknown as TopicResponse) : null;
}

export function mapTopicList(docs: TopicDoc[]): TopicResponse[] {
  return toResponseList(docs) as unknown as TopicResponse[];
}
