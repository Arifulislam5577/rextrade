import { ArrowRight } from 'lucide-react'

import { homeContent } from '@/data/content'

export function WhoWeAre() {
  const { whoWeAre } = homeContent

  return (
    <section id="about" aria-labelledby="about-heading" className="bg-white py-20 lg:py-28">
      <div className="main-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow text-sky-600">{whoWeAre.eyebrow}</p>
            <h2
              id="about-heading"
              className="font-display text-ink mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
            >
              {whoWeAre.heading}
            </h2>
            <div className="mt-6 space-y-5">
              {whoWeAre.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-slate-body leading-relaxed text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
            <a
              href={whoWeAre.cta.href}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition-colors hover:text-sky-500"
            >
              {whoWeAre.cta.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>

          <div className="lg:col-span-5">
            <dl className="border-hairline bg-hairline grid gap-px overflow-hidden rounded-3xl border sm:grid-cols-3 lg:grid-cols-1">
              {whoWeAre.stats.map((stat) => (
                <div key={stat.label} className="bg-mist flex flex-col-reverse gap-2 p-8">
                  <dt className="text-slate-body text-sm font-medium">{stat.label}</dt>
                  <dd className="font-display text-4xl font-extrabold tracking-tight text-sky-600">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
