import {useState, useCallback} from 'react';

type IconName = 'check' | 'star' | 'heart';

interface Feature {
  icon: IconName;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {icon: 'check', title: 'Free Cancellation',    body: 'Cancel up to 48 h before — no questions asked'},
  {icon: 'star',  title: 'Book with 20% deposit', body: 'Pay the rest on the day of the excursion'},
  {icon: 'heart', title: 'No hidden fees',         body: 'Clear pricing, no surprise surcharges'},
];

export interface TrustBarProps {
  /** Poster image shown on the video card and as the modal backdrop. */
  poster: string;
  /** If set, the modal plays the video inline; otherwise shows the poster. */
  videoUrl?: string;
  /** Alt text for the poster image. */
  posterAlt?: string;
}

export function TrustBar({poster, videoUrl, posterAlt = 'Excursion preview'}: TrustBarProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <section
      aria-label="Book your desert adventure"
      id="book"
      className="relative overflow-hidden bg-sand py-section"
    >
      {/* Dark band — seam sits at the card's vertical midpoint */}
      <div aria-hidden="true" className="booking-cta-band absolute inset-x-0 top-0 bg-dark" />

      <div className="container relative z-10">

        {/* ── Video card ── */}
        <button
          type="button"
          aria-label="Play excursion video"
          onClick={() => setOpen(true)}
          className="group relative block w-full aspect-video cursor-pointer overflow-hidden
                     rounded-card bg-dark video-card-shadow"
        >
          <img
            src={poster}
            alt={posterAlt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          {/* subtle vignette */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/15"
          />
          {/* play button */}
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       flex h-23 w-23 items-center justify-center rounded-full
                       bg-white/20 backdrop-blur-sm transition-colors group-hover:bg-white/30"
          >
            <span className="play-btn-shadow flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <svg width="22" height="24" viewBox="0 0 22 24" fill="none" aria-hidden="true">
                <path
                  d="M3 2.6c0-1.2 1.3-1.95 2.34-1.34l13.2 8.9c.97.65.97 2.07 0 2.72l-13.2 8.9C4.3 23.4 3 22.6 3 21.4V2.6Z"
                  fill="#fff"
                />
              </svg>
            </span>
          </span>
        </button>

        {/* ── Trust features ── */}
        <ul
          role="list"
          className="mt-14 grid grid-cols-1 gap-10 text-center sm:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <li key={f.title} className="flex flex-col items-center px-3">
              <span className="mb-4.5 flex text-primary">
                <FeatureIcon name={f.icon} />
              </span>
              <h3 className="font-body font-bold text-h3 text-dark">
                {f.title}
              </h3>
              <p className="mt-2 font-body text-base text-dark/55 leading-relaxed max-w-76">
                {f.body}
              </p>
            </li>
          ))}
        </ul>

      </div>

      {open && <VideoModal poster={poster} videoUrl={videoUrl} onClose={close} />}
    </section>
  );
}

// ── Sub-components ──────────────────────────────────────────────

interface VideoModalProps {
  poster: string;
  videoUrl?: string;
  onClose: () => void;
}

function VideoModal({poster, videoUrl, onClose}: VideoModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Excursion video"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark/85 p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative aspect-video w-full max-w-content overflow-hidden rounded-card bg-dark shadow-card-hover"
      >
        {videoUrl ? (
          <video src={videoUrl} poster={poster} controls autoPlay className="h-full w-full" />
        ) : (
          <>
            <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-dark/35">
              <p className="font-body text-label text-sand/60 uppercase tracking-widest">Video preview</p>
            </div>
          </>
        )}
        <button
          type="button"
          aria-label="Close video"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 flex h-10 w-10 items-center justify-center
                     rounded-full bg-sand/15 text-sand text-xl leading-none
                     hover:bg-sand/25 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function FeatureIcon({name}: {name: IconName}) {
  const attrs = {width: 34, height: 34, 'aria-hidden': true} as const;
  if (name === 'check') {
    return (
      <svg {...attrs} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }
  if (name === 'star') {
    return (
      <svg {...attrs} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9l-5.8 3.07 1.1-6.47-4.7-4.58 6.5-.95L12 2.5z" />
      </svg>
    );
  }
  return (
    <svg {...attrs} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-7.5-4.9-10-9.6C.3 8.2 1.7 4.5 5.2 4.5c2 0 3.4 1.1 4.3 2.5h.9c.9-1.4 2.3-2.5 4.3-2.5 3.5 0 4.9 3.7 3.2 6.9C19.5 16.1 12 21 12 21z" />
    </svg>
  );
}

export default TrustBar;
