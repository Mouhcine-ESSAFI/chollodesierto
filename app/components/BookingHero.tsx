import {useMemo, useState} from 'react';

// ── Types ──────────────────────────────────────────────────────

interface RouteOption {
  id: string;
  stops: [string, string, string];
  price: number;
}

interface CampOption {
  id: string;
  name: string;
  priceLabel: string;
  priceValue: string;
  delta: number;
  image: string;
  imageAlt: string;
}

// ── Data ───────────────────────────────────────────────────────

const ROUTES: RouteOption[] = [
  {id: 'classic', stops: ['Marrakech', 'Merzouga', 'Marrakech'], price: 85},
  {id: 'grand', stops: ['Marrakech', 'Merzouga', 'Fez'], price: 115},
  {id: 'reverse', stops: ['Fez', 'Merzouga', 'Marrakech'], price: 155},
];

const CAMPS: CampOption[] = [
  {
    id: 'shared',
    name: 'Shared Camp',
    priceLabel: 'In price',
    priceValue: 'Included',
    delta: 0,
    image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=500&q=80',
    imageAlt: 'Shared Berber tent camp',
  },
  {
    id: 'comfort',
    name: 'Comfort Camp',
    priceLabel: 'Per person',
    priceValue: '+€15',
    delta: 15,
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=500&q=80',
    imageAlt: 'Comfort private tent camp',
  },
  {
    id: 'superior',
    name: 'Superior Camp',
    priceLabel: 'Per person',
    priceValue: '+€45',
    delta: 45,
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=500&q=80',
    imageAlt: 'Superior luxury suite tent',
  },
];

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

type TransferType = 'oneway' | 'return';

interface DayCell {
  day: number | '';
  blank: boolean;
  date: Date | null;
  isStart: boolean;
  isEnd: boolean;
  inRange: boolean;
}

// ── Helpers ────────────────────────────────────────────────────

function sameDay(a: Date | null, b: Date | null) {
  return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function addDays(d: Date, n: number) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

function buildMonthCells(year: number, monthIndex: number, departDate: Date, returnDate: Date): DayCell[] {
  const first = new Date(year, monthIndex, 1);
  const startWeekday = (first.getDay() + 6) % 7; // 0 = Monday
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: DayCell[] = [];
  for (let i = 0; i < startWeekday; i++) {
    cells.push({day: '', blank: true, date: null, isStart: false, isEnd: false, inRange: false});
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, monthIndex, d);
    const isStart = sameDay(date, departDate);
    const isEnd = sameDay(date, returnDate);
    const inRange = date > departDate && date < returnDate;
    cells.push({day: d, blank: false, date, isStart, isEnd, inRange});
  }
  return cells;
}

// ── Component ──────────────────────────────────────────────────

export interface BookingHeroProps {
  heroImage?: string;
  heroImageAlt?: string;
  routes?: RouteOption[];
  camps?: CampOption[];
  whatsappHref?: string;
}

export function BookingHero({
  heroImage = 'https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1800&q=80',
  heroImageAlt = 'Golden Sahara sand dunes at sunset',
  routes = ROUTES,
  camps = CAMPS,
  whatsappHref = '#whatsapp',
}: BookingHeroProps) {
  const [routeId, setRouteId] = useState(routes[0].id);
  const [campId, setCampId] = useState(camps[1]?.id ?? camps[0].id);
  const [monthOffset, setMonthOffset] = useState(0);
  const [departDate, setDepartDate] = useState(new Date(2026, 5, 19));
  const [returnDate, setReturnDate] = useState(new Date(2026, 5, 26));
  const [travelers, setTravelers] = useState(2);
  const [quadIndividual, setQuadIndividual] = useState(0);
  const [quadDouble, setQuadDouble] = useState(1);
  const [transferEnabled, setTransferEnabled] = useState(true);
  const [transferType, setTransferType] = useState<TransferType>('oneway');

  const monthBaseYear = 2026;
  const monthBaseIndex = 5; // June

  const selectedRoute = routes.find((r) => r.id === routeId) ?? routes[0];
  const selectedCamp = camps.find((c) => c.id === campId) ?? camps[0];

  const months = useMemo(() => {
    return [0, 1].map((offsetFromBase) => {
      const total = monthBaseIndex + monthOffset + offsetFromBase;
      const year = monthBaseYear + Math.floor(total / 12);
      const monthIndex = ((total % 12) + 12) % 12;
      return {
        label: `${MONTH_NAMES[monthIndex]} ${year}`,
        cells: buildMonthCells(year, monthIndex, departDate, returnDate),
      };
    });
  }, [monthOffset, departDate, returnDate]);

  const transferPrice = transferType === 'oneway' ? 25 : 45;
  const transferTypeLabel = transferType === 'oneway' ? 'One way' : 'Return';

  const total =
    selectedRoute.price * travelers +
    selectedCamp.delta * travelers +
    quadIndividual * 45 +
    quadDouble * 65 +
    (transferEnabled ? transferPrice : 0);

  const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][departDate.getDay()];
  const mon = MONTH_NAMES[departDate.getMonth()].slice(0, 3);
  const whenLeaveText = `${dow}, ${mon} ${departDate.getDate()}`;

  const pickDate = (date: Date) => {
    setDepartDate(date);
    setReturnDate(addDays(date, 7));
  };

  return (
    <>
      {/* ── Hero ── */}
      <section
        aria-label="Book your adventure"
        className="relative flex min-h-[460px] items-center justify-center overflow-hidden"
      >
        <img
          src={heroImage}
          alt={heroImageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/[0.18] to-sand"
        />
        <div className="relative z-10 max-w-[720px] px-6 text-center">
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-bold text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.25)]">
            Book your adventure.
          </h1>
          <p className="mt-[18px] text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.2)]">
            Five quick choices, and you&rsquo;re going.
            <br />
            We&rsquo;ll handle the rest.
          </p>
          <div className="mt-[22px] flex animate-bounce justify-center" aria-hidden="true">
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
              <path d="M2 2l9 9 9-9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section aria-label="Booking form" className="bg-sand px-5 py-[clamp(40px,6vw,72px)]">
        <div className="container max-w-[1280px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-16">

            {/* ── Steps column ── */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute bottom-[90px] left-[19px] top-5 border-l-2 border-dashed border-primary/40"
              />

              {/* Step 1 — Route */}
              <Step number={1} title="Choose your route." description="Where do you start, where do you end?">
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  {routes.map((r) => {
                    const selected = r.id === routeId;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRouteId(r.id)}
                        aria-pressed={selected}
                        className={`flex items-start justify-between gap-3 rounded-[20px] p-5 text-left transition-colors ${
                          selected ? 'bg-primary' : 'border border-primary/25 bg-white'
                        }`}
                      >
                        <div>
                          <p className={`mb-1.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] ${selected ? 'text-white/80' : 'text-primary'}`}>
                            Per Person
                          </p>
                          <p className={`text-[1.6rem] font-bold ${selected ? 'text-white' : 'text-dark'}`}>€{r.price}</p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {r.stops.map((name, i) => (
                            <div key={name + i} className="flex items-center gap-2">
                              <span
                                className={`inline-block h-[9px] w-[9px] rounded-full ${
                                  i === 1
                                    ? `border-2 ${selected ? 'border-white bg-primary' : 'border-primary bg-white'}`
                                    : selected ? 'bg-white' : 'bg-primary'
                                }`}
                              />
                              <span className={`text-[0.8rem] font-semibold ${selected ? 'text-white' : 'text-primary'}`}>{name}</span>
                            </div>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Step>

              {/* Step 2 — Camp */}
              <Step number={2} title="Choose your camp." description="Same stars. Same fire. Different pillow.">
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  {camps.map((c) => {
                    const selected = c.id === campId;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCampId(c.id)}
                        aria-pressed={selected}
                        className={`flex items-center justify-between gap-3.5 rounded-[20px] p-4 text-left transition-colors ${
                          selected ? 'bg-primary' : 'border border-primary/25 bg-white'
                        }`}
                      >
                        <div className="flex-1">
                          <p className={`mb-1 text-[0.62rem] font-bold uppercase tracking-[0.06em] ${selected ? 'text-white/75' : 'text-dark/45'}`}>
                            {c.priceLabel}
                          </p>
                          <p className={`text-[1.05rem] font-bold ${selected ? 'text-white' : 'text-forest'}`}>{c.priceValue}</p>
                        </div>
                        <div className={`self-stretch border-l border-dashed ${selected ? 'border-white/40' : 'border-dark/20'}`} />
                        <p className={`flex-1 text-right text-[0.85rem] font-bold ${selected ? 'text-white' : 'text-dark'}`}>{c.name}</p>
                      </button>
                    );
                  })}
                </div>
              </Step>

              {/* Step 3 — Date */}
              <Step number={3} title="Pick your date." description="When do you want to leave?">
                <div className="rounded-[22px] bg-white p-[clamp(18px,2.4vw,28px)] shadow-card-hover">
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    {months.map((m, i) => (
                      <div key={m.label}>
                        <div className="mb-3.5 flex items-center justify-between">
                          <button
                            type="button"
                            aria-label="Previous month"
                            onClick={() => setMonthOffset((o) => o - 1)}
                            className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-dark/15 bg-white text-dark"
                          >
                            &lsaquo;
                          </button>
                          <p className="text-base font-bold text-dark">{m.label}</p>
                          <button
                            type="button"
                            aria-label="Next month"
                            onClick={() => setMonthOffset((o) => o + 1)}
                            className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-dark/15 bg-white text-dark"
                          >
                            &rsaquo;
                          </button>
                        </div>
                        <div className="mb-1.5 grid grid-cols-7 gap-0.5">
                          {WEEKDAYS.map((wd) => (
                            <span key={wd} className="py-1 text-center text-[0.7rem] font-semibold text-dark/40">
                              {wd}
                            </span>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-0.5">
                          {m.cells.map((cell, ci) => (
                            <button
                              key={ci}
                              type="button"
                              disabled={cell.blank}
                              onClick={() => cell.date && pickDate(cell.date)}
                              className={`aspect-square rounded-full text-[0.85rem] font-medium ${
                                cell.blank
                                  ? 'invisible'
                                  : cell.isStart || cell.isEnd
                                  ? 'bg-primary font-bold text-white'
                                  : cell.inRange
                                  ? 'bg-primary/[0.18] font-semibold text-primary'
                                  : 'bg-transparent text-dark/80'
                              }`}
                            >
                              {cell.day}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Step>

              {/* Step 4 — Travelers */}
              <Step number={4} title="How many travelers?" description="Solo? Couple? Whole crew? Up to 17.">
                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    aria-label="Decrease travelers"
                    onClick={() => setTravelers((t) => Math.max(1, t - 1))}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-white text-[1.3rem] font-bold text-primary"
                  >
                    &minus;
                  </button>
                  <span className="min-w-8 text-center font-display text-[1.6rem] font-bold text-dark">{travelers}</span>
                  <button
                    type="button"
                    aria-label="Increase travelers"
                    onClick={() => setTravelers((t) => Math.min(17, t + 1))}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-[1.3rem] font-bold text-white"
                  >
                    +
                  </button>
                </div>
              </Step>

              {/* Step 5 — Extras */}
              <Step
                number={5}
                title="Make your adventure more fun."
                description="Optional activities to make your journey more enjoyable."
                last
              >
                <p className="mb-3 text-base font-semibold text-dark">How many individual quad do you need?</p>
                <div className="mb-6 flex flex-wrap items-center gap-5">
                  <TicketCard
                    eyebrow="Per quad"
                    price="+€45"
                    label="Individual Quad"
                    image="https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=300&q=80"
                    imageAlt="Individual quad bike in the dunes"
                  />
                  <Stepper value={quadIndividual} onDec={() => setQuadIndividual((n) => Math.max(0, n - 1))} onInc={() => setQuadIndividual((n) => Math.min(10, n + 1))} decLabel="Decrease individual quads" incLabel="Increase individual quads" />
                </div>

                <p className="mb-3 text-base font-semibold text-dark">How many double quad do you need?</p>
                <div className="mb-9 flex flex-wrap items-center gap-5">
                  <TicketCard
                    eyebrow="Per quad"
                    price="+€65"
                    label="Double Quad"
                    image="https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=300&q=80"
                    imageAlt="Two travelers on a double quad bike"
                  />
                  <Stepper value={quadDouble} onDec={() => setQuadDouble((n) => Math.max(0, n - 1))} onInc={() => setQuadDouble((n) => Math.min(10, n + 1))} decLabel="Decrease double quads" incLabel="Increase double quads" />
                </div>

                <h3 className="mb-[18px] font-display text-[1.3rem] font-bold text-dark">We care about your comfort!</h3>

                <div className="mb-[18px] flex flex-wrap items-center justify-between gap-3">
                  <p className="text-base font-semibold text-dark">Would you like airport transfer?</p>
                  <SegmentedControl
                    options={[
                      {value: 'no', label: 'No'},
                      {value: 'yes', label: 'Yes'},
                    ]}
                    value={transferEnabled ? 'yes' : 'no'}
                    onChange={(v) => setTransferEnabled(v === 'yes')}
                  />
                </div>

                {transferEnabled && (
                  <div className="flex flex-wrap items-center gap-5">
                    <div className="flex h-16 w-[230px] items-stretch overflow-hidden rounded-2xl border border-dark/10 bg-white shadow-card-hover">
                      <div className="flex flex-1 flex-col justify-center px-3.5">
                        <p className="mb-0.5 text-[0.55rem] font-bold uppercase tracking-[0.06em] text-dark/45">Total transfer</p>
                        <p className="text-[0.95rem] font-bold text-forest">+€{transferPrice}</p>
                      </div>
                      <div className="shrink-0 self-stretch border-l border-dashed border-dark/20" />
                      <div className="flex w-[74px] shrink-0 flex-col justify-center gap-px px-2">
                        <span className="text-[0.62rem] font-bold leading-tight text-dark">{travelers} Travelers</span>
                        <span className="text-[0.62rem] font-bold leading-tight text-dark">1 Vehicle</span>
                        <span className="text-[0.62rem] font-bold leading-tight text-dark">{transferTypeLabel}</span>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=300&q=80"
                        alt="Private airport transfer vehicle"
                        loading="lazy"
                        className="w-[60px] shrink-0 object-cover"
                      />
                    </div>
                    <SegmentedControl
                      options={[
                        {value: 'oneway', label: 'One way'},
                        {value: 'return', label: 'Return'},
                      ]}
                      value={transferType}
                      onChange={(v) => setTransferType(v as TransferType)}
                    />
                  </div>
                )}
              </Step>
            </div>

            {/* ── Trip Summary ── */}
            <aside aria-label="Your trip summary" className="lg:sticky lg:top-6">
              <div className="rounded-[26px] bg-white p-[clamp(24px,2.6vw,32px)] shadow-card-hover">
                <h2 className="mb-[22px] font-display text-[1.7rem] font-bold text-dark">Your Trip Summary</h2>

                {/* Route */}
                <div className="mb-2.5 flex items-baseline justify-between">
                  <p className="text-[1.05rem] font-bold text-dark">The Route</p>
                  <p className="text-[1.05rem] font-bold text-forest">{travelers} x €{selectedRoute.price}</p>
                </div>
                <div className="relative mb-6">
                  <div className="absolute left-[14%] right-[14%] top-[5px] border-t-2 border-dashed border-primary" />
                  <div className="relative flex justify-between">
                    {selectedRoute.stops.map((name, i) => (
                      <div key={name + i} className="flex w-1/3 flex-col items-center gap-1.5">
                        <span
                          className={`inline-block h-[11px] w-[11px] rounded-full ${
                            i === 1 ? 'border-2 border-primary bg-white' : 'bg-primary'
                          }`}
                        />
                        <span className="text-[0.75rem] font-semibold text-primary">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sleep */}
                <div className="mb-2.5 flex items-baseline justify-between">
                  <p className="text-[1.05rem] font-bold text-dark">Where You&rsquo;ll Sleep</p>
                  <p className="text-[1.05rem] font-bold text-forest">
                    {selectedCamp.delta === 0 ? 'Included' : `${travelers} x €${selectedCamp.delta}`}
                  </p>
                </div>
                <SummaryTicket
                  image={selectedCamp.image}
                  imageAlt={selectedCamp.imageAlt}
                  eyebrow={selectedCamp.delta === 0 ? 'In price' : 'Per person'}
                  price={selectedCamp.priceValue}
                  label={selectedCamp.name}
                />

                {/* Double quad */}
                {quadDouble > 0 && (
                  <>
                    <div className="mb-2.5 flex items-baseline justify-between">
                      <p className="text-[1.05rem] font-bold text-dark">Double Quad</p>
                      <p className="text-[1.05rem] font-bold text-forest">{quadDouble} x €65</p>
                    </div>
                    <SummaryTicket
                      image="https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=500&q=80"
                      imageAlt="Double quad bike"
                      eyebrow="Per quad"
                      price="+€65"
                      label="Double Quad"
                    />
                  </>
                )}

                {/* Individual quad */}
                {quadIndividual > 0 && (
                  <>
                    <div className="mb-2.5 flex items-baseline justify-between">
                      <p className="text-[1.05rem] font-bold text-dark">Individual Quad</p>
                      <p className="text-[1.05rem] font-bold text-forest">{quadIndividual} x €45</p>
                    </div>
                    <SummaryTicket
                      image="https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=500&q=80"
                      imageAlt="Individual quad bike"
                      eyebrow="Per quad"
                      price="+€45"
                      label="Individual Quad"
                    />
                  </>
                )}

                {/* Airport transfer */}
                {transferEnabled && (
                  <>
                    <div className="mb-2.5 flex items-baseline justify-between">
                      <p className="text-[1.05rem] font-bold text-dark">Airport transfer</p>
                      <p className="text-[1.05rem] font-bold text-forest">1 x €{transferPrice}</p>
                    </div>
                    <div className="mb-6 flex h-16 items-stretch overflow-hidden rounded-2xl border border-dark/10 shadow-card-hover">
                      <img
                        src="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=200&q=80"
                        alt="Airport transfer vehicle"
                        loading="lazy"
                        className="w-16 shrink-0 object-cover"
                      />
                      <div className="shrink-0 self-stretch border-l border-dashed border-dark/20" />
                      <div className="flex flex-col justify-center gap-px px-3.5">
                        <span className="text-[0.7rem] font-semibold leading-snug text-dark">{travelers} Travelers</span>
                        <span className="text-[0.7rem] font-semibold leading-snug text-dark">1 Vehicle &middot; {transferTypeLabel}</span>
                      </div>
                    </div>
                  </>
                )}

                {/* When you'll leave */}
                <div className="flex items-center justify-between border-t border-dark/[0.08] py-3.5">
                  <p className="text-[0.95rem] font-semibold text-dark">When You&rsquo;ll Leave</p>
                  <p className="flex items-center gap-1.5 text-[0.95rem] font-bold text-dark">
                    {whenLeaveText} <span role="img" aria-label="Calendar">&#128197;</span>
                  </p>
                </div>

                {/* Travelers */}
                <div className="mb-5 flex items-center justify-between border-t border-dark/[0.08] py-3.5">
                  <p className="text-[0.95rem] font-semibold text-dark">Nbr of Travelers</p>
                  <p className="flex items-center gap-1.5 text-[0.95rem] font-bold text-dark">
                    {travelers} traveler{travelers === 1 ? '' : 's'} <span role="img" aria-label="Travelers">&#128694;</span>
                  </p>
                </div>

                {/* Reserve */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-full bg-primary py-[15px] pl-[22px] pr-2.5 font-display text-[1.05rem] font-bold text-white shadow-[0_16px_34px_-16px_rgba(193,90,43,0.7)]"
                >
                  <span>
                    Reserve your spot <span aria-hidden="true">&rarr;</span>
                  </span>
                  <span className="flex flex-col items-end rounded-full bg-white/[0.14] px-4 py-1.5">
                    <span className="text-[0.55rem] font-bold uppercase tracking-[0.06em] opacity-85">Total price</span>
                    <span className="text-[1.05rem] font-bold">€{total}</span>
                  </span>
                </button>

                <ul role="list" className="mt-[18px] flex flex-col gap-2.5">
                  <li className="flex items-center gap-2.5 text-[0.85rem] text-dark">
                    <CheckIcon className="text-primary" />
                    Free cancellation up to 48h before
                  </li>
                  <li className="flex items-center gap-2.5 text-[0.85rem] text-dark">
                    <StarIcon className="text-primary" />
                    Book your spot with 20%
                  </li>
                  <li className="flex items-center gap-2.5 text-[0.85rem] text-dark">
                    <HeartIcon className="text-primary" />
                    Clear pricing, no surprise surcharges
                  </li>
                </ul>
              </div>

              {/* WhatsApp card */}
              <div className="mt-4 rounded-[22px] bg-dark px-6 py-[26px] text-center">
                <p className="mb-3.5 text-[0.95rem] font-bold text-white">
                  <span role="img" aria-label="Thinking">&#129300;</span> Questions before you book?
                </p>
                <a
                  href={whatsappHref}
                  aria-label="Chat with us on WhatsApp"
                  className="flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-5 py-[13px] text-[0.95rem] font-bold text-white"
                >
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </a>
                <p className="mt-3 text-[0.78rem] text-white/65">
                  WhatsApp us
                  <br />
                  We usually answer within an hour.
                </p>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function Step({
  number,
  title,
  description,
  last,
  children,
}: {
  number: number;
  title: string;
  description: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative grid grid-cols-[40px_1fr] gap-x-5 ${last ? '' : 'pb-12'}`}>
      <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-[1.1rem] font-bold text-white shadow-[0_6px_16px_-6px_rgba(193,90,43,0.6)]">
        {number}
      </div>
      <div>
        <h2 className="mb-1.5 font-display text-[clamp(1.4rem,2.4vw,1.75rem)] font-bold text-dark">{title}</h2>
        <p className="mb-5 text-[0.95rem] text-dark/60">{description}</p>
        {children}
      </div>
    </div>
  );
}

function TicketCard({
  eyebrow,
  price,
  label,
  image,
  imageAlt,
}: {
  eyebrow: string;
  price: string;
  label: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <div className="flex h-16 w-[260px] items-stretch overflow-hidden rounded-2xl border border-dark/10 bg-white shadow-card-hover">
      <div className="flex flex-1 flex-col justify-center px-3.5">
        <p className="mb-0.5 text-[0.6rem] font-bold uppercase tracking-[0.06em] text-dark/45">{eyebrow}</p>
        <p className="text-[0.95rem] font-bold text-forest">{price}</p>
      </div>
      <div className="shrink-0 self-stretch border-l border-dashed border-dark/20" />
      <p className="flex w-[54px] shrink-0 items-center px-2 text-[0.72rem] font-bold leading-tight text-dark">{label}</p>
      <img src={image} alt={imageAlt} loading="lazy" className="w-[104px] shrink-0 object-cover" />
    </div>
  );
}

function SummaryTicket({
  image,
  imageAlt,
  eyebrow,
  price,
  label,
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  price: string;
  label: string;
}) {
  return (
    <div className="mb-6 flex h-16 items-stretch overflow-hidden rounded-2xl border border-dark/[0.08] shadow-card-hover">
      <img src={image} alt={imageAlt} loading="lazy" className="w-16 shrink-0 object-cover" />
      <div className="shrink-0 self-stretch border-l border-dashed border-dark/20" />
      <div className="flex shrink-0 flex-col justify-center whitespace-nowrap px-3.5">
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.06em] text-dark/45">{eyebrow}</span>
        <span className="text-base font-bold text-forest">{price}</span>
      </div>
      <div className="shrink-0 self-stretch border-l border-dashed border-dark/20" />
      <div className="flex items-center px-3.5">
        <span className="text-[0.85rem] font-bold text-dark">{label}</span>
      </div>
    </div>
  );
}

function Stepper({
  value,
  onDec,
  onInc,
  decLabel,
  incLabel,
}: {
  value: number;
  onDec: () => void;
  onInc: () => void;
  decLabel: string;
  incLabel: string;
}) {
  return (
    <div className="flex items-center gap-5">
      <button
        type="button"
        aria-label={decLabel}
        onClick={onDec}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-[1.15rem] font-bold text-primary"
      >
        &minus;
      </button>
      <span className="min-w-5 text-center font-display text-[1.3rem] font-bold text-dark">{value}</span>
      <button
        type="button"
        aria-label={incLabel}
        onClick={onInc}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-[1.15rem] font-bold text-primary"
      >
        +
      </button>
    </div>
  );
}

function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: {value: string; label: string}[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-flex rounded-full bg-primary/10 p-[3px]">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-full px-[18px] py-2 text-[0.85rem] font-bold ${
              active ? 'bg-primary text-white' : 'text-dark'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function CheckIcon({className = ''}: {className?: string}) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function StarIcon({className = ''}: {className?: string}) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" aria-hidden="true" className={className}>
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

function HeartIcon({className = ''}: {className?: string}) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" aria-hidden="true" className={className}>
      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.004a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42-.14 0-.31-.02-.47-.02s-.43.06-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  );
}

export default BookingHero;
