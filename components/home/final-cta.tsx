import { ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'

import { siteConfig } from '@/lib/site-config'

import { homeContent } from '@/data/content'

export function FinalCta() {
  const { finalCta } = homeContent
  const { contact } = siteConfig

  return (
    <section
      id="get-started"
      aria-labelledby="get-started-heading"
      className="bg-linear-to-b from-sky-50 to-white py-20 lg:py-28"
    >
      <div className="main-container">
        <div className="bg-ink relative overflow-hidden rounded-4xl px-6 py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-sky-500 opacity-30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-sky-400 opacity-25 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="eyebrow text-white/50">{finalCta.eyebrow}</p>
            <h2
              id="get-started-heading"
              className="font-display mt-4 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
            >
              {finalCta.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-pretty text-white/70">
              {finalCta.lead}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href={contact.emailHref} className="button-primary min-w-60 whitespace-nowrap">
                {finalCta.primaryCtaLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href={contact.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-w-60 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:border-sky-400 hover:text-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                {finalCta.secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
