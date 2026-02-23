import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchGroupPage, useAppSelector } from '../redux';

export function TopicPage() {
  const { categoryId, groupSlug } = useParams<{ categoryId: string; groupSlug: string }>();
  const dispatch = useDispatch();
  const groupPage = useAppSelector((s) => s.content.groupPage);
  const pageLoading = useAppSelector((s) => s.content.loading.page);

  useEffect(() => {
    if (categoryId && groupSlug) dispatch(fetchGroupPage(categoryId, groupSlug));
  }, [categoryId, groupSlug, dispatch]);

  const dataMatches = groupPage?.category.name === categoryId && groupPage?.group.name === groupSlug;

  if (!categoryId || !groupSlug) return null;

  if (pageLoading || !dataMatches) {
    return (
      <main className="section-spacing">
        <div className="container-narrow text-text-secondary">Loading…</div>
      </main>
    );
  }
  if (!groupPage) return <Navigate to="/" replace />;

  const { category, group, topics } = groupPage;
  return (
    <main className="section-spacing">
      <div className="container-narrow">
        <Link to={`/${category.name}`} className="text-primary hover:underline text-sm mb-4 sm:mb-6 inline-block py-1">
          ← Back to {category.title}
        </Link>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary flex items-center gap-2 sm:gap-3 flex-wrap">
          <span aria-hidden>{group.icon}</span>
          {group.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-text-secondary">
          Click a topic to see interview questions and answers for that topic.
        </p>

        <section className="mt-6 sm:mt-10" aria-labelledby="topics-heading">
          <h2 id="topics-heading" className="text-base sm:text-lg font-medium text-text-primary mb-4 sm:mb-6">
            Topics
          </h2>
          <ul className="flex flex-col gap-2 sm:gap-3">
            {topics.map((topic) => {
              const qCount = topic.questionCount ?? 0;
              return (
                <li key={topic.id}>
                  <Link
                    to={`/${category.name}/${group.name}/${topic.name}`}
                    className="card flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:border-primary/50 hover:shadow-soft-lg transition-all duration-300 min-h-[44px] sm:min-h-0"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <span className="text-xl sm:text-2xl shrink-0" aria-hidden>{group.icon}</span>
                      <h2 className="text-base sm:text-lg font-semibold text-text-primary truncate">
                        {topic.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <span className="text-xs sm:text-sm text-text-secondary whitespace-nowrap">
                        {qCount === 0 ? 'No questions yet' : `${qCount} question${qCount !== 1 ? 's' : ''}`}
                      </span>
                      <span className="text-primary" aria-hidden>→</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}
