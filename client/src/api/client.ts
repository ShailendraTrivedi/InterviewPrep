/**
 * Backend API client. Base URL from VITE_API_URL or default localhost:5000.
 */
const BASE = (import.meta as unknown as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL ?? 'http://localhost:5000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
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

export const api = {
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
  getTopics: (groupId?: string, includeQuestionCount = true) => {
    const params = new URLSearchParams();
    if (groupId) params.set('groupId', groupId);
    if (includeQuestionCount) params.set('includeQuestionCount', 'true');
    const q = params.toString();
    return request<TopicResponse[]>(`/api/topics${q ? `?${q}` : ''}`);
  },
  getTopicBySlug: (groupId: string, name: string) =>
    request<TopicResponse>(`/api/topics/by-slug/${encodeURIComponent(groupId)}/${encodeURIComponent(name)}`),
  getQuestions: (topicId?: string) => {
    const q = topicId ? `?topicId=${encodeURIComponent(topicId)}` : '';
    return request<QuestionResponse[]>(`/api/questions${q}`);
  },
};
