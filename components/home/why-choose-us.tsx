import { iconRegistry } from '@/lib/icons'

import { homeContent } from '@/data/content'

export function WhyChooseUs() {
  const { whyChooseUs } = homeContent

  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="bg-mist py-20 lg:py-28"
    >
      <div className="main-container">
        <p className="eyebrow text-sky-600">{whyChooseUs.eyebrow}</p>
        <h2
          id="why-choose-us-heading"
          className="font-display text-ink mt-4 max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          {whyChooseUs.heading}
        </h2>
        <p className="text-slate-body mt-5 max-w-3xl text-base leading-relaxed text-pretty">
          {whyChooseUs.lead}
        </p>

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.points.map((point) => {
            const Icon = iconRegistry[point.icon]

            return (
              <li key={point.title} className="border-t-2 border-sky-500 pt-6">
                <div className="flex items-center gap-3">
                  <Icon aria-hidden="true" className="size-5 shrink-0 text-sky-600" />
                  <h3 className="font-display text-ink text-lg font-bold">{point.title}</h3>
                </div>
                <p className="text-slate-body mt-3 text-sm leading-relaxed">{point.body}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
