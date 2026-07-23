const VALUES = [
  {
    icon: '🧭',
    title: 'Small groups only',
    body: 'Never more than 8 travellers per departure — so every person gets real attention and the desert stays peaceful.',
  },
  {
    icon: '🌿',
    title: 'Locally rooted',
    body: 'Every guide, camp, and meal is sourced from Moroccan families. Your money stays in the communities you visit.',
  },
  {
    icon: '✦',
    title: 'Radically honest pricing',
    body: "One price, no hidden fees, no upsells at the campfire. You know exactly what you're paying for before you book.",
  },
];

export interface AboutStoryProps {
  eyebrow?: string;
  headline?: string;
  paragraphs?: string[];
  image?: string;
  imageAlt?: string;
  values?: typeof VALUES;
}

export function AboutStory({
  eyebrow = 'How it started',
  headline = 'Three friends, one camel, and a very bad tour.',
  paragraphs = [
    'In 2017, Youssef, Hamid, and Sara booked a "budget Sahara tour" — and hated every minute of it. Crowded buses, scripted campsites, guides who barely knew each other\'s names.',
    'So they built the tour they wish they had taken. Starting with a single route from Marrakech to Merzouga and a borrowed 4×4, they focused on one thing: genuinely showing people how magical Morocco\'s desert actually is.',
    'Today, Chollodesierto runs three routes, partners with five Berber camp families, and has welcomed over 2,000 travellers — most of whom come back.',
  ],
  image = 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1000&q=80',
  imageAlt = 'Berber camp at sunset in the Sahara',
  values = VALUES,
}: AboutStoryProps) {
  return (
    <section className="py-section bg-sand">
      <div className="container max-w-content">
        {/* Story row */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div>
            <p className="mb-3 font-body text-label uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </p>
            <h2 className="font-display text-h2 text-dark leading-tight max-w-sm">
              {headline}
            </h2>
            <div className="mt-6 space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-base text-dark/80 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-card shadow-card">
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="h-[26rem] w-full object-cover"
              />
            </div>
            {/* Decorative accent */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-card bg-primary/15"
            />
          </div>
        </div>

        {/* Values row */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-card bg-white p-7 shadow-card"
            >
              <span className="text-3xl">{v.icon}</span>
              <h3 className="mt-4 font-display text-h3 text-dark">{v.title}</h3>
              <p className="mt-2 text-base text-dark/70 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutStory;
