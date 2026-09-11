import { homeContent } from '@/data/content'

import { ContactChannels } from '@/components/contact-channels'
import { ContactForm } from '@/components/home/contact-form'

export function ContactSection() {
  const { contact } = homeContent

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

            <ContactChannels className="mt-6" />
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
