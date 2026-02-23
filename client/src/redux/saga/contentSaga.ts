import { call, put, takeLatest } from 'redux-saga/effects';
import type { SagaIterator } from 'redux-saga';
import { contentService } from '../service/contentService';
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

function* fetchCategoriesSaga(): SagaIterator {
  try {
    const data: Awaited<ReturnType<typeof contentService.getCategories>> = yield call(contentService.getCategories);
    yield put({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: FETCH_CATEGORIES_FAIL, payload: (err as Error).message });
  }
}

function* fetchGroupsSaga(action: { type: string; payload: { categoryId: string } }): SagaIterator {
  try {
    const { categoryId } = action.payload;
    const data: Awaited<ReturnType<typeof contentService.getGroups>> = yield call(contentService.getGroups, categoryId, true);
    yield put({ type: FETCH_GROUPS_SUCCESS, payload: { categoryId, data } });
  } catch (err) {
    yield put({ type: FETCH_GROUPS_FAIL, payload: (err as Error).message });
  }
}

function* fetchTopicsSaga(action: { type: string; payload: { groupId: string } }): SagaIterator {
  try {
    const { groupId } = action.payload;
    const data: Awaited<ReturnType<typeof contentService.getTopics>> = yield call(contentService.getTopics, groupId, true);
    yield put({ type: FETCH_TOPICS_SUCCESS, payload: { groupId, data } });
  } catch (err) {
    yield put({ type: FETCH_TOPICS_FAIL, payload: (err as Error).message });
  }
}

function* fetchQuestionsSaga(action: { type: string; payload: { topicId: string } }): SagaIterator {
  try {
    const { topicId } = action.payload;
    const data: Awaited<ReturnType<typeof contentService.getQuestions>> = yield call(contentService.getQuestions, topicId);
    yield put({ type: FETCH_QUESTIONS_SUCCESS, payload: { topicId, data } });
  } catch (err) {
    yield put({ type: FETCH_QUESTIONS_FAIL, payload: (err as Error).message });
  }
}

function* fetchCategoryPageSaga(action: { type: string; payload: { categoryName: string } }): SagaIterator {
  try {
    const { categoryName } = action.payload;
    const data = yield call(contentService.getCategoryPage, categoryName);
    yield put({ type: FETCH_CATEGORY_PAGE_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: FETCH_CATEGORY_PAGE_FAIL, payload: (err as Error).message });
  }
}

function* fetchGroupPageSaga(action: { type: string; payload: { categoryName: string; groupName: string } }): SagaIterator {
  try {
    const { categoryName, groupName } = action.payload;
    const data = yield call(contentService.getGroupPage, categoryName, groupName);
    yield put({ type: FETCH_GROUP_PAGE_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: FETCH_GROUP_PAGE_FAIL, payload: (err as Error).message });
  }
}

function* fetchTopicPageSaga(action: { type: string; payload: { categoryName: string; groupName: string; topicName: string } }): SagaIterator {
  try {
    const { categoryName, groupName, topicName } = action.payload;
    const data = yield call(contentService.getTopicPage, categoryName, groupName, topicName);
    yield put({ type: FETCH_TOPIC_PAGE_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: FETCH_TOPIC_PAGE_FAIL, payload: (err as Error).message });
  }
}

export function* contentSaga(): SagaIterator {
  yield takeLatest(FETCH_CATEGORIES, fetchCategoriesSaga);
  yield takeLatest(FETCH_GROUPS, fetchGroupsSaga);
  yield takeLatest(FETCH_TOPICS, fetchTopicsSaga);
  yield takeLatest(FETCH_QUESTIONS, fetchQuestionsSaga);
  yield takeLatest(FETCH_CATEGORY_PAGE, fetchCategoryPageSaga);
  yield takeLatest(FETCH_GROUP_PAGE, fetchGroupPageSaga);
  yield takeLatest(FETCH_TOPIC_PAGE, fetchTopicPageSaga);
}
