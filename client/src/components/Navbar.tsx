import { useState } from 'react';
import { Link } from 'react-router-dom';

const LOGO_SRC = '/InterviewPrepLogo.png';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-soft"
      role="banner"
    >
      <nav className="container-narrow flex items-center justify-between h-16 md:h-20" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink" aria-label="InterviewPrep - Home">
          <img
            src={LOGO_SRC}
            alt=""
            className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 object-contain"
            width={44}
            height={44}
          />
          <span className="font-semibold text-text-primary text-base sm:text-lg truncate hidden sm:inline">InterviewPrep</span>
        </Link>

        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <Link to="/add-question" className="btn-secondary text-sm py-2.5 px-5">
            Add question
          </Link>
          <Link to="/start-quiz" className="btn-secondary text-sm py-2.5 px-5">
            Start Quiz
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-3 -mr-2 rounded-lg hover:bg-bg-base nav-link min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <MenuIcon open={menuOpen} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <ul className="container-narrow py-4 flex flex-col gap-4">
            <li className="pt-2 flex flex-col gap-2">
              <Link to="/add-question" className="btn-secondary text-center py-3" onClick={() => setMenuOpen(false)}>
                Add question
              </Link>
              <Link to="/start-quiz" className="btn-secondary text-center py-3" onClick={() => setMenuOpen(false)}>
                Start Quiz
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="block w-6 h-5 relative">
      <span
        className={`absolute left-0 w-6 h-0.5 bg-current rounded transition-all duration-200 ${
          open ? 'top-2 rotate-45' : 'top-0'
        }`}
      />
      <span
        className={`absolute left-0 top-2 w-6 h-0.5 bg-current rounded transition-all duration-200 ${
          open ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`absolute left-0 w-6 h-0.5 bg-current rounded transition-all duration-200 ${
          open ? 'top-2 -rotate-45' : 'top-4'
        }`}
      />
    </span>
  );
}
