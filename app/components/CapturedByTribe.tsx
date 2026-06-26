import {useRef} from 'react';

interface TribePhoto {
  src: string;
  alt: string;
  /** Card height token — staggers the row for a hand-pinned feel. */
  height: string;
}

const PHOTOS: TribePhoto[] = [
  {src: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=600&q=80', alt: 'Kasbah village by the river', height: 'h-115'},
  {src: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=600&q=80', alt: 'Traveler on a quad bike in the dunes', height: 'h-140'},
  {src: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=600&q=80', alt: 'Tour group posing in the desert', height: 'h-115'},
  {src: 'https://images.unsplash.com/photo-1489493887464-892be6d1daae?auto=format&fit=crop&w=600&q=80', alt: 'Berber guide in a blue robe', height: 'h-140'},
  {src: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=600&q=80', alt: 'Rider on a camel crossing the Sahara', height: 'h-115'},
  {src: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=600&q=80', alt: 'Campfire glowing in the desert night', height: 'h-140'},
];

export interface CapturedByTribeProps {
  heading?: string;
  subheading?: string;
  /** Instagram handle shown in the footer (without the @). */
  handle?: string;
  photos?: TribePhoto[];
}

export function CapturedByTribe({
  heading = 'Captured by the tribe',
  subheading = 'Real travelers. Real moments.',
  handle = 'BudgetDesertTour',
  photos = PHOTOS,
}: CapturedByTribeProps) {
  const scroller = useRef<HTMLUListElement>(null);

  const scrollByCards = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-tribe-card]');
    const step = card ? card.getBoundingClientRect().width + 26 : el.clientWidth * 0.8;
    el.scrollBy({left: dir * step * 2, behavior: 'smooth'});
  };

  return (
    <section
      aria-label="Captured by the tribe"
      className="overflow-hidden bg-gradient-to-b from-white via-white to-sand py-section"
    >
      {/* Header */}
      <div className="container max-w-content text-center">
        <h2 className="text-h3 md:text-h2 font-display text-dark">{heading}</h2>
        <p className="mt-4 text-base text-dark">{subheading}</p>
      </div>

      {/* Nav */}
      <div className="mt-[clamp(36px,4vw,52px)] flex justify-center gap-4">
        <NavButton label="Previous photos" onClick={() => scrollByCards(-1)} dir="prev" />
        <NavButton label="Next photos" onClick={() => scrollByCards(1)} dir="next" />
      </div>

      {/* Carousel */}
      <ul
        ref={scroller}
        role="list"
        className="mt-[clamp(24px,3vw,36px)] flex snap-x snap-mandatory items-center gap-[26px]
                   overflow-x-auto px-[clamp(16px,6vw,96px)] py-7
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <li
            key={i}
            data-tribe-card
            className={`${photo.height} w-[clamp(230px,24vw,300px)] shrink-0 snap-center overflow-hidden
                        rounded-route-sm bg-sand shadow-card`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="block h-full w-full object-cover"
            />
          </li>
        ))}
      </ul>

      {/* Footer */}
      <p className="px-6 pt-[clamp(36px,4vw,56px)] text-center text-base text-dark">
        Tag <span className="font-semibold text-primary">@{handle}</span> to be featured.
      </p>
    </section>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function NavButton({
  label,
  onClick,
  dir,
}: {
  label: string;
  onClick: () => void;
  dir: 'prev' | 'next';
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-dark text-white
                 transition-colors hover:bg-primary"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={dir === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
      </svg>
    </button>
  );
}

export default CapturedByTribe;
