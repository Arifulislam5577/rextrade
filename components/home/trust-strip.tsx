import { homeContent } from '@/data/content'

import { TrustStripJourney } from '@/components/home/trust-strip-journey'

export function TrustStrip() {
  const { trustStrip } = homeContent

  return (
    <section
      id="how-we-work"
      aria-labelledby="how-we-work-heading"
      className="bg-linear-to-b from-white to-sky-50 py-20 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-16"
    >
      <div className="main-container">
        <div className="text-center">
          <p className="eyebrow text-ink/50">{trustStrip.eyebrow}</p>
          <h2
            id="how-we-work-heading"
            className="font-display text-ink mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Three things decide how a supply <span className="text-sky-500">order</span> goes.
          </h2>
        </div>

        <TrustStripJourney cards={trustStrip.cards} />
      </div>
    </section>
  )
}
