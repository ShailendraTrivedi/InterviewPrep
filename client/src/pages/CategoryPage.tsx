import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCategoryPage, useAppSelector } from '../redux';

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const dispatch = useDispatch();
  const categoryPage = useAppSelector((s) => s.content.categoryPage);
  const pageLoading = useAppSelector((s) => s.content.loading.page);

  useEffect(() => {
    if (categoryId) dispatch(fetchCategoryPage(categoryId));
  }, [categoryId, dispatch]);

  const dataMatches = categoryPage?.category.name === categoryId;

  if (!categoryId) return null;

  if (pageLoading || !dataMatches) {
    return (
      <main className="section-spacing">
        <div className="container-narrow text-text-secondary">Loading…</div>
      </main>
    );
  }
  if (!categoryPage) return <Navigate to="/" replace />;

  const { category, groups } = categoryPage;
  return (
    <main className="section-spacing">
      <div className="container-narrow">
        <Link to="/" className="text-primary hover:underline text-sm mb-4 sm:mb-6 inline-block py-1">
          ← Back to Home
        </Link>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary flex items-center gap-2 sm:gap-3 flex-wrap">
          <span aria-hidden>{category.icon}</span>
          {category.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-text-secondary">
          Choose a topic group to see subtopics and interview Q&A.
        </p>
        <ul className="mt-6 sm:mt-10 flex flex-col gap-2 sm:gap-3">
          {groups.map((group) => (
            <li key={group.id}>
              <Link
                to={`/${category.name}/${group.name}`}
                className="card flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:border-primary/50 hover:shadow-soft-lg transition-all duration-300 min-h-[44px] sm:min-h-0"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span className="text-xl sm:text-2xl shrink-0" aria-hidden>{group.icon}</span>
                  <h2 className="text-base sm:text-lg font-semibold text-text-primary truncate">
                    {group.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <span className="text-xs sm:text-sm text-text-secondary whitespace-nowrap">
                    {group.topicCount ?? 0} topic{(group.topicCount ?? 0) !== 1 ? 's' : ''}
                  </span>
                  <span className="text-primary" aria-hidden>→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
