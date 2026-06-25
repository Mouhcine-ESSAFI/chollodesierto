const NAV_LINKS = [
  {href: '#book',    label: 'Book'},
  {href: '#routes',  label: 'Routes'},
  {href: '#reviews', label: 'Reviews'},
  {href: '#faq',     label: 'FAQ'},
  {href: '#',        label: 'About'},
  {href: '#',        label: 'Contact'},
];

const LEGAL_LINKS = [
  {href: '#', label: 'Terms'},
  {href: '#', label: 'Privacy'},
  {href: '#', label: 'Refund Policy'},
];

export function SiteFooter() {
  return (
    <footer role="contentinfo" className="bg-dark pt-16 pb-8">
      <div className="max-w-[76rem] mx-auto px-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-12">

          {/* Brand */}
          <div>
            <p className="font-display text-[1.25rem] text-sand mb-3">
              Budget<br />Desert<br />Tour
            </p>
            <p className="text-[0.8125rem] text-sand/35">
              Real Sahara. Fair price.<br />Stories you'll tell forever.
            </p>
          </div>

          {/* Nav + Social */}
          <div className="flex flex-col items-start md:items-end gap-5">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-5 list-none justify-start md:justify-end" role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.875rem] font-bold text-sand/45 hover:text-sand transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex gap-3" aria-label="Social media links">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-sand/15 flex items-center justify-center text-sand/40 text-[0.8125rem]
                           hover:border-sand/40 hover:text-sand transition-all"
                aria-label="Instagram"
              >
                ig
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-sand/15 flex items-center justify-center text-sand/40 text-[0.8125rem]
                           hover:border-sand/40 hover:text-sand transition-all"
                aria-label="Facebook"
              >
                fb
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-sand/8 pt-7 flex flex-wrap justify-between items-center gap-4">
          <small className="text-[0.8125rem] text-sand/25">
            © 2026 Budget Desert Tour ™. All rights reserved.
          </small>
          <nav aria-label="Legal links">
            <ul className="flex gap-5 list-none" role="list">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.8125rem] text-sand/25 hover:text-sand/60 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

      </div>
    </footer>
  );
}
