import { iconRegistry } from '@/lib/icons'

import { homeContent } from '@/data/content'

export function GiftSolutions() {
  const { giftSolutions } = homeContent

  return (
    <section id="solutions" aria-labelledby="solutions-heading" className="bg-white py-20 lg:py-28">
      <div className="main-container">
        <p className="eyebrow text-sky-600">{giftSolutions.eyebrow}</p>
        <h2
          id="solutions-heading"
          className="font-display text-ink mt-4 max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          {giftSolutions.heading}
        </h2>
        <p className="text-slate-body mt-5 max-w-3xl text-base leading-relaxed text-pretty">
          {giftSolutions.lead}
        </p>

        <ul className="border-hairline bg-hairline mt-12 grid gap-px overflow-hidden rounded-3xl border sm:grid-cols-2 lg:grid-cols-3">
          {giftSolutions.solutions.map((solution) => {
            const Icon = iconRegistry[solution.icon]

            return (
              <li key={solution.title} className="bg-white p-8 transition-colors hover:bg-sky-50">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-sky-600">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="font-display text-ink mt-5 text-lg font-bold">{solution.title}</h3>
                <p className="text-slate-body mt-3 text-sm leading-relaxed">{solution.body}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
