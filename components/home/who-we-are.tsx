import { ArrowRight, BadgeCheck } from 'lucide-react'
import Image from 'next/image'

import { homeContent } from '@/data/content'

const PILL_COUNT = 6

export function WhoWeAre() {
  const { whoWeAre, productCategories } = homeContent
  const [rangeStat, foundingStat] = whoWeAre.stats
  const [primaryImage, secondaryImage] = whoWeAre.images
  const pills = productCategories.categories.slice(0, PILL_COUNT)

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-linear-to-b from-sky-50 to-white py-20 lg:py-28"
    >
      <div className="main-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5">
            <div className="relative aspect-video overflow-hidden rounded-3xl">
              <Image
                src={primaryImage.image}
                alt={primaryImage.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 92vw"
                quality={90}
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-5 gap-5">
              <div className="col-span-2 flex flex-col justify-between rounded-3xl bg-sky-500 p-6 text-white">
                <BadgeCheck aria-hidden="true" className="size-8" />
                <div className="mt-8">
                  <dd className="font-display text-4xl font-extrabold">{rangeStat.value}</dd>
                  <dt className="mt-2 text-sm text-white/85">{rangeStat.label}</dt>
                </div>
              </div>

              <div className="relative col-span-3 aspect-3/2 overflow-hidden rounded-3xl">
                <Image
                  src={secondaryImage.image}
                  alt={secondaryImage.alt}
                  fill
                  sizes="(min-width: 1024px) 27vw, 55vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="eyebrow text-ink/50">{whoWeAre.eyebrow}</p>
            <h2
              id="about-heading"
              className="font-display text-ink mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Simpler for <span className="text-sky-500">corporate</span> and{' '}
              <span className="text-sky-500">institutional</span> buyers.
            </h2>

            <div className="mt-6 space-y-4">
              {whoWeAre.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-slate-body leading-relaxed text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <a href={whoWeAre.cta.href} className="button-primary">
                {whoWeAre.cta.label}
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>

              <dl className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600"
                >
                  <BadgeCheck className="size-5" />
                </span>
                <div>
                  <dd className="font-display text-ink text-base font-bold">
                    {foundingStat.label} {foundingStat.value}
                  </dd>
                  <dt className="text-slate-body text-sm">Registered in Dhaka</dt>
                </div>
              </dl>
            </div>

            <div className="mt-10">
              <div className="bg-mist rounded-3xl p-6">
                <h3 className="font-display text-ink text-base font-bold">What we supply</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {pills.map((category) => (
                    <li
                      key={category.title}
                      className="border-hairline text-slate-body rounded-full border bg-white px-3 py-1.5 text-xs font-medium"
                    >
                      {category.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
