'use client'

import gsap from 'gsap'
import Image from 'next/image'

import { iconRegistry } from '@/lib/icons'
import { cn } from '@/lib/utils/cn'

import type { HomeContent } from '@/data/content'

import type { CoverflowOptions } from '@/hooks/use-coverflow'
import { useCoverflow } from '@/hooks/use-coverflow'

const BACK_SCALE = 0.68
const SIDE_ROTATE_Y = 7
const VISIBLE_DEPTH = 2

const coverflowOptions = {
  perspective: 75,
  xMultiplier: 0.95,
  visibleDepth: VISIBLE_DEPTH,
  moveDuration: 1.6,
  startDelay: 0.9,
  pauseDuration: 1.4,
  getTileVars: (relative, radiusX) => {
    const angle = (relative / VISIBLE_DEPTH) * (Math.PI / 2)
    const orbitDepth = Math.cos(angle)

    return {
      x: Math.sin(angle) * radiusX,
      scale: gsap.utils.interpolate(BACK_SCALE, 1, orbitDepth),
      rotateY: Math.sin(angle) * -SIDE_ROTATE_Y,
      zIndex: Math.round(gsap.utils.interpolate(1, 1000, orbitDepth)),
    }
  },
} as const satisfies CoverflowOptions

type ProductCategories = HomeContent['productCategories']['categories']

export function ProductCategoriesSlider({
  categories,
}: {
  readonly categories: ProductCategories
}) {
  const { listRef, activeIndex, goToIndex } = useCoverflow(coverflowOptions)

  return (
    <div aria-label="Product categories" className="mt-14 overflow-hidden">
      <ul
        ref={listRef}
        className="grid cursor-grab touch-pan-y place-items-center select-none active:cursor-grabbing"
      >
        {categories.map((category, index) => {
          const Icon = iconRegistry[category.icon]

          return (
            <li
              key={category.title}
              className="col-start-1 row-start-1 flex items-center justify-center"
            >
              <article className="relative aspect-2/3 w-72 overflow-hidden rounded-4xl sm:w-80 lg:w-96">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 288px"
                  quality={90}
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="from-ink/95 via-ink/35 absolute inset-0 bg-linear-to-t to-transparent"
                />

                <div className="relative flex items-start justify-between p-6">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <span className="font-mono text-xs text-white/80">
                    {String(index + 1).padStart(2, '0')}/
                    {String(categories.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="font-display text-lg font-bold text-white sm:text-xl lg:text-2xl">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{category.body}</p>
                </div>
              </article>
            </li>
          )
        })}
      </ul>

      <div className="mt-10 flex items-center justify-center gap-1">
        {categories.map((category, index) => (
          <button
            key={category.title}
            type="button"
            onClick={() => goToIndex(index)}
            aria-label={`Show ${category.title}`}
            aria-current={index === activeIndex}
            className={cn(
              'h-2 cursor-pointer rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500',
              index === activeIndex ? 'w-7 bg-sky-500' : 'bg-slate-body/30 w-2',
            )}
          />
        ))}
      </div>
    </div>
  )
}
