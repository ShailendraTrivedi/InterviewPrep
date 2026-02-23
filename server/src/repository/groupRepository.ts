import mongoose from 'mongoose';
import { Group } from '../model/Group';
import { Topic } from '../model/Topic';

/** Data access only. Returns plain docs (lean). */
export async function findAll() {
  return Group.find().select('categoryId name title icon').lean();
}

export async function findById(id: string) {
  return Group.findById(id).select('categoryId name title icon').lean();
}

export async function findByIds(ids: string[]) {
  if (ids.length === 0) return [];
  return Group.find({ _id: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) } })
    .select('categoryId name title icon')
    .lean();
}

export async function findByCategoryId(categoryId: string) {
  return Group.find({ categoryId: new mongoose.Types.ObjectId(categoryId) })
    .select('categoryId name title icon')
    .lean();
}

export async function findOneByCategoryIdAndName(categoryId: string, name: string) {
  return Group.findOne({
    categoryId: new mongoose.Types.ObjectId(categoryId),
    name,
  })
    .select('categoryId name title icon')
    .lean();
}

export async function countTopicsByGroupId(groupId: mongoose.Types.ObjectId) {
  return Topic.countDocuments({ groupId });
}
