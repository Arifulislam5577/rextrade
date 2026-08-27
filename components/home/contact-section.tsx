import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { siteConfig } from '@/lib/site-config'

import { homeContent } from '@/data/content'

import { ContactForm } from '@/components/home/contact-form'

export function ContactSection() {
  const { contact } = homeContent
  const channels = siteConfig.contact

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-linear-to-b from-white to-sky-50 py-20 lg:py-28"
    >
      <div className="main-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-ink/50">{contact.eyebrow}</p>

            <h2 id="contact-heading" className="section-heading mt-4">
              Tell us what you need to <span className="text-sky-500">source.</span>
            </h2>

            <p className="section-lead mt-5 max-w-xl">{contact.lead}</p>

            <h3 className="font-display text-ink mt-12 text-lg font-bold">
              {contact.directHeading}
            </h3>
            <p className="text-slate-body mt-2 text-sm leading-relaxed">{contact.directLead}</p>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href={channels.emailHref}
                  className="text-ink group flex items-center gap-3 text-sm font-medium transition-colors hover:text-sky-700"
                >
                  <span
                    aria-hidden="true"
                    className="border-hairline inline-flex size-10 shrink-0 items-center justify-center rounded-xl border bg-white text-sky-600 transition-colors group-hover:border-sky-300"
                  >
                    <Mail className="size-4" />
                  </span>
                  {channels.emailLabel}
                </a>
              </li>
              <li>
                <a
                  href={channels.phoneHref}
                  className="text-ink group flex items-center gap-3 text-sm font-medium transition-colors hover:text-sky-700"
                >
                  <span
                    aria-hidden="true"
                    className="border-hairline inline-flex size-10 shrink-0 items-center justify-center rounded-xl border bg-white text-sky-600 transition-colors group-hover:border-sky-300"
                  >
                    <Phone className="size-4" />
                  </span>
                  {channels.phoneLabel}
                </a>
              </li>
              <li>
                <a
                  href={channels.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink group flex items-center gap-3 text-sm font-medium transition-colors hover:text-sky-700"
                >
                  <span
                    aria-hidden="true"
                    className="border-hairline inline-flex size-10 shrink-0 items-center justify-center rounded-xl border bg-white text-sky-600 transition-colors group-hover:border-sky-300"
                  >
                    <MessageCircle className="size-4" />
                  </span>
                  WhatsApp
                </a>
              </li>
              <li className="text-slate-body flex items-center gap-3 text-sm">
                <span
                  aria-hidden="true"
                  className="border-hairline inline-flex size-10 shrink-0 items-center justify-center rounded-xl border bg-white text-sky-600"
                >
                  <MapPin className="size-4" />
                </span>
                {channels.address}
              </li>
            </ul>
          </div>

          <div className="border-hairline rounded-4xl border bg-white p-3">
            <div className="bg-mist rounded-3xl p-6 lg:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
