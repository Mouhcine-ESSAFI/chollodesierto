import {useCallback, useEffect, useRef, useState} from 'react';

interface TribePhoto {
  kind: 'photo';
  src: string;
  alt: string;
  height: string;
}

interface TribeVideo {
  kind: 'video';
  poster: string;
  videoSrc?: string;
  alt: string;
  height: string;
}

type TribeItem = TribePhoto | TribeVideo;

const MEDIA: TribeItem[] = [
  {kind: 'photo',  src: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=600&q=80', alt: 'Kasbah village by the river', height: 'h-100'},
  {kind: 'photo',  src: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=600&q=80', alt: 'Traveler on a quad bike in the dunes', height: 'h-125'},
  {kind: 'video',  poster: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=600&q=80', alt: 'Campfire glowing in the desert night', height: 'h-100'},
  {kind: 'photo',  src: 'https://images.unsplash.com/photo-1489493887464-892be6d1daae?auto=format&fit=crop&w=600&q=80', alt: 'Berber guide in a blue robe', height: 'h-125'},
  {kind: 'photo',  src: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=600&q=80', alt: 'Rider on a camel crossing the Sahara', height: 'h-100'},
  {kind: 'video',  poster: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=600&q=80', alt: 'Tour group posing in the desert', height: 'h-125'},
];

export interface CapturedByTribeProps {
  heading?: string;
  subheading?: string;
  /** Instagram handle shown in the footer (without the @). */
  handle?: string;
  media?: TribeItem[];
}

export function CapturedByTribe({
  heading = 'Captured by the tribe',
  subheading = 'Real travelers. Real moments.',
  handle = 'BudgetDesertTour',
  media = MEDIA,
}: CapturedByTribeProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);

  const [activeVideo, setActiveVideo] = useState<TribeVideo | null>(null);

  const openVideo = useCallback((item: TribeVideo) => {
    pausedRef.current = true;
    setActiveVideo(item);
  }, []);

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
    pausedRef.current = false;
  }, []);

  // Infinite-loop marquee via rAF — mutates style directly to avoid React re-renders
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const SPEED = 0.6;

    const tick = () => {
      if (!pausedRef.current) {
        const halfWidth = el.scrollWidth / 2;
        if (halfWidth > 0) {
          offsetRef.current -= SPEED;
          if (offsetRef.current <= -halfWidth) offsetRef.current += halfWidth;
          el.style.transform = `translateX(${offsetRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    const card = el.querySelector<HTMLElement>('[data-tribe-card]');
    const step = card ? card.getBoundingClientRect().width + 32 : 300;

    offsetRef.current -= dir * step * 2;
    if (offsetRef.current <= -halfWidth) offsetRef.current += halfWidth;
    if (offsetRef.current > 0) offsetRef.current -= halfWidth;
    el.style.transform = `translateX(${offsetRef.current}px)`;
  };

  // Duplicate the media array for a seamless loop
  const allItems = [...media, ...media];

  return (
    <section
      aria-label="Captured by the tribe"
      className="overflow-hidden bg-gradient-to-b from-white via-white to-sand py-section"
    >
      {/* Header */}
      <div className="container max-w-content text-center">
        <h2 className="text-h3 md:text-h2 font-display text-dark">{heading}</h2>
        <p className="mt-2 text-base text-dark">{subheading}</p>
      </div>

      {/* Nav */}
      <div className="mt-[clamp(36px,4vw,52px)] flex justify-center gap-4">
        <NavButton label="Previous photos" onClick={() => scrollByCards(-1)} dir="prev" />
        <NavButton label="Next photos" onClick={() => scrollByCards(1)} dir="next" />
      </div>

      {/* Carousel — overflow-hidden clips the moving track */}
      <div
        className="mt-6 overflow-hidden"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { if (!activeVideo) pausedRef.current = false; }}
      >
        <ul
          ref={trackRef}
          role="list"
          className="flex items-center gap-8 py-7 will-change-transform"
        >
          {allItems.map((item, i) =>
            item.kind === 'video' ? (
              <li
                key={i}
                data-tribe-card
                className={`${item.height} relative w-[clamp(260px,18vw,320px)] shrink-0 overflow-hidden rounded-route-sm bg-dark shadow-card`}
              >
                <img
                  src={item.poster}
                  alt={item.alt}
                  loading="lazy"
                  className="block h-full w-full object-cover"
                />
                {/* Cinematic vignette */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40"
                />
                {/* Play button — same style as TrustBar */}
                <button
                  type="button"
                  aria-label={`Play video: ${item.alt}`}
                  onClick={() => openVideo(item)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/35">
                    <span className="play-btn-shadow flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                      <svg width="14" height="16" viewBox="0 0 22 24" fill="none" aria-hidden="true">
                        <path
                          d="M3 2.6c0-1.2 1.3-1.95 2.34-1.34l13.2 8.9c.97.65.97 2.07 0 2.72l-13.2 8.9C4.3 23.4 3 22.6 3 21.4V2.6Z"
                          fill="#fff"
                        />
                      </svg>
                    </span>
                  </span>
                </button>
              </li>
            ) : (
              <li
                key={i}
                data-tribe-card
                className={`${item.height} w-[clamp(260px,18vw,320px)] shrink-0 overflow-hidden rounded-route-sm bg-sand shadow-card`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="block h-full w-full object-cover"
                />
              </li>
            )
          )}
        </ul>
      </div>

      {/* Footer */}
      <p className="px-6 pt-[clamp(36px,4vw,56px)] text-center text-base text-dark">
        Tag <span className="font-semibold text-primary">@{handle}</span> to be featured.
      </p>

      {/* Video modal */}
      {activeVideo && <VideoModal item={activeVideo} onClose={closeVideo} />}
    </section>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function VideoModal({item, onClose}: {item: TribeVideo; onClose: () => void}) {
  // ref callback keeps play() tied to the user gesture (Safari/iOS autoplay policy)
  const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
    el?.play().catch(() => {});
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark/85 p-6 sm:p-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative aspect-video w-full max-w-content overflow-hidden rounded-card bg-dark"
      >
        {item.videoSrc ? (
          <video
            ref={setVideoRef}
            src={item.videoSrc}
            poster={item.poster}
            controls
            playsInline
            className="h-full w-full"
          />
        ) : (
          <>
            <img src={item.poster} alt={item.alt} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-dark/40">
              <p className="font-body text-label uppercase tracking-widest text-sand/60">Video coming soon</p>
            </div>
          </>
        )}
        <button
          type="button"
          aria-label="Close video"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 flex h-10 w-10 items-center justify-center rounded-full bg-sand/15 text-xl text-sand transition-colors hover:bg-sand/25"
        >
          ×
        </button>
      </div>
    </div>
  );
}

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
      className="tribe-nav-btn flex h-9 w-9 items-center justify-center rounded-full bg-dark text-white
                 transition-all duration-200
                 hover:scale-110 hover:bg-primary hover:shadow-[0_0.25rem_1.25rem_rgba(196,90,44,0.5)]
                 active:scale-90"
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
        className={`tribe-arrow ${dir === 'next' ? 'tribe-arrow-next' : 'tribe-arrow-prev'}`}
      >
        <path d={dir === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
      </svg>
    </button>
  );
}

export default CapturedByTribe;
