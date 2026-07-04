import dunesSvg from '~/assets/dunes.svg?url';
import sunSvg from '~/assets/sun.svg?url';
import sunlightSvg from '~/assets/sunlight.svg?url';

interface NavLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: 'instagram' | 'tiktok';
}

const CHECKS: string[] = ['Secure payment', 'Free cancellation', 'Verified local agency'];

const NAV_LINKS: NavLink[] = [
  {label: 'Book', href: '#book'},
  {label: 'Routes', href: '#routes'},
  {label: 'Reviews', href: '#reviews'},
  {label: 'FAQ', href: '#faq'},
  {label: 'About', href: '#about'},
  {label: 'Contact', href: '#contact'},
];

const LEGAL_LINKS: NavLink[] = [
  {label: 'Terms', href: '#terms'},
  {label: 'Privacy', href: '#privacy'},
  {label: 'Refund Policy', href: '#refund'},
];

const SOCIAL_LINKS: SocialLink[] = [
  {label: 'Instagram', href: '#', icon: 'instagram'},
  {label: 'TikTok', href: '#', icon: 'tiktok'},
];

export interface SiteFooterProps {
  /** Main headline. */
  headline?: string;
  /** Destination for the primary CTA button. */
  ctaHref?: string;
  /** Destination for the WhatsApp prompt link. */
  whatsappHref?: string;
  /** Toggle the decorative camel caravan silhouette. */
  showCamels?: boolean;
}

export function SiteFooter({
  headline = 'Your story starts at sunset.',
  ctaHref = '#book',
  whatsappHref = '#whatsapp',
  showCamels = true,
}: SiteFooterProps) {
  return (
    <section
      aria-label="Book your desert adventure"
      className="hero-bg relative overflow-hidden font-body"
    >
      {/* ── Sunset scene (mirrors Hero layer stack) ── */}
      <div className="relative flex min-h-180 items-start justify-center px-5 text-center py-32">
        {/* Layer 4 — Sunlight */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-4 pointer-events-none h-full flex items-end">
          <img src={sunlightSvg} alt="" className="w-full h-full max-h-180 lg:min-h-212 object-cover" />
        </div>
        {/* Layer 3 — Warm bottom gradient */}
        <div aria-hidden="true" className="hero-gradient absolute inset-x-0 bottom-0 z-6 pointer-events-none h-full" />
        {/* Layer 2 — Sun */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-8 pointer-events-none h-full flex items-end">
          <img src={sunSvg} alt="" className="w-full h-full max-h-180 lg:min-h-212 object-cover" />
        </div>
        {/* Camel caravan (above dunes) */}
        {showCamels && <CamelCaravan />}
        {/* Layer 1 — Dunes (frontmost) */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-10 pointer-events-none">
          <img src={dunesSvg} alt="" className="w-full h-72.5 lg:h-72.5 object-cover object-bottom" />
        </div>

        {/* Content — above all layers */}
        <div className="relative z-20 mx-auto max-w-170 w-full">
          <h2 className="sf-headline font-display text-sand text-h3 md:text-h2">
            {headline}
          </h2>

          <p className="mt-4 md:mt-5 text-sand text-base">
            Book your spot with 20%.
            <br />
            Pay the rest on the day of the excursion.
          </p>

          <ul
            role="list"
            className="sf-checks mt-7 md:mt-18 flex flex-wrap items-center justify-center gap-y-3.5"
          >
            {CHECKS.map((label) => (
              <li
                key={label}
                className="flex items-center gap-2.5 whitespace-nowrap text-sand font-medium text-label md:text-base"
              >
                <CheckIcon />
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <a
            href={ctaHref}
            className="mt-8 md:mt-10 inline-flex items-center gap-3 rounded-full font-display
                       text-white text-btn px-7 md:px-10 py-3.5 md:py-4
                       bg-gradient-to-b from-[#cc6533] to-primary
                       shadow-card-m
                       transition-transform duration-200 hover:-translate-y-0.5"
          >
            Book Your Adventure Today
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 5 7 7-7 7" />
            </svg>
          </a>

          <p className="mt-6 md:mt-20 flex items-center justify-center gap-1.5 text-sand text-label">
            Or WhatsApp us if you&rsquo;d rather talk first
            <a href={whatsappHref} aria-label="Chat with us on WhatsApp" className="text-[1.05em]">
              <span role="img" aria-hidden="true">&#128522;</span>
            </a>
          </p>
        </div>
      </div>

      {/* ── Footer bar ── */}
      <footer className="sf-footer-bar relative z-3 bg-[#1A161D] px-5 text-center py-20">
        <nav
          aria-label="Footer"
          className="mb-10 md:mb-16 flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2"
        >
          {NAV_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-x-3.5">
              <a
                href={link.href}
                className="text-sand text-label font-medium transition-colors hover:text-[#f4b06a]"
              >
                {link.label}
              </a>
              {i < NAV_LINKS.length - 1 && (
                <span aria-hidden="true" className="select-none text-sand text-[0.4rem]">
                  &bull;
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className="mb-6 md:mb-8 flex items-center justify-center gap-2">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center
                         text-sand transition-colors hover:text-[#f4b06a]"
            >
              <SocialIcon icon={s.icon} />
            </a>
          ))}
        </div>

        <nav aria-label="Legal" className="mb-10 md:mb-16 flex flex-wrap items-center justify-center gap-3">
          {LEGAL_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-3">
              <a href={link.href} className="text-sand text-[0.85rem] transition-colors hover:text-[#e5d6c2]">
                {link.label}
              </a>
              {i < LEGAL_LINKS.length - 1 && (
                <span aria-hidden="true" className="text-sand text-[0.7rem]">
                  &bull;
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className="mb-7 md:mb-8 inline-flex flex-col items-center gap-3 text-center sm:flex-row sm:gap-[18px] sm:text-left">
          <CompassMark />
          <span className="font-display font-bold text-sand text-base">
            Budget
            <br />
            Desert
            <br />
            Tour
          </span>
          <span aria-hidden="true" className="hidden w-px self-stretch bg-[#e5d6c2]/25 sm:block" />
          <span className="text-sand text-[0.76rem]">
            Real Sahara.
            <br />
            Fair price.
            <br />
            Stories you&rsquo;ll tell forever.
          </span>
        </div>

        <p className="text-sand text-[0.8rem]">&copy; 2026 Budget Desert Tour &trade;. All rights reserved.</p>
      </footer>
    </section>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function CamelCaravan() {
  const positions = [
    {x: 2, y: 16, scale: 0.9},
    {x: 78, y: 8, scale: 1},
    {x: 150, y: 3, scale: 1},
    {x: 222, y: 8, scale: 1},
    {x: 292, y: 14, scale: 0.92},
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 64"
      className="sf-camel absolute z-[12] left-1/2 h-auto -translate-x-1/2 text-[#150a06]"
    >
      <defs>
        <g id="fc-camel">
          <rect x="15" y="26" width="3" height="16" rx="1.4" />
          <rect x="22" y="26" width="3" height="16" rx="1.4" />
          <rect x="35" y="26" width="3" height="16" rx="1.4" />
          <rect x="42" y="26" width="3" height="16" rx="1.4" />
          <ellipse cx="30" cy="24" rx="15" ry="6.5" />
          <ellipse cx="29" cy="16.5" rx="9" ry="6" />
          <polygon points="43,25 46,24 52,7 48.5,5.5 45,7 41,22" />
          <ellipse cx="51" cy="6" rx="4" ry="2.8" />
          <polygon points="53,5 58,6 53,7.6" />
          <rect x="13.5" y="20" width="3" height="6" rx="1.5" transform="rotate(24 15 22)" />
          <ellipse cx="29" cy="9.5" rx="3.2" ry="4.2" />
          <circle cx="29" cy="4.5" r="2.3" />
        </g>
      </defs>
      {positions.map((p, i) => (
        <use key={i} href="#fc-camel" x={p.x} y={p.y} transform={p.scale !== 1 ? `scale(${p.scale})` : undefined} />
      ))}
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#eddcc2"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CompassMark() {
  return (
    <span className="flex items-center justify-center text-[#ecdcc6]">
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
        <polygon points="20,9 23.5,20 20,31 16.5,20" fill="currentColor" />
        <circle cx="20" cy="20" r="2.4" fill="#17111e" />
      </svg>
    </span>
  );
}

function SocialIcon({icon}: {icon: SocialLink['icon']}) {
  if (icon === 'instagram') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.5c-1.3.1-2.5-.2-3.6-.9v5.9c0 3.4-2.5 5.6-5.5 5.6-2.9 0-5.1-2.1-5.1-4.9 0-3 2.4-5 5.4-4.7v2.6c-.4-.1-.9-.2-1.3-.1-1.2.1-2 1-1.9 2.2.1 1.2 1 2 2.2 1.9 1.3-.1 2-1 2-2.4V3h3.9z" />
    </svg>
  );
}

export default SiteFooter;
