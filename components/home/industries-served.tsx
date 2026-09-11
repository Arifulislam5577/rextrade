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
        <p className="eyebrow text-ink/50 text-center">{industries.eyebrow}</p>
        <h2 id="industries-heading" className="section-heading mx-auto mt-4 max-w-3xl text-center">
          Who we <span className="text-sky-500">supply.</span>
        </h2>
        <p className="section-lead mx-auto mt-3 max-w-3xl text-center">{industries.lead}</p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {industries.sectors.map((sector) => {
            const Icon = iconRegistry[sector.icon]

            return (
              <li
                key={sector.title}
                className="group border-hairline relative overflow-hidden rounded-3xl border bg-white p-7 transition-colors hover:border-sky-300"
              >
                <span
                  aria-hidden="true"
                  className="decor-orb -right-14 -bottom-16 size-44 bg-sky-50"
                />

                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-white"
                  >
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-display text-ink mt-5 text-base font-bold">{sector.title}</h3>
                  <p className="text-slate-body mt-3 text-sm leading-relaxed text-pretty">
                    {sector.body}
                  </p>
                </div>
              </li>
            )
          })}

          <li className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-sky-500 p-7 text-white">
            <span
              aria-hidden="true"
              className="decor-orb -right-16 -bottom-20 size-52 bg-white/10"
            />

            <div className="relative">
              <h3 className="font-display text-base font-bold">{industries.invitation.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-white/85">
                {industries.invitation.body}
              </p>
            </div>
            <Link
              href={industries.invitation.cta.href}
              scroll={false}
              className="text-ink relative inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-sky-50"
            >
              {industries.invitation.cta.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
