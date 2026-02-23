import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';
import { fetchTopicPage, useAppSelector } from '../redux';
import { contentService } from '../redux/service/contentService';
import { useProgress } from '../hooks/useProgress';

export function ItemPage() {
  const { categoryId, groupSlug, itemSlug } = useParams<{
    categoryId: string;
    groupSlug: string;
    itemSlug: string;
  }>();
  const dispatch = useDispatch();
  const topicPage = useAppSelector((s) => s.content.topicPage);
  const pageLoading = useAppSelector((s) => s.content.loading.page);
  const [collapseAllKey, setCollapseAllKey] = useState(0);
  const { markViewed, isViewed, getViewedCount } = useProgress();

  useEffect(() => {
    if (categoryId && groupSlug && itemSlug) dispatch(fetchTopicPage(categoryId, groupSlug, itemSlug));
  }, [categoryId, groupSlug, itemSlug, dispatch]);

  const dataMatches =
    topicPage?.category.name === categoryId &&
    topicPage?.group.name === groupSlug &&
    topicPage?.topic.name === itemSlug;

  if (!categoryId || !groupSlug || !itemSlug) return null;

  if (pageLoading || !dataMatches) {
    return (
      <main className="section-spacing">
        <div className="mx-auto max-w-5xl px-3 sm:px-4 lg:px-6 text-text-secondary">Loading…</div>
      </main>
    );
  }
  if (!topicPage) return <Navigate to="/" replace />;

  const { category, group, topic, questions } = topicPage;
  const viewedInTopic = getViewedCount(questions.map((q) => q.id));

  async function handleDeleteQuestion(questionId: string) {
    if (!categoryId || !groupSlug || !itemSlug) return;
    if (!window.confirm('Delete this question? This cannot be undone.')) return;
    try {
      await contentService.deleteQuestion(questionId);
      dispatch(fetchTopicPage(categoryId, groupSlug, itemSlug));
    } catch (err) {
      console.error(err);
      window.alert(err instanceof Error ? err.message : 'Failed to delete question');
    }
  }

  return (
    <main className="section-spacing">
      <div className="mx-auto max-w-5xl px-3 sm:px-4 lg:px-6">
        <Link
          to={`/${category.name}/${group.name}`}
          className="text-primary hover:underline text-sm mb-4 sm:mb-6 inline-block py-1"
        >
          ← Back to {group.title}
        </Link>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary flex items-center gap-2 sm:gap-3 flex-wrap">
          <span aria-hidden>{group.icon}</span>
          {topic.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-text-secondary">
          Interview questions and answers for this topic. Click to expand or collapse the answer.
        </p>
        {questions.length > 0 && (
          <p className="mt-1 text-sm text-primary font-medium" role="status">
            Your progress: {viewedInTopic} of {questions.length} question{questions.length !== 1 ? 's' : ''} done
          </p>
        )}

        <section className="mt-6 sm:mt-10" aria-labelledby="qa-heading">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 id="qa-heading" className="text-base sm:text-lg font-medium text-text-primary">
              Interview Questions & Answers
            </h2>
            {questions.length > 0 && (
              <button
                type="button"
                onClick={() => setCollapseAllKey((k) => k + 1)}
                className="text-sm font-medium text-primary hover:text-primary/80 border border-primary/40 hover:border-primary/60 rounded-button px-3 py-2 transition-colors"
              >
                Collapse all
              </button>
            )}
          </div>
          {questions.length === 0 ? (
            <p className="text-text-secondary text-sm">No questions added yet for this topic.</p>
          ) : (
            <ul className="space-y-3 sm:space-y-4">
              {questions.map((qa) => (
                <QuestionCard
                  key={qa.id}
                  questionId={qa.id}
                  question={qa.question}
                  answer={qa.answer}
                  collapseAllKey={collapseAllKey}
                  isViewed={isViewed(qa.id)}
                  onViewed={() => markViewed(qa.id)}
                  onDelete={handleDeleteQuestion}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

function QuestionCard({
  questionId,
  question,
  answer,
  collapseAllKey,
  isViewed,
  onViewed,
  onDelete,
}: {
  questionId: string;
  question: string;
  answer: string;
  collapseAllKey: number;
  isViewed: boolean;
  onViewed: () => void;
  onDelete: (questionId: string) => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [collapseAllKey]);

  return (
    <li className="rounded-card bg-white shadow-soft overflow-hidden border border-gray-100/80">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full text-left flex items-center gap-3 p-4 sm:p-5 hover:bg-gray-50/50 transition-colors"
        aria-expanded={open}
      >
        <span
          className="shrink-0 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold text-lg leading-none"
          aria-hidden
        >
          {open ? '−' : '+'}
        </span>
        <div className="markdown-content font-semibold text-text-primary text-sm sm:text-base flex-1 min-w-0">
          <ReactMarkdown>{question}</ReactMarkdown>
        </div>
        <Link
          to={`/update-question/${questionId}`}
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          title="Edit question"
          aria-label="Edit question"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(questionId);
          }}
          className="shrink-0 p-1.5 rounded-lg text-text-secondary hover:text-red-600 hover:bg-red-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          title="Delete question"
          aria-label="Delete question"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        {isViewed && (
          <span
            className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary"
            title="Done"
            aria-label="Done"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}
      </button>
      {open && (
        <div className="border-t border-gray-100 bg-gray-50/40 px-4 sm:px-5 py-4 markdown-content text-sm sm:text-base text-text-secondary max-w-full min-w-0">
          <ReactMarkdown>{answer}</ReactMarkdown>
          {!isViewed ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewed();
              }}
              className="mt-4 text-sm font-medium text-primary hover:text-primary/80 border border-primary/40 hover:border-primary/60 rounded-button px-4 py-2 transition-colors"
            >
              Done
            </button>
          ) : (
            <p className="mt-4 text-sm text-primary font-medium">Done ✓</p>
          )}
        </div>
      )}
    </li>
  );
}
