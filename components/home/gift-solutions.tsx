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
          Built around the reason you are <span className="text-sky-500">buying</span>
        </h2>
        <p className="section-lead mt-3 max-w-3xl">{giftSolutions.lead}</p>

        <ol className="divide-hairline border-hairline mt-12 divide-y border-y">
          {giftSolutions.solutions.map((solution, index) => (
            <li
              key={solution.title}
              className="flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:gap-8 lg:gap-12"
            >
              <span
                aria-hidden="true"
                className="font-display text-hairline block text-5xl leading-none font-extrabold sm:w-24 sm:shrink-0"
              >
                {String(index + 1).padStart(2, '0')}
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
