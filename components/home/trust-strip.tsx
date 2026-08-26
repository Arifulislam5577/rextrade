import { ArrowRight } from 'lucide-react'

import { iconRegistry } from '@/lib/icons'

import { homeContent } from '@/data/content'

export function TrustStrip() {
  const { trustStrip } = homeContent

  return (
    <section
      id="how-we-work"
      aria-labelledby="how-we-work-heading"
      className="bg-mist py-20 lg:py-28"
    >
      <div className="main-container">
        <p className="eyebrow text-sky-600">{trustStrip.eyebrow}</p>
        <h2
          id="how-we-work-heading"
          className="font-display text-ink mt-4 max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          {trustStrip.heading}
        </h2>
        <p className="text-slate-body mt-5 max-w-3xl text-base leading-relaxed text-pretty">
          {trustStrip.lead}
        </p>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {trustStrip.cards.map((card) => {
            const Icon = iconRegistry[card.icon]

            return (
              <li
                key={card.title}
                className="border-hairline flex flex-col rounded-3xl border bg-white p-8"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="font-display text-ink mt-6 text-xl font-bold">{card.title}</h3>
                <p className="text-slate-body mt-4 flex-1 leading-relaxed">{card.body}</p>
                <a
                  href={card.cta.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition-colors hover:text-sky-500"
                >
                  {card.cta.label}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
