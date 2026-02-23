import mongoose from 'mongoose';
import * as topicRepository from '../repository/topicRepository';
import { mapTopic, mapTopicList } from '../dto/topic.dto';

export async function getAll() {
  const docs = await topicRepository.findAll();
  return mapTopicList(docs);
}

export async function getBySearch(search: string) {
  const trimmed = search.trim();
  if (!trimmed) return getAll();
  const docs = await topicRepository.findBySearch(trimmed);
  return mapTopicList(docs);
}

export async function getByGroupId(groupId: string, options?: { includeQuestionCount: boolean }) {
  const docs = await topicRepository.findByGroupId(groupId);

  if (options?.includeQuestionCount) {
    const withCount = await Promise.all(
      docs.map(async (t) => {
        const questionCount = await topicRepository.countQuestionsByTopicId(
          (t as { _id: mongoose.Types.ObjectId })._id
        );
        return { ...t, questionCount };
      })
    );
    return mapTopicList(withCount);
  }

  return mapTopicList(docs);
}

export async function getBySlug(groupId: string, name: string) {
  const doc = await topicRepository.findOneByGroupIdAndName(groupId, name);
  if (!doc) return null;

  const questionCount = await topicRepository.countQuestionsByTopicId(
    (doc as { _id: mongoose.Types.ObjectId })._id
  );
  return mapTopic({ ...doc, questionCount });
}
