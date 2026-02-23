import { Types } from 'mongoose';

/**
 * Turn a MongoDB doc (with _id and maybe ObjectId refs) into the shape we send to the frontend:
 * - id = _id as string
 * - any ObjectId field (e.g. categoryId) becomes a string
 */
function toResponse<T extends { _id?: Types.ObjectId }>(doc: T): Omit<T, '_id'> & { id: string } {
  if (!doc || doc._id == null) {
    return doc as unknown as Omit<T, '_id'> & { id: string };
  }
  const d = doc as T & { _id: Types.ObjectId; [key: string]: unknown };
  const { _id, ...rest } = d;
  const out: Record<string, unknown> = { id: _id.toString() };
  for (const [key, value] of Object.entries(rest)) {
    out[key] = value instanceof Types.ObjectId ? value.toString() : value;
  }
  return out as unknown as Omit<T, '_id'> & { id: string };
}

export function toResponseList<T extends { _id?: Types.ObjectId }>(docs: T[]): (Omit<T, '_id'> & { id: string })[] {
  return docs.map(toResponse);
}

export { toResponse };
