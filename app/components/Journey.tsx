import {Fragment} from 'react';

const DAYS = [
  {
    number: 1,
    title: 'The Mountains Will Test You',
    stops: ['Marrakech', 'Atlas Mountains', 'Dades Valley'],
    body: [
      'We leave Marrakech early. The chaos of the medina fades behind us as we climb the High Atlas — switchback after switchback, Berber villages clinging to the rock, snow on the peaks until late spring.',
      'We stop in Ait Ben Haddou — the UNESCO kasbah where Gladiator and Game of Thrones were shot. By evening, we\'re deep in the Dades Valley — red cliffs, palm groves, your first real Moroccan dinner.',
    ],
    highlights: [
      'High Atlas crossing (Tizi n\'Tichka pass)',
      'Ait Ben Haddou (UNESCO World Heritage)',
      'Ouarzazate film studios',
      'Overnight in Dades Valley',
    ],
    highlightLabel: "What you'll see today",
    imageUrl: 'https://images.unsplash.com/photo-1565117079700-0a7e7f66d09c?w=800&q=80',
    imageAlt: 'Ait Ben Haddou UNESCO kasbah, a fortified village where Gladiator was filmed',
    review: {
      quote: '"Ait Ben Haddou felt like walking into Game of Thrones. Then we realized — they actually filmed it there."',
      author: 'Emma · May 2026',
    },
  },
  {
    number: 2,
    title: 'The Desert Will Welcome You',
    stops: ['Dades', 'Todra Gorge', 'Merzouga'],
    body: [
      'Morning light hits the cliffs as we head east. We stop at Todra Gorge — 300-meter walls so close you can touch both sides. By afternoon, the landscape gives up its trees. Then its bushes. Then everything.',
      'We arrive in Merzouga. Your camel is waiting. The dunes turn gold, then orange, then deep red. Dinner is tagine. After dinner, Hassan brings out the drum. The Milky Way shows itself like you\'ve never seen it.',
    ],
    highlights: [
      'The silence of the open desert',
      'Sand running through your fingers',
      'Drums vibrating in your chest',
      'A night sky so full of stars it feels fake',
    ],
    highlightLabel: "What you'll feel today",
    imageUrl: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=800&q=80',
    imageAlt: 'Camel caravan trekking into the Erg Chebbi dunes at sunset',
    review: {
      quote: '"I cried under those stars. I\'ll never forget Hassan playing the drum at midnight."',
      author: 'Sarah · October 2026',
    },
  },
  {
    number: 3,
    title: 'The Sunrise That Stays With You',
    stops: ['Merzouga Camp', 'Todra Gorge', 'Marrakech'],
    body: [
      'We wake you before dawn. You\'ll groan. You\'ll thank us later. You climb the highest dune behind camp, find your spot in the cold sand, and wait. The Sahara turns pink, then gold. No one talks. No one needs to.',
    ],
    highlights: [
      'A sunrise burned into your memory',
      'New friendships from across the world',
      'Photos that won\'t do it justice',
      'The quiet feeling that something shifted',
    ],
    highlightLabel: "What you'll take home",
    imageUrl: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80',
    imageAlt: 'Sahara sunrise over Erg Chebbi, golden light on the dunes',
    review: {
      quote: '"Came back changed. My friends keep asking what happened to me in Morocco."',
      author: 'Olivier · May 2026',
    },
  },
];

function RouteStops({stops, label}: {stops: string[]; label: string}) {
  return (
    <div
      className="flex items-center gap-1 mb-4 flex-wrap"
      aria-label={`Route: ${stops.join(' to ')}`}
    >
      {stops.map((stop, i) => (
        <Fragment key={stop}>
          <span className="text-[0.75rem] font-bold text-primary">
            {stop}
          </span>
          {i < stops.length - 1 && (
            <span
              aria-hidden="true"
              className="flex-1 min-w-5 border-t-2 border-dashed border-primary/30"
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}

export function Journey() {
  return (
    <section
      aria-labelledby="journey-heading"
      id="journey"
      className="bg-dark py-[7.5rem] relative overflow-hidden"
    >
      {/* Subtle bg texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=40)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-[76rem] mx-auto px-10 text-center">
        <h2
          id="journey-heading"
          className="font-body font-bold text-[2.375rem] text-sand mb-3"
        >
          The Journey
        </h2>
        <p className="text-[1.25rem] text-sand/60 italic mb-[5rem]">
          "I didn't expect the journey itself to matter so much."
        </p>

        <ol className="flex flex-col gap-20 text-left list-none" role="list">
          {DAYS.map((day, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <li
                key={day.number}
                className="grid grid-cols-1 lg:grid-cols-[1fr_4rem_1fr] gap-10 items-start"
              >
                {/* Text column */}
                <div className={isEven ? 'lg:order-3' : ''}>
                  <p className="font-bold text-[0.875rem] text-primary uppercase tracking-widest mb-2">
                    Day {day.number}
                  </p>
                  <RouteStops stops={day.stops} label={`Day ${day.number} route`} />
                  <h3 className="font-display text-[1.75rem] text-sand mb-4">{day.title}</h3>
                  {day.body.map((para, i) => (
                    <p key={i} className="text-[1rem] text-sand/65 mb-4 leading-relaxed">
                      {para}
                    </p>
                  ))}
                  {/* Highlights */}
                  <ul className="flex flex-col gap-2 list-none mt-6" role="list">
                    {day.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-center gap-2.5 text-[0.9375rem] text-sand/55"
                      >
                        <span className="text-forest font-bold shrink-0">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Day number badge */}
                <div className={`flex justify-center pt-2 ${isEven ? 'lg:order-2' : ''}`}>
                  <div
                    aria-label={`Day ${day.number}`}
                    className="w-16 h-16 rounded-full border-2 border-primary flex flex-col items-center justify-center shrink-0"
                  >
                    <span className="text-[0.5625rem] font-bold uppercase tracking-widest text-sand/50">
                      Day
                    </span>
                    <span className="font-display text-[1.75rem] text-sand leading-none">
                      {day.number}
                    </span>
                  </div>
                </div>

                {/* Photo + review column */}
                <div className={isEven ? 'lg:order-1' : ''}>
                  <figure>
                    <img
                      src={day.imageUrl}
                      alt={day.imageAlt}
                      className="w-full h-72 object-cover rounded-[1.5rem] block shadow-[0_0.5rem_2.5rem_rgba(0,0,0,0.4)]"
                      loading="lazy"
                      width="553"
                      height="370"
                    />
                    <figcaption className="bg-sand/6 border border-sand/8 rounded-2xl p-5 mt-4">
                      <p aria-hidden="true" className="text-primary text-sm mb-2">
                        ★★★★★
                      </p>
                      <blockquote className="font-bold text-[1rem] text-sand/80 italic leading-relaxed mb-2">
                        {day.review.quote}
                      </blockquote>
                      <cite className="text-[0.75rem] text-sand/40 not-italic font-normal">
                        {day.review.author}
                      </cite>
                    </figcaption>
                  </figure>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-16">
          <a
            href="#book"
            className="font-display text-[1.125rem] bg-primary text-sand px-10 py-4 rounded-full
                       hover:opacity-90 transition-opacity inline-block"
          >
            Start your Journey Today 😉
          </a>
        </div>
      </div>
    </section>
  );
}
