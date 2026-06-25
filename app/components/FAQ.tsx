import {useState} from 'react';
import {FAQS} from '~/lib/mock-tours';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section aria-labelledby="faq-heading" id="faq" className="bg-sand py-[7.5rem]">
      <div className="max-w-[47.5rem] mx-auto px-10 text-center">

        <h2
          id="faq-heading"
          className="font-body font-bold text-[2.375rem] text-dark mb-3"
        >
          Real questions from real travelers!
        </h2>
        <p className="text-[1rem] text-dark/50 mb-[5rem]">
          We've heard them all. Here are the honest answers.
        </p>

        <div
          role="list"
          className="mb-10 text-left"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              role="listitem"
              className={`faq-item border-b border-dark/10 ${openIndex === i ? 'open' : ''}`}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                className="w-full bg-transparent border-0 py-5 flex justify-between items-center cursor-pointer
                           font-bold text-[1.0625rem] text-dark text-left gap-4 font-body"
                aria-expanded={openIndex === i}
                onClick={() => toggle(i)}
              >
                <span itemProp="name">{faq.q}</span>
                <span
                  aria-hidden="true"
                  className="faq-icon w-7 h-7 rounded-full border-2 border-dark/20 flex items-center justify-center text-[1rem] text-dark shrink-0"
                >
                  +
                </span>
              </button>
              <div
                className="faq-answer"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p
                  className="text-[0.9375rem] text-dark/60"
                  itemProp="text"
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <aside
          className="bg-forest/8 rounded-[1.5rem] p-8 text-center"
          aria-label="WhatsApp contact"
        >
          <p className="text-[1rem] text-dark mb-4">
            🤔 Still have questions?<br />
            WhatsApp us — we usually answer within an hour.
          </p>
          <a
            href="https://wa.me/212600000000"
            className="font-display text-[1.0625rem] bg-forest text-sand px-8 py-3.5 rounded-full
                       hover:opacity-90 transition-opacity inline-block"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
        </aside>

      </div>
    </section>
  );
}
