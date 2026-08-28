import Image from 'next/image'

import { iconRegistry } from '@/lib/icons'
import { cn } from '@/lib/utils/cn'

import { homeContent } from '@/data/content'

const spanClasses = ['lg:col-span-2', '', '', '', '', 'lg:col-span-2']

export function WhyChooseUs() {
  const { whyChooseUs } = homeContent

  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="bg-linear-to-b from-sky-50 to-white py-20 lg:py-28"
    >
      <div className="main-container">
        <p className="eyebrow text-ink/50 text-center">{whyChooseUs.eyebrow}</p>
        <h2
          id="why-choose-us-heading"
          className="section-heading mx-auto mt-4 max-w-3xl text-center"
        >
          What you actually get by <span className="text-sky-500">working</span> with us.
        </h2>
        <p className="section-lead mx-auto mt-3 max-w-3xl text-center">{whyChooseUs.lead}</p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {whyChooseUs.points.map((point, index) => {
            const Icon = iconRegistry[point.icon]

            return (
              <li
                key={point.title}
                className={cn(
                  'group relative h-72 overflow-hidden rounded-3xl lg:h-80',
                  spanClasses[index],
                )}
              >
                <Image
                  src={point.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 92vw"
                  quality={90}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none"
                />
                <span aria-hidden="true" className="bg-ink/40 absolute inset-0" />
                <span
                  aria-hidden="true"
                  className="from-ink/95 via-ink/50 absolute inset-0 bg-linear-to-t to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="font-display mt-4 text-lg font-bold text-white">{point.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/80">{point.body}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
