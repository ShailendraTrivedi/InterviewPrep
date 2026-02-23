import mongoose from 'mongoose';
import * as groupRepository from '../repository/groupRepository';
import { mapGroup, mapGroupList } from '../dto/group.dto';

export async function getAll() {
  const docs = await groupRepository.findAll();
  return mapGroupList(docs);
}

export async function getByCategoryId(categoryId: string, options?: { includeTopicCount: boolean }) {
  const docs = await groupRepository.findByCategoryId(categoryId);

  if (options?.includeTopicCount) {
    const withCount = await Promise.all(
      docs.map(async (g) => {
        const topicCount = await groupRepository.countTopicsByGroupId(
          (g as { _id: mongoose.Types.ObjectId })._id
        );
        return { ...g, topicCount };
      })
    );
    return mapGroupList(withCount);
  }

  return mapGroupList(docs);
}

export async function getBySlug(categoryId: string, name: string) {
  const doc = await groupRepository.findOneByCategoryIdAndName(categoryId, name);
  if (!doc) return null;

  const topicCount = await groupRepository.countTopicsByGroupId(
    (doc as { _id: mongoose.Types.ObjectId })._id
  );
  return mapGroup({ ...doc, topicCount });
}
