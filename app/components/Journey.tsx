import {useCallback, useMemo, useState} from 'react';

interface RouteStop {
  label: string;
  active?: boolean;
}

interface DayReview {
  rating: number;
  quote: string;
  name: string;
  flag: string;
  country: string;
  date: string;
}

interface JourneyDay {
  number: number;
  title: string;
  route: RouteStop[];
  paragraphs: string[];
  highlights: string[];
  images: {src: string; alt: string}[];
  review: DayReview;
}

const DAYS: JourneyDay[] = [
  {
    number: 1,
    title: 'The Mountains Will Test You',
    route: [
      {label: 'Marrakech', active: true},
      {label: 'Atlas Mountains'},
      {label: 'Dades Valley'},
    ],
    paragraphs: [
      'We leave Marrakech early. The chaos of the medina fades behind us as we climb the High Atlas — switchback after switchback, Berber villages clinging to the rock, snow on the peaks until late spring.',
      'We stop in Ait Ben Haddou — the UNESCO kasbah where Gladiator, Game of Thrones, and a hundred other films were shot. We eat with a view. We pass through Ouarzazate, Morocco’s “Hollywood of Africa.”',
      'By evening, we’re deep in the Dades Valley — red cliffs, palm groves, your first real Moroccan dinner. You’ll sleep well. You’ll need it.',
    ],
    highlights: [
      'High Atlas crossing (Tizi n’Tichka pass)',
      'Ait Ben Haddou (UNESCO World Heritage)',
      'Ouarzazate film studios',
      'Overnight in Dades Valley',
    ],
    images: [
      {src: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80', alt: 'Ait Ben Haddou kasbah at golden hour'},
      {src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'High Atlas switchbacks at the Tizi n’Tichka pass'},
      {src: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80', alt: 'Red cliffs of the Dades Valley'},
    ],
    review: {
      rating: 4.5,
      quote: '“Ait Ben Haddou felt like walking into Game of Thrones. Then we realized — they actually filmed it there.”',
      name: 'Emma',
      flag: '\u{1F1EC}\u{1F1E7}',
      country: 'United Kingdom',
      date: 'May 2026',
    },
  },
  {
    number: 2,
    title: 'Into the Great Sahara',
    route: [
      {label: 'Dades Valley', active: true},
      {label: 'Todra Gorge'},
      {label: 'Merzouga'},
    ],
    paragraphs: [
      'Morning light fills the Dades, then the road coils into Todra Gorge — 300-metre rust-red walls closing in until the sky is just a ribbon overhead.',
      'At the edge of Erg Chebbi we trade the van for camels. An hour into the dunes the last rooftop vanishes — there is only sand, wind, and the slow sway of the caravan.',
      'Camp is a ring of black Berber tents in a hollow between dunes. Tagine under the stars, drums after dark, and a 2am silence you will never forget.',
    ],
    highlights: [
      'Todra Gorge canyon walk',
      'Camel trek into Erg Chebbi',
      'Night in a Saharan desert camp',
      'Sunrise over the dunes',
    ],
    images: [
      {src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80', alt: 'Rust-red walls of the Todra Gorge'},
      {src: 'https://images.unsplash.com/photo-1530939027401-cca9fd4a8c56?w=800&q=80', alt: 'Camel caravan crossing the Erg Chebbi dunes'},
      {src: 'https://images.unsplash.com/photo-1687789568716-6862f3e8b18a?w=800&q=80', alt: 'Berber desert camp under the stars'},
    ],
    review: {
      rating: 4.5,
      quote: '“We climbed a dune at dawn and just sat there. No one spoke. It’s the quietest place I’ve ever been.”',
      name: 'Lukas',
      flag: '\u{1F1E9}\u{1F1EA}',
      country: 'Germany',
      date: 'April 2026',
    },
  },
  {
    number: 3,
    title: 'Where the Past Still Lives',
    route: [
      {label: 'Merzouga', active: true},
      {label: 'Ifrane'},
      {label: 'Fes'},
    ],
    paragraphs: [
      'We leave the desert and climb into the Middle Atlas — cedar forests, Barbary macaques at the roadside, and Ifrane, a town that looks airlifted from the Alps.',
      'By afternoon we reach Fes. We step into the medina — 9,000 lanes, no cars, donkeys hauling everything — and twelve centuries close over our heads.',
      'We watch the tanneries from a rooftop, eat where the locals eat, and lose ourselves on purpose. Most travelers wish they’d booked another day here.',
    ],
    highlights: [
      'Cedar forests of the Middle Atlas',
      'Ifrane, the “Switzerland of Morocco”',
      'Fes el-Bali medina (UNESCO)',
      'The historic Chouara tanneries',
    ],
    images: [
      {src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80', alt: 'Cedar forest of the Middle Atlas'},
      {src: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&q=80', alt: 'Rooftop view over the medina of Fes'},
      {src: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80', alt: 'The Chouara tanneries of Fes'},
    ],
    review: {
      rating: 4.5,
      quote: '“Fes doesn’t perform for tourists. It just lets you in, and you spend the rest of the trip thinking about it.”',
      name: 'Sofia',
      flag: '\u{1F1EA}\u{1F1F8}',
      country: 'Spain',
      date: 'March 2026',
    },
  },
];

export interface JourneyProps {
  heading?: string;
  intro?: string;
  quote?: string;
  days?: JourneyDay[];
}

export function Journey({
  heading = 'The Journey',
  intro = 'Every traveler comes back saying the same thing:',
  quote = '“I didn’t expect the journey itself to matter so much.”',
  days = DAYS,
}: JourneyProps) {
  return (
    <section
      aria-label="The journey, day by day"
      className="relative bg-gradient-to-b from-white from-10% to-sand px-5 py-section sm:px-10"
    >
      {/* ── Header ── */}
      <header className="mx-auto max-w-content text-center">
        <h2 className="font-display text-h2 text-dark">
          {heading}
        </h2>
        <p className="mt-2 text-base text-dark">{intro}</p>
        <p className="text-h3 font-bold text-dark">
          {quote}
        </p>

        {/* "Here's why" bubble */}
        <div className="mt-2 flex justify-center lg:mt-0">
          <div className="flex items-end lg:absolute lg:left-1/2 lg:top-68 lg:z-[5] lg:-translate-x-[3.75rem]">
            <span
              role="img"
              aria-label="Cool face"
              className="z-10 text-[2.25rem] leading-none drop-shadow-[0_0.375rem_0.375rem_rgba(31,37,50,0.12)]"
            >
              {'\u{1F60E}'}
            </span>
            <div className="relative mb-5 ml-0.5 whitespace-nowrap rounded-[0.875rem] bg-dark px-3.5 py-2 text-label font-medium text-white shadow-[0_0.5rem_1.25rem_rgba(31,37,50,0.18)]">
              Here&rsquo;s why.
              <span
                aria-hidden="true"
                className="absolute -left-[0.3125rem] bottom-2 h-3.5 w-3.5 rotate-45 rounded-[0.1875rem] bg-dark"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Days ── */}
      <div className="mx-auto max-w-content">
        {days.map((day, i) => (
          <DayRow
            key={day.number}
            day={day}
            flip={i % 2 === 1}
            isFirst={i === 0}
            isLast={i === days.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function DayRow({day, flip, isFirst, isLast}: {day: JourneyDay; flip: boolean; isFirst: boolean; isLast: boolean}) {
  const [open, setOpen] = useState(isFirst);

  return (
    <div className="grid grid-cols-1 items-start gap-y-2 my-[clamp(3.5rem,8vw,6.875rem)] last:mb-0 lg:grid-cols-[1fr_4.75rem_1fr] lg:gap-x-[3.125rem]">

      {/* Content */}
      <div className={`relative pt-[1.875rem] max-lg:pt-0 lg:row-start-1 ${flip ? 'lg:col-start-3' : 'lg:col-start-1'}`}>

        {/* Mobile day toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open ? 'true' : 'false'}
          className="mb-6 flex w-full items-center gap-3.5 lg:hidden"
        >
          <span
            aria-hidden="true"
            className="flex h-[3.375rem] w-[3.375rem] flex-none flex-col items-center justify-center rounded-full bg-primary text-white shadow-[0_0_0_0.4375rem_rgba(193,90,43,0.12),0_0.5rem_1.125rem_rgba(193,90,43,0.3)]"
          >
            <span className="text-[0.5rem] font-semibold uppercase leading-none tracking-[0.12em] opacity-90">Day</span>
            <span className="text-[1.45rem] font-bold leading-[1.05]">{day.number}</span>
          </span>
          <span className="flex-1 text-left text-[0.8125rem] font-semibold text-dark/60">
            {open ? 'Tap to collapse' : 'Tap to read this day'}
          </span>
          <span
            aria-hidden="true"
            className={`flex flex-none text-primary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button>

        {/* Title + route — indented toward the spine on desktop */}
        <div className={`relative z-10 flex flex-col items-center text-left lg:text-center ${flip ? 'items-center text-center' : ''}`}>
          <h3 className="text-h3 font-bold tracking-tight text-dark">
            {day.title}
          </h3>

          <RouteTimeline stops={day.route} />

          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -top-22 z-0 text-[18.5rem] font-display leading-none text-dark/5 max-lg:hidden ${flip ? '' : ''}`}
          >
            {day.number}
          </span>
        </div>

        {/* Collapsible body */}
        <div className={open ? '' : 'max-lg:hidden'}>
          <div className="flex w-full flex-col gap-3">
            {day.paragraphs.map((p, i) => (
              <p key={i} className="text-base text-dark text-pretty">
                {p}
              </p>
            ))}
          </div>

          {/* What you'll see today */}
          <div className="mt-[1.875rem] flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
            <div className="flex w-full lg:w-32 flex-none items-start gap-2">
              <span role="img" aria-label="Cool face" className="text-[1.375rem] leading-[1.1]">
                {'\u{1F60E}'}
              </span>
              <span className="text-base font-display leading-[1.3] text-dark">What you&rsquo;ll see today</span>
            </div>
            <ul role="list" className="flex w-full flex-col items-start gap-3.5">
              {day.highlights.map((h) => (
                <li
                  key={h}
                  className="inline-flex items-center gap-[0.6875rem] rounded-full rounded-tl-none bg-white px-[1.375rem] py-[0.8125rem] text-sm text-dark shadow-[0_0.375rem_1.125rem_rgba(31,37,50,0.07)]"
                >
                  <CheckIcon />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Spine + DAY badge */}
      <div aria-hidden="true" className="relative hidden self-stretch lg:col-start-2 lg:row-start-1 lg:block">
        {/* Line from top down to circle center — connects from the previous day */}
        {!isFirst && (
          <div className="absolute left-1/2 top-0 h-44.5 border-l-2 border-dashed border-primary/45" />
        )}
        {!isLast && (
          <div className="journey-spine-line absolute left-1/2 top-44.5 border-l-2 border-dashed border-primary/45" />
        )}
        <div className="absolute left-1/2 top-[9.375rem] flex h-14 w-14 -translate-x-1/2 flex-col items-center justify-center rounded-full bg-primary text-white shadow-[0_0_0_0.5rem_rgba(193,90,43,0.12),0_0.5rem_1.125rem_rgba(193,90,43,0.3)]">
          <span className="text-[0.5rem] font-semibold uppercase leading-none tracking-[0.12em] opacity-90">Day</span>
          <span className="text-2xl font-bold leading-[1.05]">{day.number}</span>
        </div>
      </div>

      {/* Media */}
      <div className={`mx-auto mt-9 max-w-[35rem] pt-0 lg:row-start-1 lg:mx-0 lg:mt-0 lg:max-w-none lg:pt-4.5 ${flip ? 'lg:col-start-1' : 'lg:col-start-3'} ${open ? '' : 'max-lg:hidden'}`}>
        <ImageCarousel images={day.images} dayNumber={day.number} />

        <StarRating rating={day.review.rating} dayNumber={day.number} />

        <figure className="relative mx-auto mt-[1.125rem] max-w-[27.5rem] px-[1.875rem] text-center">
          <span aria-hidden="true" className="absolute -bottom-[1.625rem] left-0 font-display text-[5.625rem] leading-none text-dark/[0.08] max-lg:hidden">
            &ldquo;
          </span>
          <span aria-hidden="true" className="absolute -bottom-[1.625rem] right-0 font-display text-[5.625rem] leading-none text-dark/[0.08] max-lg:hidden">
            &rdquo;
          </span>
          <blockquote className="relative z-10 text-[1.0625rem] font-bold leading-normal text-dark text-balance">
            {day.review.quote}
          </blockquote>
          <figcaption className="relative z-10 mt-4 flex items-center justify-center gap-2 text-sm text-dark/70">
            <span>{day.review.name}</span>
            <span aria-hidden="true" className="text-dark/35">&middot;</span>
            <span role="img" aria-label={day.review.country} className="text-[1.05rem]">{day.review.flag}</span>
            <span aria-hidden="true" className="text-dark/35">&middot;</span>
            <span>{day.review.date}</span>
          </figcaption>
        </figure>
      </div>

    </div>
  );
}

function RouteTimeline({stops}: {stops: RouteStop[]}) {
  return (
    <div className="relative my-[1.625rem] mb-7 w-[20.625rem] max-w-full">
      <div aria-hidden="true" className="absolute top-1.5 left-[16.66%] right-[16.66%] border-t-2 border-dashed border-primary/55" />
      <div className="relative flex">
        {stops.map((s) => (
          <div key={s.label} className="flex flex-1 flex-col items-center">
            <span
              className={`h-3 w-3 rounded-full ${s.active ? 'bg-primary' : 'border-2 border-primary bg-white'}`}
            />
            <span className="mt-2.5 text-xs font-semibold text-primary">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImageCarousel({images, dayNumber}: {images: {src: string; alt: string}[]; dayNumber: number}) {
  const [i, setI] = useState(0);
  const n = images.length;
  const cur = images[((i % n) + n) % n];
  const next = images[(((i % n) + n) % n + 1) % n];
  const prev = useCallback(() => setI((v) => v - 1), []);
  const advance = useCallback(() => setI((v) => v + 1), []);

  return (
    <div className="relative">
      {/* Peeking card behind */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-0.875rem] h-[18.75rem] w-full origin-top -translate-x-1/2 scale-[0.94] overflow-hidden rounded-[1.25rem] bg-sand shadow-[0_0.875rem_1.875rem_rgba(31,37,50,0.16)]"
      >
        <img src={next.src} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      {/* Front card */}
      <div className="relative z-10 h-[18.75rem] overflow-hidden rounded-[1.25rem] bg-dark shadow-[0_1.375rem_2.75rem_rgba(31,37,50,0.24)]">
        <img src={cur.src} alt={cur.alt} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute bottom-[1.125rem] left-1/2 flex -translate-x-1/2 gap-3">
          <button
            type="button"
            aria-label="Previous photo"
            onClick={prev}
            className="flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full bg-white text-dark shadow-[0_0.25rem_0.75rem_rgba(0,0,0,0.22)] transition-transform hover:scale-105"
          >
            <ChevronIcon dir="left" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={advance}
            className="flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full bg-white text-dark shadow-[0_0.25rem_0.75rem_rgba(0,0,0,0.22)] transition-transform hover:scale-105"
          >
            <ChevronIcon dir="right" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StarRating({rating, dayNumber}: {rating: number; dayNumber: number}) {
  const stars = useMemo(() => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    return Array.from({length: 5}, (_, i) => (i < full ? 'full' : i === full && half ? 'half' : 'empty'));
  }, [rating]);

  return (
    <div
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="mt-6 flex justify-center gap-[0.1875rem] text-[#F5B72B]"
    >
      {stars.map((kind, i) => (
        <Star key={i} kind={kind} id={`journey-d${dayNumber}-star-${i}`} />
      ))}
    </div>
  );
}

const STAR_PATH =
  'M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9l-5.8 3.07 1.1-6.47-4.7-4.58 6.5-.95L12 2.5z';

function Star({kind, id}: {kind: string; id: string}) {
  if (kind === 'half') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.26" />
          </linearGradient>
        </defs>
        <path d={STAR_PATH} fill={`url(#${id})`} />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d={STAR_PATH} fill="currentColor" fillOpacity={kind === 'empty' ? 0.26 : 1} />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-none text-forest"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronIcon({dir}: {dir: 'left' | 'right'}) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === 'left' ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

export default Journey;
