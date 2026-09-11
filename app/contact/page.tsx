import type { Metadata } from 'next'

import { contactPageContent } from '@/data/contact-page'
import { homeContent } from '@/data/content'

import { ContactChannels } from '@/components/contact-channels'
import { ContactForm } from '@/components/home/contact-form'

const NEXT_STEP_COUNT = 3

export const metadata: Metadata = {
  title: 'Contact',
  description: contactPageContent.metaDescription,
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  const { contact, supplyProcess } = homeContent
  const { nextSteps } = contactPageContent
  const steps = supplyProcess.steps.slice(0, NEXT_STEP_COUNT)

  return (
    <main id="main">
      <section
        aria-labelledby="contact-heading"
        className="bg-linear-to-b from-sky-50 to-white pt-32 pb-20 lg:pt-44 lg:pb-28"
      >
        <div className="main-container">
          <div className="text-center">
            <p className="eyebrow text-ink/50">{contactPageContent.eyebrow}</p>
            <h1 id="contact-heading" className="section-heading mx-auto mt-4 max-w-3xl">
              {contactPageContent.headingLead}{' '}
              <span className="text-sky-500">{contactPageContent.headingAccent}</span>
            </h1>
            <p className="section-lead mx-auto mt-5 max-w-2xl">{contactPageContent.lead}</p>
          </div>

          <div className="border-hairline mt-14 rounded-4xl border bg-white p-3 lg:p-4">
            <div className="grid gap-3 lg:grid-cols-12 lg:gap-4">
              <div className="relative overflow-hidden rounded-3xl bg-sky-500 p-8 text-white lg:col-span-5 lg:p-10">
                <span
                  aria-hidden="true"
                  className="decor-orb -right-20 -bottom-24 size-72 bg-white/10"
                />

                <div className="relative">
                  <h2 className="font-display text-2xl font-bold">Contact information</h2>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80">
                    {contact.directLead}
                  </p>

                  <ContactChannels tone="on-brand" className="mt-10" />
                </div>
              </div>

              <div className="p-5 lg:col-span-7 lg:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="next-steps-heading"
        className="bg-linear-to-b from-white to-sky-50 py-20 lg:py-28"
      >
        <div className="main-container">
          <p className="eyebrow text-ink/50 text-center">{nextSteps.eyebrow}</p>
          <h2
            id="next-steps-heading"
            className="section-heading mx-auto mt-4 max-w-3xl text-center"
          >
            {nextSteps.headingLead} <span className="text-sky-500">{nextSteps.headingAccent}</span>
          </h2>
          <p className="section-lead mx-auto mt-3 max-w-2xl text-center">{nextSteps.lead}</p>

          <ol className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.number}
                className="border-hairline relative overflow-hidden rounded-3xl border bg-white p-7 lg:p-8"
              >
                <span
                  aria-hidden="true"
                  className="decor-orb -right-16 -bottom-20 size-52 bg-sky-50"
                />

                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="font-display text-hairline block text-5xl leading-none font-extrabold"
                  >
                    {step.number}
                  </span>
                  <h3 className="font-display text-ink mt-5 text-base font-bold">{step.title}</h3>
                  <p className="text-slate-body mt-3 text-sm leading-relaxed text-pretty">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}
