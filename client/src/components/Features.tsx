import { features } from '../constants';

export function Features() {
  return (
    <section className="section-spacing" aria-labelledby="features-heading">
      <div className="container-narrow">
        <h2
          id="features-heading"
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary text-center mb-8 sm:mb-12"
        >
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="card text-center">
              <span className="text-xl sm:text-2xl" aria-hidden>
                {feature.icon}
              </span>
              <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-text-primary">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
