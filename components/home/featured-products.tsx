import Image from 'next/image'

import { iconRegistry } from '@/lib/icons'
import { cn } from '@/lib/utils/cn'

import { homeContent } from '@/data/content'

const tileSpans = [
  'col-span-2 aspect-3/2 lg:row-span-2 lg:aspect-auto',
  'aspect-square',
  'aspect-square',
  'col-span-2 aspect-2/1',
  'aspect-square',
  'aspect-square',
  'aspect-square',
  'aspect-square',
] as const

export function FeaturedProducts() {
  const { featured } = homeContent

  return (
    <section
      id="featured"
      aria-labelledby="featured-heading"
      className="bg-linear-to-b from-sky-50 to-white py-20 lg:py-28"
    >
      <div className="main-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-ink/50">{featured.eyebrow}</p>
            <h2 id="featured-heading" className="section-heading mt-4">
              {featured.heading}
            </h2>
          </div>
          <p className="section-lead max-w-sm lg:text-right">{featured.note}</p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.products.map((product, index) => {
            const Icon = iconRegistry[product.icon]
            const isLead = index === 0

            return (
              <li
                key={product.name}
                className={cn(
                  'group border-hairline relative overflow-hidden rounded-3xl border bg-white',
                  tileSpans[index],
                )}
              >
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  quality={90}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span
                  aria-hidden="true"
                  className="from-ink/90 via-ink/25 absolute inset-0 bg-linear-to-t to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4 lg:p-5">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-white backdrop-blur-sm"
                  >
                    <Icon className="size-4" />
                  </span>
                  <h3
                    className={cn(
                      'font-display font-bold text-white',
                      isLead ? 'text-lg lg:text-2xl' : 'text-sm lg:text-base',
                    )}
                  >
                    {product.name}
                  </h3>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
