import {
  FETCH_CATEGORIES,
  FETCH_GROUPS,
  FETCH_TOPICS,
  FETCH_QUESTIONS,
  FETCH_CATEGORY_PAGE,
  FETCH_GROUP_PAGE,
  FETCH_TOPIC_PAGE,
} from '../constant/contentConstants';

export const fetchCategories = () => ({ type: FETCH_CATEGORIES } as const);
export const fetchGroups = (categoryId: string) => ({ type: FETCH_GROUPS, payload: { categoryId } } as const);
export const fetchTopics = (groupId: string) => ({ type: FETCH_TOPICS, payload: { groupId } } as const);
export const fetchQuestions = (topicId: string) => ({ type: FETCH_QUESTIONS, payload: { topicId } } as const);
export const fetchCategoryPage = (categoryName: string) => ({ type: FETCH_CATEGORY_PAGE, payload: { categoryName } } as const);
export const fetchGroupPage = (categoryName: string, groupName: string) => ({ type: FETCH_GROUP_PAGE, payload: { categoryName, groupName } } as const);
export const fetchTopicPage = (categoryName: string, groupName: string, topicName: string) =>
  ({ type: FETCH_TOPIC_PAGE, payload: { categoryName, groupName, topicName } } as const);

export { FETCH_CATEGORIES, FETCH_GROUPS, FETCH_TOPICS, FETCH_QUESTIONS } from '../constant/contentConstants';
