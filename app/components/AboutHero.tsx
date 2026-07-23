export interface AboutHeroProps {
  headline?: string;
  subtext?: string;
  image?: string;
  imageAlt?: string;
}

export function AboutHero({
  headline = 'Born in the desert.\nBuilt for wanderers.',
  subtext = 'We are a small team of guides and storytellers from Morocco, sharing the Sahara one journey at a time.',
  image = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=80',
  imageAlt = 'Moroccan desert guide leading travellers across dunes',
}: AboutHeroProps) {
  const lines = headline.split('\n');
  return (
    <section aria-label="About us" className="relative overflow-hidden">
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-dark/60 from-0% via-dark/30 via-50% to-sand"
      />
      <div className="relative z-20 flex min-h-[32rem] flex-col items-center justify-center px-6 pb-24 pt-32 text-center lg:min-h-[40rem]">
        <p className="mb-4 font-body text-label uppercase tracking-[0.18em] text-primary">
          Our story
        </p>
        <h1 className="font-display text-hero max-w-2xl text-white">
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-md text-base text-white/85 md:text-h3">
          {subtext}
        </p>
      </div>
    </section>
  );
}

export default AboutHero;
