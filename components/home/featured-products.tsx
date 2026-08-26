import { iconRegistry } from '@/lib/icons'

import { homeContent } from '@/data/content'

export function FeaturedProducts() {
  const { featured } = homeContent

  return (
    <section id="featured" aria-labelledby="featured-heading" className="bg-white py-20 lg:py-28">
      <div className="main-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-sky-600">{featured.eyebrow}</p>
            <h2
              id="featured-heading"
              className="font-display text-ink mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
            >
              {featured.heading}
            </h2>
          </div>
          <p className="text-slate-body max-w-sm text-sm leading-relaxed lg:text-right">
            {featured.note}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.products.map((product) => {
            const Icon = iconRegistry[product.icon]

            return (
              <li
                key={product.name}
                className="border-hairline overflow-hidden rounded-2xl border bg-white transition-colors hover:border-sky-300"
              >
                <span className="to-mist flex aspect-4/3 items-center justify-center bg-linear-to-br from-sky-50 text-sky-600">
                  <Icon aria-hidden="true" className="size-10" strokeWidth={1.5} />
                </span>
                <h3 className="border-hairline text-ink border-t px-4 py-4 text-sm font-semibold">
                  {product.name}
                </h3>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
