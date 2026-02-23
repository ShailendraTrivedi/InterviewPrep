import { footerLinks, socialLinks } from '../constants';

export function Footer() {
  return (
    <footer className="bg-dark-accent text-white py-8 sm:py-10 md:py-12" role="contentinfo">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-4 sm:gap-6">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-white/90 hover:text-white transition-colors py-2 min-h-[44px] flex items-center sm:min-h-0"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-3 sm:gap-4" aria-label="Social links">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-sm font-medium"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-6 sm:mt-8 text-white/70 text-xs sm:text-sm">
          © {new Date().getFullYear()} Interview Prep Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
