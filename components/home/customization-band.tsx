import { ArrowRight } from 'lucide-react'

import { homeContent } from '@/data/content'

export function CustomizationBand() {
  const { customization } = homeContent

  return (
    <section
      aria-label="How customisation works"
      className="bg-ink relative overflow-hidden py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-32 size-96 -translate-y-1/2 rounded-full bg-sky-500 opacity-20 blur-3xl"
      />

      <div className="main-container relative">
        <ol className="grid gap-6 lg:grid-cols-3">
          {customization.steps.map((step, index) => (
            <li key={step.number} className="relative">
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="font-mono text-sm font-medium text-sky-400">{step.number}</p>
                <h3 className="font-display mt-3 text-lg font-bold text-white sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">{step.note}</p>
              </div>
              {index < customization.steps.length - 1 ? (
                <ArrowRight
                  aria-hidden="true"
                  className="absolute top-1/2 -right-6 hidden size-6 -translate-y-1/2 text-sky-400 lg:block"
                />
              ) : null}
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-10 max-w-3xl text-center leading-relaxed text-pretty text-white/70">
          {customization.closing}
        </p>
      </div>
    </section>
  )
}
