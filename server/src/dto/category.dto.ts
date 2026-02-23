import { Types } from 'mongoose';
import { toResponse, toResponseList } from '../util/toResponse';

export interface CategoryResponse {
  id: string;
  name: string;
  title: string;
  icon: string;
}

type CategoryDoc = { _id: Types.ObjectId; name: string; title: string; icon: string };

export function mapCategory(doc: CategoryDoc | null): CategoryResponse | null {
  return doc ? (toResponse(doc) as unknown as CategoryResponse) : null;
}

export function mapCategoryList(docs: CategoryDoc[]): CategoryResponse[] {
  return toResponseList(docs) as unknown as CategoryResponse[];
}
