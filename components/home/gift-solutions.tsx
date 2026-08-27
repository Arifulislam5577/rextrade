import { homeContent } from '@/data/content'

export function GiftSolutions() {
  const { giftSolutions } = homeContent

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="bg-linear-to-b from-white to-sky-50 py-20 lg:py-28"
    >
      <div className="main-container">
        <p className="eyebrow text-ink/50">{giftSolutions.eyebrow}</p>
        <h2 id="solutions-heading" className="section-heading mt-4 max-w-3xl">
          {giftSolutions.heading}
        </h2>
        <p className="section-lead mt-5 max-w-3xl">{giftSolutions.lead}</p>

        <ol className="divide-hairline border-hairline mt-12 divide-y border-y">
          {giftSolutions.solutions.map((solution, index) => (
            <li
              key={solution.title}
              className="flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:gap-8 lg:gap-12"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 font-mono text-sm font-medium text-sky-600"
              >
                {index + 1}
              </span>
              <h3 className="font-display text-ink text-lg font-bold sm:w-74 sm:shrink-0">
                {solution.title}
              </h3>
              <p className="text-slate-body text-sm leading-relaxed text-pretty sm:flex-1">
                {solution.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
