export function CTA() {
  return (
    <section
      className="section-spacing bg-gradient-to-br from-primary to-secondary"
      aria-labelledby="cta-heading"
    >
      <div className="container-narrow text-center">
        <h2
          id="cta-heading"
          className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
        >
          Start Preparing Today
        </h2>
        <p className="mt-2 text-sm sm:text-base text-white/90 max-w-md mx-auto px-1">
          Join thousands of developers who are acing their interviews.
        </p>
        <a
          href="#categories"
          className="btn-dark mt-6 sm:mt-8 inline-block w-full sm:w-auto"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
