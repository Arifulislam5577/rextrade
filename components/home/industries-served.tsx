import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { iconRegistry } from '@/lib/icons'

import { homeContent } from '@/data/content'

export function IndustriesServed() {
  const { industries } = homeContent

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="bg-linear-to-b from-white to-sky-50 py-20 lg:py-28"
    >
      <div className="main-container">
        <p className="eyebrow text-ink/50">{industries.eyebrow}</p>
        <h2 id="industries-heading" className="section-heading mt-4">
          Who we <span className="text-sky-500">supply.</span>
        </h2>
        <p className="section-lead mt-5 max-w-3xl">{industries.lead}</p>

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
          <Link
            href={industries.invitation.cta.href}
            scroll={false}
            className="button-primary shrink-0 self-start lg:self-auto"
          >
            {industries.invitation.cta.label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
