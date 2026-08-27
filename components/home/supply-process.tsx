import { iconRegistry } from '@/lib/icons'

import { homeContent } from '@/data/content'

export function SupplyProcess() {
  const { supplyProcess } = homeContent

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-linear-to-b from-sky-50 to-white py-20 lg:py-28"
    >
      <div className="main-container">
        <p className="eyebrow text-ink/50">{supplyProcess.eyebrow}</p>
        <h2 id="process-heading" className="section-heading mt-4 max-w-3xl">
          {supplyProcess.heading}
        </h2>
        <p className="section-lead mt-5 max-w-3xl">{supplyProcess.lead}</p>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {supplyProcess.steps.map((step) => {
            const Icon = iconRegistry[step.icon]

            return (
              <li
                key={step.number}
                className="border-hairline rounded-3xl border bg-white p-7 hover:border-sky-300"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="font-mono text-2xl font-medium text-sky-200">{step.number}</span>
                </div>
                <h3 className="font-display text-ink mt-6 text-lg font-bold">{step.title}</h3>
                <p className="text-slate-body mt-3 text-sm leading-relaxed">{step.body}</p>
              </li>
            )
          })}
        </ol>

        <ul className="border-hairline mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border bg-white px-6 py-5">
          {supplyProcess.chain.map((link, index) => (
            <li key={link} className="flex items-center gap-3">
              <span className="eyebrow text-slate-body">{link}</span>
              {index < supplyProcess.chain.length - 1 ? (
                <span aria-hidden="true" className="text-sky-400">
                  &rarr;
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
