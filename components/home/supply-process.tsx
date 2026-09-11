import Image from 'next/image'

import { cn } from '@/lib/utils/cn'

import { homeContent } from '@/data/content'

const placementClasses = [
  'lg:col-span-2 lg:col-start-1 lg:row-start-1',
  'lg:col-start-3 lg:row-span-2 lg:row-start-1',
  'lg:col-start-4 lg:row-span-2 lg:row-start-1',
  'lg:col-start-1 lg:row-span-2 lg:row-start-2',
  'lg:col-start-2 lg:row-span-2 lg:row-start-2',
  'lg:col-span-2 lg:col-start-3 lg:row-start-3',
]

const sizeHints = [
  '(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 92vw',
  '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 92vw',
  '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 92vw',
  '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 92vw',
  '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 92vw',
  '(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 92vw',
]

export function SupplyProcess() {
  const { supplyProcess } = homeContent

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-linear-to-b from-sky-50 to-white py-20 lg:py-28"
    >
      <div className="main-container">
        <p className="eyebrow text-ink/50 text-center">{supplyProcess.eyebrow}</p>
        <h2 id="process-heading" className="section-heading mx-auto mt-4 max-w-3xl text-center">
          You know where the <span className="text-sky-500">order stands</span> at each one
        </h2>
        <p className="section-lead mx-auto mt-3 max-w-3xl text-center">{supplyProcess.lead}</p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:h-160 lg:grid-cols-4 lg:grid-rows-3">
          {supplyProcess.steps.map((step, index) => (
            <li key={step.number} className={cn('h-72 lg:h-auto', placementClasses[index])}>
              <article className="group relative h-full overflow-hidden rounded-3xl">
                <Image
                  src={step.image}
                  alt=""
                  fill
                  sizes={sizeHints[index]}
                  quality={90}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />
                <span aria-hidden="true" className="bg-ink/45 absolute inset-0" />
                <span
                  aria-hidden="true"
                  className="from-ink/90 via-ink/35 absolute inset-0 bg-linear-to-t to-transparent"
                />

                <div className="relative flex h-full flex-col justify-between gap-6 p-6">
                  <div>
                    <p className="eyebrow text-white/70">Step {step.number}</p>
                    <h3 className="font-display mt-2 text-xl font-bold text-balance text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-pretty text-white/80">{step.body}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
