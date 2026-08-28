'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils/cn'

import type { HomeContent } from '@/data/content'

const CARD_OFFSET = 100
const DOT_DURATION = 0.06
const CARD_DURATION = 0.12
const SCRUB_SMOOTHING = 0.8

type SupplySteps = HomeContent['supplyProcess']['steps']

export function SupplyProcessTimeline({ steps }: { readonly steps: SupplySteps }) {
  const rootRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const root = rootRef.current

    if (!root) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const media = gsap.matchMedia()

    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const fill = root.querySelector<HTMLElement>('[data-timeline-fill]')
      const items = Array.from(root.querySelectorAll<HTMLLIElement>(':scope > li'))

      if (!fill || items.length === 0) {
        return
      }

      const rootTop = root.getBoundingClientRect().top + window.scrollY
      const rootHeight = root.offsetHeight

      const entries = items.map((item, index) => {
        const dot = item.querySelector<HTMLElement>('[data-timeline-dot]')
        const anchor = dot ?? item
        const anchorRect = anchor.getBoundingClientRect()
        const anchorCentre = anchorRect.top + window.scrollY + anchorRect.height / 2

        return {
          card: item.querySelector<HTMLElement>('[data-timeline-card]'),
          dot,
          isRightSide: index % 2 === 0,
          fraction: gsap.utils.clamp(0, 1, (anchorCentre - rootTop) / rootHeight),
        }
      })

      gsap.set(fill, { transformOrigin: 'top center', scaleY: 0 })

      entries.forEach((entry) => {
        if (entry.dot) {
          gsap.set(entry.dot, { scale: 0 })
        }

        if (entry.card) {
          gsap.set(entry.card, {
            x: entry.isRightSide ? CARD_OFFSET : -CARD_OFFSET,
            autoAlpha: 0,
          })
        }
      })

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: SCRUB_SMOOTHING,
          invalidateOnRefresh: true,
        },
      })

      timeline.to(fill, { scaleY: 1, duration: 1 }, 0)

      entries.forEach((entry) => {
        if (entry.dot) {
          timeline.to(
            entry.dot,
            { scale: 1, duration: DOT_DURATION, ease: 'back.out(2)' },
            entry.fraction,
          )
        }

        if (entry.card) {
          timeline.to(
            entry.card,
            { x: 0, autoAlpha: 1, duration: CARD_DURATION, ease: 'power2.out' },
            entry.fraction,
          )
        }
      })

      return () => {
        timeline.scrollTrigger?.kill()
        timeline.kill()
      }
    })

    return () => {
      media.revert()
    }
  }, [])

  return (
    <ol ref={rootRef} className="relative mt-14 space-y-6 lg:mt-16 lg:space-y-10">
      <span
        aria-hidden="true"
        className="bg-hairline absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 lg:block"
      />
      <span
        aria-hidden="true"
        data-timeline-fill=""
        className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-sky-500 lg:block"
      />

      {steps.map((step, index) => {
        const isRightSide = index % 2 === 0

        return (
          <li key={step.number} className="relative lg:grid lg:grid-cols-2 lg:gap-16">
            <span
              aria-hidden="true"
              data-timeline-dot=""
              className="absolute top-1/2 left-1/2 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500 lg:block"
            />

            <article
              data-timeline-card=""
              className={cn(
                'border-hairline/50 relative flex rounded-3xl border bg-white/50 lg:max-w-lg',
                isRightSide ? 'lg:col-start-2' : 'lg:col-start-1 lg:ml-auto lg:flex-row-reverse',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'border-hairline/50 absolute top-1/2 z-10 hidden size-4.5 -translate-y-1/2 rotate-45 bg-white/50 lg:block',
                  isRightSide
                    ? 'left-0 -translate-x-1/2 border-b border-l'
                    : 'right-0 translate-x-1/2 border-t border-r',
                )}
              />

              <div
                className={cn(
                  'border-hairline/50 flex w-24 shrink-0 items-center justify-center border-r',
                  isRightSide ? '' : 'lg:border-r-0 lg:border-l',
                )}
              >
                <span className="font-display text-hairline text-5xl leading-none font-extrabold">
                  {step.number}
                </span>
              </div>

              <div className="p-6">
                <div>
                  <h3 className="font-display text-ink text-base font-bold lg:whitespace-nowrap">
                    {step.title}
                  </h3>
                  <p className="text-slate-body mt-1 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            </article>
          </li>
        )
      })}
    </ol>
  )
}
