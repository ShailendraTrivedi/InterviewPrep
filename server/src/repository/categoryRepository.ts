import mongoose from 'mongoose';
import { Category } from '../model/Category';

/** Data access only. Returns plain docs (lean). */
export async function findAll() {
  return Category.find().select('name title icon').lean();
}

export async function findById(id: string) {
  return Category.findById(id).select('name title icon').lean();
}

export async function findByName(name: string) {
  return Category.findOne({ name }).select('name title icon').lean();
}

export async function findByIds(ids: string[]) {
  if (ids.length === 0) return [];
  return Category.find({ _id: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) } })
    .select('name title icon')
    .lean();
}
