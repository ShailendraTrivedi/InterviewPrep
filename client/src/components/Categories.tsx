import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCategories, useAppSelector } from '../redux';

export function Categories() {
  const dispatch = useDispatch();
  const categories = useAppSelector((s) => s.content.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section
      id="categories"
      className="section-spacing bg-white"
      aria-labelledby="categories-heading"
    >
      <div className="container-narrow">
        <h2
          id="categories-heading"
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary text-center mb-8 sm:mb-12"
        >
          What You&apos;ll Learn
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/${cat.name}`} className="card-hover border-t-4 border-primary block">
              <span className="text-2xl sm:text-3xl" aria-hidden>
                {cat.icon}
              </span>
              <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-text-primary">
                {cat.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
