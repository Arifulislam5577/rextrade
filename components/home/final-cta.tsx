import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { siteConfig } from '@/lib/site-config'

import { homeContent } from '@/data/content'

export function FinalCta() {
  const { finalCta } = homeContent
  const { contact } = siteConfig

  return (
    <section
      id="get-started"
      aria-labelledby="get-started-heading"
      className="bg-ink relative overflow-hidden py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 size-96 -translate-x-1/2 rounded-full bg-sky-500 opacity-25 blur-3xl"
      />

      <div className="main-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-white/50">{finalCta.eyebrow}</p>
          <h2
            id="get-started-heading"
            className="font-display mt-4 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
          >
            {finalCta.heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-pretty text-white/70 sm:text-lg">
            {finalCta.lead}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href={contact.emailHref} className="button-primary">
              {finalCta.primaryCtaLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-sky-400 hover:text-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              {finalCta.secondaryCtaLabel}
            </a>
          </div>
        </div>

        <address className="mt-16 not-italic">
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3">
            <li className="bg-ink flex items-start gap-4 p-7">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-sky-400" />
              <span>
                <span className="eyebrow block text-white/50">Address</span>
                <span className="mt-2 block text-sm leading-relaxed text-white">
                  {contact.address}
                </span>
              </span>
            </li>
            <li className="bg-ink flex items-start gap-4 p-7">
              <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-sky-400" />
              <span>
                <span className="eyebrow block text-white/50">Phone</span>
                <a
                  href={contact.phoneHref}
                  className="mt-2 block text-sm text-white transition-colors hover:text-sky-300"
                >
                  {contact.phoneLabel}
                </a>
              </span>
            </li>
            <li className="bg-ink flex items-start gap-4 p-7">
              <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-sky-400" />
              <span>
                <span className="eyebrow block text-white/50">Email</span>
                <a
                  href={contact.emailHref}
                  className="mt-2 block text-sm break-all text-white transition-colors hover:text-sky-300"
                >
                  {contact.emailLabel}
                </a>
              </span>
            </li>
          </ul>
        </address>
      </div>
    </section>
  )
}
