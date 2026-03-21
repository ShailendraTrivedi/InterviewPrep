import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MarkdownBody } from '../components/MarkdownBody';
import { contentService } from '../redux/service/contentService';
import type { CategoryResponse, GroupResponse, TopicResponse } from '../redux/service/contentService';

export function AddQuestionPage() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [groups, setGroups] = useState<GroupResponse[]>([]);
  const [topics, setTopics] = useState<TopicResponse[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [topicId, setTopicId] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [questionMode, setQuestionMode] = useState<'code' | 'preview'>('code');
  const [answerMode, setAnswerMode] = useState<'code' | 'preview'>('code');

  useEffect(() => {
    contentService
      .getCategories()
      .then(setCategories)
      .catch(() => setError('Failed to load categories'))
      .finally(() => setCategoriesLoading(false));
  }, []);

  useEffect(() => {
    if (!categoryId) {
      setGroups([]);
      setGroupId('');
      setTopicId('');
      setTopics([]);
      return;
    }
    setGroupsLoading(true);
    contentService
      .getGroups(categoryId)
      .then(setGroups)
      .catch(() => setError('Failed to load groups'))
      .finally(() => setGroupsLoading(false));
    setGroupId('');
    setTopicId('');
    setTopics([]);
  }, [categoryId]);

  useEffect(() => {
    if (!groupId) {
      setTopics([]);
      setTopicId('');
      return;
    }
    setTopicsLoading(true);
    contentService
      .getTopics(groupId)
      .then(setTopics)
      .catch(() => setError('Failed to load topics'))
      .finally(() => setTopicsLoading(false));
    setTopicId('');
  }, [groupId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!topicId.trim() || !question.trim() || !answer.trim()) {
      setError('Please select a topic and enter both question and answer.');
      return;
    }
    setLoading(true);
    try {
      await contentService.createQuestion(topicId, question, answer);
      setSuccess(true);
      setQuestion('');
      setAnswer('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create question');
    } finally {
      setLoading(false);
    }
  }

  if (categoriesLoading && categories.length === 0) {
    return (
      <main className="section-spacing">
        <div className="container-narrow text-text-secondary">Loading…</div>
      </main>
    );
  }

  return (
    <main className="section-spacing">
      <div className="container-narrow max-w-2xl">
        <Link to="/" className="text-primary hover:underline text-sm mb-4 sm:mb-6 inline-block py-1">
          ← Back to Home
        </Link>
        <h1 className="text-xl sm:text-2xl font-semibold text-text-primary mb-2">Add new question</h1>
        <p className="text-sm text-text-secondary mb-6">
          Select Category → Group → Topic, then enter the question and answer. Answer supports Markdown.
        </p>

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-800 border border-green-200" role="alert">
            Question added successfully. You can add another below.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-1">
              Category
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="input-base w-full"
              required
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="group" className="block text-sm font-medium text-text-primary mb-1">
              Group
            </label>
            <select
              id="group"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              className="input-base w-full"
              required
              disabled={!categoryId || groupsLoading}
            >
              <option value="">{groupsLoading ? 'Loading…' : 'Select group'}</option>
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-text-primary mb-1">
              Topic
            </label>
            <select
              id="topic"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="input-base w-full"
              required
              disabled={!groupId || topicsLoading}
            >
              <option value="">{topicsLoading ? 'Loading…' : 'Select topic'}</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <label htmlFor="question" className="text-sm font-medium text-text-primary">
                Question <span className="text-text-secondary font-normal">(Markdown supported)</span>
              </label>
              <div className="flex rounded-lg border border-gray-200 p-0.5 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setQuestionMode('code')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    questionMode === 'code'
                      ? 'bg-white text-primary shadow-sm border border-gray-200'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Code
                </button>
                <button
                  type="button"
                  onClick={() => setQuestionMode('preview')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    questionMode === 'preview'
                      ? 'bg-white text-primary shadow-sm border border-gray-200'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>
            {questionMode === 'code' ? (
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="input-base w-full min-h-[120px] font-mono text-sm"
                placeholder="Enter the question. You can use **bold**, lists, code, etc."
                required
                rows={5}
              />
            ) : (
              <div
                className="input-base w-full min-h-[120px] text-sm markdown-content overflow-y-auto"
                aria-live="polite"
              >
                {question.trim() ? (
                  <MarkdownBody>{question}</MarkdownBody>
                ) : (
                  <p className="text-text-secondary italic">Nothing to preview yet. Switch to Code to write.</p>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <label htmlFor="answer" className="text-sm font-medium text-text-primary">
                Answer <span className="text-text-secondary font-normal">(Markdown supported)</span>
              </label>
              <div className="flex rounded-lg border border-gray-200 p-0.5 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setAnswerMode('code')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    answerMode === 'code'
                      ? 'bg-white text-primary shadow-sm border border-gray-200'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Code
                </button>
                <button
                  type="button"
                  onClick={() => setAnswerMode('preview')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    answerMode === 'preview'
                      ? 'bg-white text-primary shadow-sm border border-gray-200'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>
            {answerMode === 'code' ? (
              <textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="input-base w-full min-h-[200px] font-mono text-sm"
                placeholder="Enter the answer. You can use **bold**, lists, code blocks, etc."
                required
                rows={10}
              />
            ) : (
              <div
                className="input-base w-full min-h-[200px] text-sm markdown-content overflow-y-auto"
                aria-live="polite"
              >
                {answer.trim() ? (
                  <MarkdownBody>{answer}</MarkdownBody>
                ) : (
                  <p className="text-text-secondary italic">Nothing to preview yet. Switch to Code to write.</p>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary py-3 px-6 w-full sm:w-auto" disabled={loading}>
            {loading ? 'Saving…' : 'Add question'}
          </button>
        </form>
      </div>
    </main>
  );
}
