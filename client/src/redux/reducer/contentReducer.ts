import type { CategoryResponse, GroupResponse, TopicResponse, QuestionResponse } from '../service/contentService';
import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  FETCH_GROUPS,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAIL,
  FETCH_TOPICS,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAIL,
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAIL,
  FETCH_CATEGORY_PAGE,
  FETCH_CATEGORY_PAGE_SUCCESS,
  FETCH_CATEGORY_PAGE_FAIL,
  FETCH_GROUP_PAGE,
  FETCH_GROUP_PAGE_SUCCESS,
  FETCH_GROUP_PAGE_FAIL,
  FETCH_TOPIC_PAGE,
  FETCH_TOPIC_PAGE_SUCCESS,
  FETCH_TOPIC_PAGE_FAIL,
} from '../constant/contentConstants';

export interface ContentState {
  categories: CategoryResponse[];
  groupsByCategoryId: Record<string, GroupResponse[]>;
  topicsByGroupId: Record<string, TopicResponse[]>;
  questionsByTopicId: Record<string, QuestionResponse[]>;
  categoryPage: { category: CategoryResponse; groups: GroupResponse[] } | null;
  groupPage: { category: CategoryResponse; group: GroupResponse; topics: TopicResponse[] } | null;
  topicPage: { category: CategoryResponse; group: GroupResponse; topic: TopicResponse; questions: QuestionResponse[] } | null;
  loading: { categories: boolean; groups: boolean; topics: boolean; questions: boolean; page: boolean };
  error: string | null;
}

const initialState: ContentState = {
  categories: [],
  groupsByCategoryId: {},
  topicsByGroupId: {},
  questionsByTopicId: {},
  categoryPage: null,
  groupPage: null,
  topicPage: null,
  loading: { categories: false, groups: false, topics: false, questions: false, page: false },
  error: null,
};

export function contentReducer(state = initialState, action: { type: string; payload?: unknown }): ContentState {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, loading: { ...state.loading, categories: true }, error: null };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload as CategoryResponse[],
        loading: { ...state.loading, categories: false },
        error: null,
      };
    case FETCH_CATEGORIES_FAIL:
      return { ...state, loading: { ...state.loading, categories: false }, error: (action.payload as string) ?? 'Failed to load categories' };

    case FETCH_GROUPS:
      return { ...state, loading: { ...state.loading, groups: true }, error: null };
    case FETCH_GROUPS_SUCCESS: {
      const { categoryId, data } = action.payload as { categoryId: string; data: GroupResponse[] };
      return {
        ...state,
        groupsByCategoryId: { ...state.groupsByCategoryId, [categoryId]: data },
        loading: { ...state.loading, groups: false },
        error: null,
      };
    }
    case FETCH_GROUPS_FAIL:
      return { ...state, loading: { ...state.loading, groups: false }, error: (action.payload as string) ?? 'Failed to load groups' };

    case FETCH_TOPICS:
      return { ...state, loading: { ...state.loading, topics: true }, error: null };
    case FETCH_TOPICS_SUCCESS: {
      const { groupId, data } = action.payload as { groupId: string; data: TopicResponse[] };
      return {
        ...state,
        topicsByGroupId: { ...state.topicsByGroupId, [groupId]: data },
        loading: { ...state.loading, topics: false },
        error: null,
      };
    }
    case FETCH_TOPICS_FAIL:
      return { ...state, loading: { ...state.loading, topics: false }, error: (action.payload as string) ?? 'Failed to load topics' };

    case FETCH_QUESTIONS:
      return { ...state, loading: { ...state.loading, questions: true }, error: null };
    case FETCH_QUESTIONS_SUCCESS: {
      const { topicId, data } = action.payload as { topicId: string; data: QuestionResponse[] };
      return {
        ...state,
        questionsByTopicId: { ...state.questionsByTopicId, [topicId]: data },
        loading: { ...state.loading, questions: false },
        error: null,
      };
    }
    case FETCH_QUESTIONS_FAIL:
      return { ...state, loading: { ...state.loading, questions: false }, error: (action.payload as string) ?? 'Failed to load questions' };

    case FETCH_CATEGORY_PAGE:
      return { ...state, loading: { ...state.loading, page: true }, error: null, categoryPage: null };
    case FETCH_CATEGORY_PAGE_SUCCESS:
      return {
        ...state,
        categoryPage: action.payload as { category: CategoryResponse; groups: GroupResponse[] },
        loading: { ...state.loading, page: false },
        error: null,
      };
    case FETCH_CATEGORY_PAGE_FAIL:
      return { ...state, categoryPage: null, loading: { ...state.loading, page: false }, error: (action.payload as string) ?? 'Failed to load page' };

    case FETCH_GROUP_PAGE:
      return { ...state, loading: { ...state.loading, page: true }, error: null, groupPage: null };
    case FETCH_GROUP_PAGE_SUCCESS:
      return {
        ...state,
        groupPage: action.payload as { category: CategoryResponse; group: GroupResponse; topics: TopicResponse[] },
        loading: { ...state.loading, page: false },
        error: null,
      };
    case FETCH_GROUP_PAGE_FAIL:
      return { ...state, groupPage: null, loading: { ...state.loading, page: false }, error: (action.payload as string) ?? 'Failed to load page' };

    case FETCH_TOPIC_PAGE:
      return { ...state, loading: { ...state.loading, page: true }, error: null, topicPage: null };
    case FETCH_TOPIC_PAGE_SUCCESS:
      return {
        ...state,
        topicPage: action.payload as { category: CategoryResponse; group: GroupResponse; topic: TopicResponse; questions: QuestionResponse[] },
        loading: { ...state.loading, page: false },
        error: null,
      };
    case FETCH_TOPIC_PAGE_FAIL:
      return { ...state, topicPage: null, loading: { ...state.loading, page: false }, error: (action.payload as string) ?? 'Failed to load page' };

    default:
      return state;
  }
}
