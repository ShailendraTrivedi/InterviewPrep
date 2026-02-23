import mongoose from 'mongoose';
import * as questionRepository from '../repository/questionRepository';
import * as topicRepository from '../repository/topicRepository';
import * as groupRepository from '../repository/groupRepository';
import * as categoryRepository from '../repository/categoryRepository';
import { mapQuestion, mapQuestionList } from '../dto/question.dto';

export async function getAll() {
  const docs = await questionRepository.findAll();
  return mapQuestionList(docs);
}

export async function getById(id: string) {
  const doc = await questionRepository.findById(id);
  const question = mapQuestion(doc);
  if (!question) return null;
  const topic = await topicRepository.findById(question.topicId);
  const group = topic ? await groupRepository.findById(String(topic.groupId)) : null;
  const category = group ? await categoryRepository.findById(String(group.categoryId)) : null;
  return {
    ...question,
    categoryName: category?.name ?? '',
    groupName: group?.name ?? '',
    topicName: topic?.name ?? '',
  };
}

export async function getByTopicId(topicId: string) {
  const docs = await questionRepository.findByTopicId(topicId);
  return mapQuestionList(docs);
}

export async function getByTopicIds(topicIds: string[]) {
  if (topicIds.length === 0) return [];
  const docs = await questionRepository.findByTopicIds(topicIds);
  return mapQuestionList(docs);
}

export async function create(topicId: string, question: string, answer: string) {
  const topic = await topicRepository.findById(topicId);
  if (!topic) return null;
  const doc = await questionRepository.create({
    categoryId: topic.categoryId as mongoose.Types.ObjectId,
    groupId: topic.groupId as mongoose.Types.ObjectId,
    topicId: new mongoose.Types.ObjectId(topicId),
    question: question.trim(),
    answer: answer.trim(),
  });
  return mapQuestion(doc);
}

export async function update(id: string, topicId: string, question: string, answer: string) {
  const existing = await questionRepository.findById(id);
  if (!existing) return null;
  const topic = await topicRepository.findById(topicId);
  if (!topic) return null;
  const doc = await questionRepository.update(id, {
    categoryId: topic.categoryId as mongoose.Types.ObjectId,
    groupId: topic.groupId as mongoose.Types.ObjectId,
    topicId: new mongoose.Types.ObjectId(topicId),
    question: question.trim(),
    answer: answer.trim(),
  });
  return doc ? mapQuestion(doc) : null;
}

export async function remove(id: string) {
  return questionRepository.deleteById(id);
}

