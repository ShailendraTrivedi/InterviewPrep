import { API_BASE_URL } from '../../envVariable';

/**
 * Backend API service for content. Base URL from {@link API_BASE_URL}.
 */

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

export type CategoryResponse = { id: string; name: string; title: string; icon: string };
export type GroupResponse = { id: string; categoryId: string; name: string; title: string; icon: string; topicCount?: number };
export type TopicResponse = { id: string; groupId: string; categoryId: string; name: string; title: string; questionCount?: number };
export type QuestionResponse = { id: string; categoryId: string; groupId: string; topicId: string; question: string; answer: string };

export const contentService = {
  getCategories: () => request<CategoryResponse[]>('/api/categories'),
  getCategoryByName: (name: string) => request<CategoryResponse>(`/api/categories/by-name/${encodeURIComponent(name)}`),
  getCategoryById: (id: string) => request<CategoryResponse>(`/api/categories/${id}`),
  getGroups: (categoryId?: string, includeTopicCount = true) => {
    const params = new URLSearchParams();
    if (categoryId) params.set('categoryId', categoryId);
    if (includeTopicCount) params.set('includeTopicCount', 'true');
    const q = params.toString();
    return request<GroupResponse[]>(`/api/groups${q ? `?${q}` : ''}`);
  },
  getGroupBySlug: (categoryId: string, name: string) =>
    request<GroupResponse>(`/api/groups/by-slug/${encodeURIComponent(categoryId)}/${encodeURIComponent(name)}`),
  getTopics: (groupId?: string, includeQuestionCount = true, search?: string) => {
    const params = new URLSearchParams();
    if (groupId) params.set('groupId', groupId);
    if (includeQuestionCount) params.set('includeQuestionCount', 'true');
    if (search && search.trim()) params.set('search', search.trim());
    const q = params.toString();
    return request<TopicResponse[]>(`/api/topics${q ? `?${q}` : ''}`);
  },
  getTopicBySlug: (groupId: string, name: string) =>
    request<TopicResponse>(`/api/topics/by-slug/${encodeURIComponent(groupId)}/${encodeURIComponent(name)}`),
  getQuestions: (topicId?: string) => {
    const q = topicId ? `?topicId=${encodeURIComponent(topicId)}` : '';
    return request<QuestionResponse[]>(`/api/questions${q}`);
  },
  /** Get questions for multiple topics. POST /api/questions/by-topics with body { topicIds }. */
  getQuestionsByTopicIds: (topicIds: string[]) => {
    if (topicIds.length === 0) return Promise.resolve([]);
    return request<QuestionResponse[]>(`/api/questions/by-topics`, {
      method: 'POST',
      body: JSON.stringify({ topicIds }),
    });
  },
  /** Create a new question. POST /api/questions. Answer is stored as-is (Markdown supported). */
  createQuestion: (topicId: string, question: string, answer: string) =>
    request<QuestionResponse>(`/api/questions`, {
      method: 'POST',
      body: JSON.stringify({ topicId, question, answer }),
    }),
  /** Update a question. PUT /api/questions/:id. */
  updateQuestion: (id: string, topicId: string, question: string, answer: string) =>
    request<QuestionResponse>(`/api/questions/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify({ topicId, question, answer }),
    }),
  /** Delete a question. DELETE /api/questions/:id. Returns 204 on success. */
  deleteQuestion: (id: string) =>
    request<void>(`/api/questions/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  /** Get single question by id with breadcrumb names for URL. GET /api/questions/:id */
  getQuestionById: (id: string) =>
    request<QuestionResponse & { categoryName: string; groupName: string; topicName: string }>(`/api/questions/${encodeURIComponent(id)}`),

  /** Page payloads: send slugs, get full data. */
  getCategoryPage: (categoryName: string) =>
    request<{ category: CategoryResponse; groups: GroupResponse[] }>(`/api/page/category/${encodeURIComponent(categoryName)}`),
  getGroupPage: (categoryName: string, groupName: string) =>
    request<{ category: CategoryResponse; group: GroupResponse; topics: TopicResponse[] }>(
      `/api/page/category/${encodeURIComponent(categoryName)}/group/${encodeURIComponent(groupName)}`
    ),
  getTopicPage: (categoryName: string, groupName: string, topicName: string) =>
    request<{ category: CategoryResponse; group: GroupResponse; topic: TopicResponse; questions: QuestionResponse[] }>(
      `/api/page/category/${encodeURIComponent(categoryName)}/group/${encodeURIComponent(groupName)}/topic/${encodeURIComponent(topicName)}`
    ),
};
