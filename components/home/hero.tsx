import { ArrowRight } from 'lucide-react'

import { homeContent } from '@/data/content'

export function Hero() {
  const { hero } = homeContent

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center overflow-hidden bg-linear-to-b from-sky-50 to-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-sky-500 opacity-40 blur-3xl"
      />

      <div className="main-container relative pt-24 pb-8 text-center lg:pt-28">
        <p className="eyebrow inline-flex items-center rounded-full border border-sky-500 bg-transparent px-4 py-2 text-sky-500">
          {hero.badge}
        </p>

        <h1
          id="hero-heading"
          className="font-display text-ink mx-auto mt-8 max-w-4xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          {hero.headingLead} <span className="text-sky-500">{hero.headingAccent}</span>
        </h1>

        <p className="text-slate-body mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg">
          {hero.lead}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href={hero.primaryCta.href} className="button-primary">
            {hero.primaryCta.label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
          <a href={hero.secondaryCta.href} className="button-secondary">
            {hero.secondaryCta.label}
          </a>
        </div>

        <p className="text-slate-body mx-auto mt-10 max-w-xl text-sm leading-relaxed text-pretty">
          {hero.footnote}
        </p>
      </div>
    </section>
  )
}
