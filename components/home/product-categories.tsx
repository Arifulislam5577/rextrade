import { iconRegistry } from '@/lib/icons'

import { homeContent } from '@/data/content'

export function ProductCategories() {
  const { productCategories } = homeContent

  return (
    <section id="products" aria-labelledby="products-heading" className="bg-mist py-20 lg:py-28">
      <div className="main-container">
        <p className="eyebrow text-sky-600">{productCategories.eyebrow}</p>
        <h2
          id="products-heading"
          className="font-display text-ink mt-4 max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          {productCategories.heading}
        </h2>
        <p className="text-slate-body mt-5 max-w-3xl text-base leading-relaxed text-pretty">
          {productCategories.lead}
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.categories.map((category) => {
            const Icon = iconRegistry[category.icon]

            return (
              <li
                key={category.title}
                className="group border-hairline rounded-3xl border bg-white p-7 transition-colors hover:border-sky-300"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-white">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="font-display text-ink mt-6 text-lg font-bold">{category.title}</h3>
                <p className="text-slate-body mt-3 text-sm leading-relaxed">{category.body}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
