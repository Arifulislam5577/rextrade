'use client'

import gsap from 'gsap'
import Image from 'next/image'

import { cn } from '@/lib/utils/cn'

import type { HomeContent } from '@/data/content'
import { homeContent } from '@/data/content'

import type { CoverflowOptions } from '@/hooks/use-coverflow'
import { useCoverflow } from '@/hooks/use-coverflow'

const BACK_SCALE = 0.52
const SIDE_ROTATE_Y = 7
const VISIBLE_DEPTH = 2

const coverflowOptions = {
  perspective: 75,
  xMultiplier: 0.65,
  visibleDepth: VISIBLE_DEPTH,
  moveDuration: 1.6,
  startDelay: 0.8,
  pauseDuration: 0.3,
  getTileVars: (relative, radiusX) => {
    const angle = (relative / 2) * Math.PI
    const orbitDepth = (Math.cos(angle) + 1) / 2
    const isBehind = relative <= -VISIBLE_DEPTH || relative >= VISIBLE_DEPTH

    return {
      x: isBehind ? 0 : Math.sin(angle) * radiusX,
      scale: gsap.utils.interpolate(BACK_SCALE, 1, orbitDepth),
      rotateY: Math.sin(angle) * -SIDE_ROTATE_Y,
      zIndex: Math.round(gsap.utils.interpolate(1, 1000, orbitDepth)),
    }
  },
} as const satisfies CoverflowOptions

type HeroSlide = HomeContent['hero']['gallery'][number]['items'][number]

export function HeroSlider() {
  const slides: readonly HeroSlide[] = homeContent.hero.gallery.flatMap((column) => [
    ...column.items,
  ])
  const { listRef, activeIndex, goToIndex } = useCoverflow(coverflowOptions)

  return (
    <div
      className="mt-14 lg:hidden"
      role="group"
      aria-roledescription="carousel"
      aria-label="Products we supply"
    >
      <ul
        ref={listRef}
        className="grid cursor-grab touch-pan-y place-items-center select-none active:cursor-grabbing"
      >
        {slides.map((slide) => (
          <li
            key={slide.image.src}
            className="col-start-1 row-start-1 flex items-center justify-center"
          >
            <div className="relative aspect-2/3 w-72 overflow-hidden rounded-4xl shadow-2xl shadow-sky-200 sm:w-80">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                draggable={false}
                sizes="(min-width: 640px) 320px, 288px"
                quality={90}
                className="object-cover"
              />
              <p className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-linear-to-t from-black/70 via-black/40 to-transparent px-5 pt-12 pb-5 text-sm font-medium text-white">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-white" />
                {slide.alt}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex items-center justify-center gap-1">
        {slides.map((slide, index) => (
          <button
            key={slide.image.src}
            type="button"
            onClick={() => goToIndex(index)}
            aria-label={`Show ${slide.alt}`}
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
