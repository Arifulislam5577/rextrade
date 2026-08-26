import { ArrowRight } from 'lucide-react'

import { iconRegistry } from '@/lib/icons'

import { homeContent } from '@/data/content'

export function IndustriesServed() {
  const { industries } = homeContent

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="bg-white py-20 lg:py-28"
    >
      <div className="main-container">
        <p className="eyebrow text-sky-600">{industries.eyebrow}</p>
        <h2
          id="industries-heading"
          className="font-display text-ink mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          {industries.heading}
        </h2>
        <p className="text-slate-body mt-5 max-w-3xl text-base leading-relaxed text-pretty">
          {industries.lead}
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.sectors.map((sector) => {
            const Icon = iconRegistry[sector.icon]

            return (
              <li
                key={sector.title}
                className="border-hairline bg-mist rounded-3xl border p-7 transition-colors hover:bg-sky-50"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white text-sky-600">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="font-display text-ink mt-5 text-base font-bold">{sector.title}</h3>
                <p className="text-slate-body mt-3 text-sm leading-relaxed">{sector.body}</p>
              </li>
            )
          })}
        </ul>

        <div className="mt-8 flex flex-col gap-6 rounded-3xl border border-sky-200 bg-sky-50 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div>
            <h3 className="font-display text-ink text-xl font-bold">
              {industries.invitation.title}
            </h3>
            <p className="text-slate-body mt-3 max-w-2xl leading-relaxed text-pretty">
              {industries.invitation.body}
            </p>
          </div>
          <a
            href={industries.invitation.cta.href}
            className="button-primary shrink-0 self-start lg:self-auto"
          >
            {industries.invitation.cta.label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
