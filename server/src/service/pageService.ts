import * as categoryService from './categoryService';
import * as groupService from './groupService';
import * as topicService from './topicService';
import * as questionService from './questionService';

/** Get full payload for category page: category + groups. Uses category slug (name). */
export async function getCategoryPage(categoryName: string) {
  const category = await categoryService.getByName(categoryName);
  if (!category) return null;
  const groups = await groupService.getByCategoryId(category.id, { includeTopicCount: true });
  return { category, groups };
}

/** Get full payload for group/topics page: category + group + topics. Uses category and group slugs. */
export async function getGroupPage(categoryName: string, groupName: string) {
  const category = await categoryService.getByName(categoryName);
  if (!category) return null;
  const group = await groupService.getBySlug(category.id, groupName);
  if (!group) return null;
  const topics = await topicService.getByGroupId(group.id, { includeQuestionCount: true });
  return { category, group, topics };
}

/** Get full payload for topic/questions page: category + group + topic + questions. Uses all three slugs. */
export async function getTopicPage(categoryName: string, groupName: string, topicName: string) {
  const category = await categoryService.getByName(categoryName);
  if (!category) return null;
  const group = await groupService.getBySlug(category.id, groupName);
  if (!group) return null;
  const topic = await topicService.getBySlug(group.id, topicName);
  if (!topic) return null;
  const questions = await questionService.getByTopicId(topic.id);
  return { category, group, topic, questions };
}
