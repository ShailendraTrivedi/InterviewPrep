import mongoose from 'mongoose';
import { Topic } from '../model/Topic';
import { Question } from '../model/Question';

/** Data access only. Returns plain docs (lean). */
export async function findAll() {
  return Topic.find().select('groupId categoryId name title').lean();
}

/** Search topics by title or name (case-insensitive partial match). */
export async function findBySearch(search: string) {
  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'i');
  return Topic.find({
    $or: [{ title: regex }, { name: regex }],
  })
    .select('groupId categoryId name title')
    .lean();
}

export async function findById(id: string) {
  return Topic.findById(id).select('groupId categoryId name title').lean();
}

export async function findByIds(ids: string[]) {
  if (ids.length === 0) return [];
  return Topic.find({ _id: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) } })
    .select('groupId categoryId name title')
    .lean();
}

export async function findByGroupId(groupId: string) {
  return Topic.find({ groupId: new mongoose.Types.ObjectId(groupId) })
    .select('groupId categoryId name title')
    .lean();
}

export async function findOneByGroupIdAndName(groupId: string, name: string) {
  return Topic.findOne({
    groupId: new mongoose.Types.ObjectId(groupId),
    name,
  })
    .select('groupId categoryId name title')
    .lean();
}

export async function countQuestionsByTopicId(topicId: mongoose.Types.ObjectId) {
  return Question.countDocuments({ topicId });
}
