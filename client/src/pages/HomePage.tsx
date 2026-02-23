import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Categories } from '../components/Categories';
import { Features } from '../components/Features';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { useProgress } from '../hooks/useProgress';

export function HomePage() {
  const { totalViewedCount } = useProgress();

  return (
    <>
      <Hero />
      {totalViewedCount > 0 && (
        <div className="bg-primary/10 border-y border-primary/20">
          <div className="container-narrow py-3 sm:py-4">
            <p className="text-center text-sm sm:text-base text-text-primary">
              <span className="font-medium text-primary">Your progress:</span>{' '}
              You&apos;ve marked {totalViewedCount} question{totalViewedCount !== 1 ? 's' : ''} as done.{' '}
              <Link to="/#categories" className="text-primary font-medium hover:underline">
                Continue learning →
              </Link>
            </p>
          </div>
        </div>
      )}
      <Categories />
      <Features />
      <CTA />
      <Footer />
    </>
  );
}
