import { ArrowRight, BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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

            <div className="grid gap-5 sm:grid-cols-5">
              <div className="relative flex items-center gap-5 overflow-hidden rounded-3xl bg-sky-500 p-6 text-white sm:col-span-2 sm:flex-col sm:items-start sm:justify-between sm:gap-8">
                <span
                  aria-hidden="true"
                  className="decor-orb -right-12 -bottom-16 size-44 bg-white/10"
                />

                <BadgeCheck aria-hidden="true" className="relative size-8 shrink-0" />
                <dl className="relative flex flex-col-reverse">
                  <dt className="mt-2 text-sm text-white/85">{rangeStat.label}</dt>
                  <dd className="font-display text-4xl font-extrabold">{rangeStat.value}</dd>
                </dl>
              </div>

              <div className="relative aspect-3/2 overflow-hidden rounded-3xl sm:col-span-3">
                <Image
                  src={secondaryImage.image}
                  alt={secondaryImage.alt}
                  fill
                  sizes="(min-width: 1024px) 27vw, (min-width: 640px) 55vw, 92vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="eyebrow text-ink/50">{whoWeAre.eyebrow}</p>
            <h2 id="about-heading" className="section-heading mt-4">
              Simpler for <span className="text-sky-500">corporate</span> and{' '}
              <span className="text-sky-500">institutional</span> buyers.
            </h2>

            <div className="mt-6 space-y-4">
              {whoWeAre.paragraphs.map((paragraph) => (
                <p key={paragraph} className="section-lead">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link href={whoWeAre.cta.href} scroll={false} className="button-primary">
                {whoWeAre.cta.label}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>

              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600"
                >
                  <BadgeCheck className="size-5" />
                </span>
                <dl className="flex flex-col-reverse">
                  <dt className="text-slate-body text-sm">Registered in Dhaka</dt>
                  <dd className="font-display text-ink text-base font-bold">
                    {foundingStat.label} {foundingStat.value}
                  </dd>
                </dl>
              </div>
            </div>

            <div className="mt-10">
              <div className="bg-mist relative overflow-hidden rounded-3xl p-6">
                <span
                  aria-hidden="true"
                  className="decor-orb -right-16 -bottom-20 size-52 bg-sky-100"
                />

                <h3 className="font-display text-ink relative text-base font-bold">
                  What we supply
                </h3>
                <ul className="relative mt-4 flex flex-wrap gap-2">
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
