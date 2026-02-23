export function Hero() {
  return (
    <section className="section-spacing" aria-labelledby="hero-heading">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div className="min-w-0">
            <h1
              id="hero-heading"
              className="text-2xl min-[480px]:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-tight"
            >
              Master Coding Interviews with Confidence
            </h1>
            <p className="mt-3 sm:mt-4 text-sm min-[480px]:text-base md:text-lg text-text-secondary leading-relaxed max-w-lg">
              Development, DSA & System Design — Structured for Success
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="#categories" className="btn-primary w-full sm:w-auto text-center">
                Get Started
              </a>
              <a href="#categories" className="btn-secondary w-full sm:w-auto text-center">
                Explore Topics
              </a>
            </div>
          </div>
          <div className="flex justify-center items-center md:block order-first md:order-none">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

const LOGO_SRC = '/InterviewPrepLogo.png';

function HeroIllustration() {
  return (
    <div
      className="w-full max-w-[200px] min-[480px]:max-w-[240px] sm:max-w-[280px] md:max-w-md aspect-square rounded-card bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-4 sm:p-6 md:p-8"
      aria-hidden
    >
      <img
        src={LOGO_SRC}
        alt=""
        className="w-full h-full object-contain"
        width={280}
        height={280}
      />
    </div>
  );
}
