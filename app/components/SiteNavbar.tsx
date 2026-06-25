import { useState } from 'react';
import { Link } from 'react-router';

const NAV_LINKS = [
  { label: 'Routes',  href: '/routes'  },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ',     href: '/faq'     },
] as const;

export function SiteNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav className="absolute top-0 left-0 right-0 z-50">

        {/* ── Top bar ── */}
        <div className="mx-auto w-full">
        <div className="container flex items-center justify-between h-20 md:h-24 max-w-content">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 md:gap-4">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-sand/40 flex items-center justify-center shrink-0">
              <CompassIcon />
            </div>
            <span className="font-display text-lg md:text-xl text-sand tracking-wide">
              Budget<br />Desert<br />Tour
            </span>
            <div className="hidden md:block w-px h-11 bg-sand/25" />
            <p className="hidden md:block font-body text-author text-sand/60">
              Real Sahara.<br />Fair price.<br />Stories you'll tell forever.
            </p>
          </Link>

          {/* Desktop nav pill */}
          <div className="hidden lg:flex items-center gap-8 bg-white/15 rounded-full pl-7 pr-1 py-1 backdrop-blur-md">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="font-body font-bold text-base text-sand/80 hover:text-sand transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <BookButton />
          </div>

          {/* Tablet: CTA + hamburger */}
          <div className="hidden md:flex lg:hidden items-center gap-4">
            <BookButton />
            <HamburgerButton open={open} onClick={() => setOpen(v => !v)} />
          </div>

          {/* Mobile: hamburger only */}
          <div className="flex md:hidden">
            <HamburgerButton open={open} onClick={() => setOpen(v => !v)} />
          </div>
        </div>
        </div>

        {/* ── Mobile / tablet dropdown ── */}
        {open && (
          <div className="mx-auto w-full">
            <div className="container pb-4">
              <div className="p-6 rounded-[1.5rem] bg-dark/90 border border-sand/10 backdrop-blur-md flex flex-col gap-1">
                <ul className="flex flex-col gap-1 mb-4">
                  {NAV_LINKS.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        to={href}
                        onClick={() => setOpen(false)}
                        className="block font-body font-bold text-base text-sand/80 hover:text-sand hover:bg-white/5 px-4 py-3 rounded-xl transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <BookButton fullWidth />
              </div>
            </div>
          </div>
        )}

      </nav>
    </header>
  );
}

// ── Sub-components ────────────────────────────────────────────

function BookButton({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <Link
      to="/book"
      className={`font-display text-btn text-sand text-center bg-primary rounded-full px-7 py-2 hover:opacity-90 transition-opacity whitespace-nowrap ${fullWidth ? 'w-full' : ''}`}
    >
      Book Now
    </Link>
  );
}

function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      className="flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-full border border-sand/20 bg-white/10 backdrop-blur-md"
    >
      <span className={`block w-5 h-px bg-sand/80 transition-transform duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
      <span className={`block w-5 h-px bg-sand/80 transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
      <span className={`block w-3 h-px bg-sand/80 transition-transform duration-200 ${open ? '-translate-y-2 -rotate-45 w-5' : ''}`} />
    </button>
  );
}

function CompassIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="9.5" stroke="#F5EDE0" strokeOpacity=".7" strokeWidth="1.2" />
      <circle cx="11" cy="11" r="1.5" fill="#F5EDE0" fillOpacity=".7" />
      <path d="M11 4V7M11 15V18M4 11H7M15 11H18" stroke="#F5EDE0" strokeOpacity=".5" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 8L10.5 10.5" stroke="#C45A2C" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11.5 11.5L14 14" stroke="#F5EDE0" strokeOpacity=".4" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
