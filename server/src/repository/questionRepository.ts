import mongoose from 'mongoose';
import { Question } from '../model/Question';

/** Data access only. Returns plain docs (lean). */
export async function findAll() {
  return Question.find().select('categoryId groupId topicId question answer').lean();
}

export async function findById(id: string) {
  return Question.findById(id).select('categoryId groupId topicId question answer').lean();
}

export async function findByTopicId(topicId: string) {
  return Question.find({ topicId: new mongoose.Types.ObjectId(topicId) })
    .select('categoryId groupId topicId question answer')
    .lean();
}

export async function findByTopicIds(topicIds: string[]) {
  if (topicIds.length === 0) return [];
  const ids = topicIds.map((id) => new mongoose.Types.ObjectId(id));
  return Question.find({ topicId: { $in: ids } })
    .select('categoryId groupId topicId question answer')
    .lean();
}

export async function create(data: {
  categoryId: mongoose.Types.ObjectId;
  groupId: mongoose.Types.ObjectId;
  topicId: mongoose.Types.ObjectId;
  question: string;
  answer: string;
}) {
  const doc = await Question.create(data);
  return doc.toObject();
}

export async function update(
  id: string,
  data: {
    categoryId: mongoose.Types.ObjectId;
    groupId: mongoose.Types.ObjectId;
    topicId: mongoose.Types.ObjectId;
    question: string;
    answer: string;
  }
) {
  const doc = await Question.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  )
    .select('categoryId groupId topicId question answer')
    .lean();
  return doc;
}

export async function deleteById(id: string) {
  const result = await Question.findByIdAndDelete(id);
  return result != null;
}

