import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/lib/utils/cn'

import type { HeroImageRatio } from '@/data/content'
import { homeContent } from '@/data/content'

import { HeroSlider } from '@/components/home/hero-slider'

const ratioClasses = {
  '4/5': 'aspect-4/5',
  '7/5': 'aspect-7/5',
  '6/5': 'aspect-6/5',
  '3/2': 'aspect-3/2',
  '3/4': 'aspect-3/4',
  '2/3': 'aspect-2/3',
  '9/10': 'aspect-4/5',
  '16/9': 'aspect-7/5',
} as const satisfies Record<HeroImageRatio, string>

export function Hero() {
  const { hero } = homeContent

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen overflow-hidden bg-linear-to-b from-sky-50 to-white"
    >
      <div className="main-container relative pt-32 pb-8 text-center lg:pt-48">
        <p className="eyebrow inline-flex items-center rounded-full border border-sky-500 bg-transparent px-4 py-2 text-sky-500">
          {hero.badge}
        </p>

        <h1
          id="hero-heading"
          className="font-display text-ink mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:mt-8 lg:text-6xl"
        >
          {hero.headingLead} <span className="text-sky-500">{hero.headingAccent}</span>
        </h1>

        <p className="text-slate-body mx-auto mt-2 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg md:mt-6">
          {hero.lead}
        </p>

        <div className="mx-auto mt-9 flex max-w-70 flex-col flex-wrap justify-center gap-3 md:max-w-full md:flex-row md:items-center">
          <a href={hero.primaryCta.href} className="button-primary">
            {hero.primaryCta.label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
          <a href={hero.secondaryCta.href} className="button-secondary">
            {hero.secondaryCta.label}
          </a>
        </div>

        <ul className="-mt-12 hidden items-end gap-5 lg:flex">
          {hero.gallery.map((column) => (
            <li key={column.name} className="flex flex-1 flex-col gap-5">
              {column.items.map((item) => (
                <div
                  key={item.image.src}
                  className={cn(
                    'border-hairline relative overflow-hidden rounded-4xl border bg-white',
                    ratioClasses[item.ratio],
                  )}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1280px) 14vw, 20vw"
                    quality={90}
                    priority
                    className="object-cover"
                  />
                </div>
              ))}
            </li>
          ))}
        </ul>

        <HeroSlider />
      </div>
    </section>
  )
}
