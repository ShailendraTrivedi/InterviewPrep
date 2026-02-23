import { Types } from 'mongoose';
import { toResponse, toResponseList } from '../util/toResponse';

export interface GroupResponse {
  id: string;
  categoryId: string;
  name: string;
  title: string;
  icon: string;
  topicCount?: number;
}

type GroupDoc = {
  _id: Types.ObjectId;
  categoryId: Types.ObjectId;
  name: string;
  title: string;
  icon: string;
  topicCount?: number;
};

export function mapGroup(doc: GroupDoc | null): GroupResponse | null {
  return doc ? (toResponse(doc) as unknown as GroupResponse) : null;
}

export function mapGroupList(docs: GroupDoc[]): GroupResponse[] {
  return toResponseList(docs) as unknown as GroupResponse[];
}
