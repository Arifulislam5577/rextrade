'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { iconRegistry } from '@/lib/icons'
import { cn } from '@/lib/utils/cn'

import type { HomeContent } from '@/data/content'

const CURVE_PATH = 'M0,190 H216 C400,190 420,70 600,70 C780,70 810,140 990,140 H1200'
const VIEWBOX_WIDTH = 1200
const VIEWBOX_HEIGHT = 260
const STEP_PATH_X = [216, 600, 990] as const
const DRAW_DURATION = 1.45
const COMPLETE_DURATION = 0.35
const TAIL_DURATION = 0.9
const PIN_SCROLL_PERCENT = 180
const SCRUB_SMOOTHING = 0.8
const STROKE_COVER_PX = 8
const PATH_SAMPLE_COUNT = 240

const stepAnchors = [
  { left: '18%', top: '73%', isTextAbove: true },
  { left: '50%', top: '27%', isTextAbove: false },
  { left: '82.5%', top: '54%', isTextAbove: false },
] as const

type TrustStripCards = HomeContent['trustStrip']['cards']

type PathMeasure = {
  readonly userTotal: number
  readonly screenTotal: number
  readonly samples: readonly { readonly userLength: number; readonly screenLength: number }[]
}

export function TrustStripJourney({ cards }: { readonly cards: TrustStripCards }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const progressPathRef = useRef<SVGPathElement>(null)
  const travelerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const progressPath = progressPathRef.current
    const traveler = travelerRef.current

    if (!root) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const media = gsap.matchMedia()

    media.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const isDesktop = Boolean(context.conditions?.isDesktop)
        const reduceMotion = Boolean(context.conditions?.reduceMotion)
        const scopeName = isDesktop ? 'desktop' : 'mobile'
        const icons = htmlElements(root, scopeName, 'step-marker')
        const indexes = htmlElements(root, scopeName, 'step-index')
        const sky500 = readThemeColor('--color-sky-500', '#00aaff')
        const hairline = readThemeColor('--color-hairline', '#dde5f0')
        const idleShadow = isDesktop
          ? '0 20px 25px -5px rgb(186 230 253 / 0.55)'
          : '0 10px 15px -3px rgb(224 242 254 / 0.7)'

        function paintIdle() {
          gsap.set(icons, {
            backgroundColor: '#ffffff',
            color: sky500,
            boxShadow: idleShadow,
            scale: 1,
          })
          gsap.set(indexes, { color: hairline })
        }

        function paintComplete() {
          gsap.set(icons, {
            backgroundColor: sky500,
            color: '#ffffff',
            boxShadow: '0 18px 28px -8px rgb(0 170 255 / 0.45)',
            scale: 1,
          })
          gsap.set(indexes, { color: sky500 })
        }

        if (reduceMotion) {
          paintComplete()

          if (progressPath) {
            const reducedMeasure = measurePath(progressPath)

            if (reducedMeasure) {
              applyPathProgress(progressPath, reducedMeasure, 1)
            }
          }

          if (traveler) {
            gsap.set(traveler, { autoAlpha: 0 })
          }

          return
        }

        paintIdle()

        const pinTarget = root.closest('section')
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: isDesktop
            ? {
                trigger: pinTarget ?? root,
                start: 'top top',
                end: `+=${PIN_SCROLL_PERCENT}%`,
                pin: true,
                anticipatePin: 1,
                scrub: SCRUB_SMOOTHING,
                invalidateOnRefresh: true,
              }
            : {
                trigger: root,
                start: 'top 80%',
                end: 'bottom 65%',
                scrub: SCRUB_SMOOTHING,
              },
        })

        let refreshPathMeasure: (() => void) | undefined

        if (isDesktop && progressPath && traveler) {
          const path = progressPath
          const head = traveler
          const progress = { value: 0 }
          const stepRatios = STEP_PATH_X.map((targetX) => getPathRatioAtX(path, targetX))
          let pathMeasure = measurePath(path)

          function syncJourney() {
            if (!pathMeasure) {
              return
            }

            const point = applyPathProgress(path, pathMeasure, progress.value)
            gsap.set(head, {
              autoAlpha: 1,
              left: `${(point.x / VIEWBOX_WIDTH) * 100}%`,
              top: `${(point.y / VIEWBOX_HEIGHT) * 100}%`,
            })
          }

          refreshPathMeasure = () => {
            pathMeasure = measurePath(path) ?? pathMeasure
            syncJourney()
          }

          gsap.set(head, { autoAlpha: 1 })
          syncJourney()
          window.addEventListener('resize', refreshPathMeasure)

          stepRatios.forEach((ratio, index) => {
            const icon = icons[index]
            const stepIndex = indexes[index]

            timeline.to(progress, {
              value: ratio,
              duration: DRAW_DURATION,
              onUpdate: syncJourney,
            })

            if (!icon || !stepIndex) {
              return
            }

            timeline.add(completeStep(icon, stepIndex, sky500))
          })

          timeline.to(progress, {
            value: 1,
            duration: TAIL_DURATION,
            onUpdate: syncJourney,
          })
        } else {
          icons.forEach((icon, index) => {
            const stepIndex = indexes[index]

            if (!stepIndex) {
              return
            }

            timeline.add(completeStep(icon, stepIndex, sky500), index === 0 ? 0 : '+=0.5')
          })
        }

        return () => {
          timeline.scrollTrigger?.kill()
          timeline.kill()

          if (refreshPathMeasure) {
            window.removeEventListener('resize', refreshPathMeasure)
          }
        }
      },
      root,
    )

    return () => {
      media.revert()
    }
  }, [])

  return (
    <div ref={rootRef}>
      <ol className="mt-14 space-y-12 lg:hidden" data-journey="mobile">
        {cards.map((card, index) => {
          const Icon = iconRegistry[card.icon]

          return (
            <li key={card.title} className="relative pl-18">
              <span
                data-step-marker=""
                className="absolute top-0 left-0 inline-flex size-13 items-center justify-center rounded-2xl bg-white text-sky-500 shadow-lg shadow-sky-100"
              >
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <StepCopy card={card} index={index} indexClassName="text-6xl" />
            </li>
          )
        })}
      </ol>

      <div className="relative mt-20 hidden h-144 lg:mt-10 lg:block" data-journey="desktop">
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d={CURVE_PATH}
            fill="none"
            stroke="var(--color-hairline)"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            ref={progressPathRef}
            d={CURVE_PATH}
            fill="none"
            stroke="var(--color-sky-500)"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <span
          ref={travelerRef}
          aria-hidden="true"
          className="pointer-events-none absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500 opacity-0 shadow-[0_0_0_6px_rgb(0_170_255/0.18),0_0_18px_rgb(0_170_255/0.55)]"
        />

        <ol className="absolute inset-0">
          {cards.map((card, index) => {
            const anchor = stepAnchors[index]
            const Icon = iconRegistry[card.icon]

            if (!anchor) {
              return null
            }

            return (
              <li
                key={card.title}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: anchor.left, top: anchor.top }}
              >
                <span
                  data-step-marker=""
                  className="inline-flex size-14 items-center justify-center rounded-2xl bg-white text-sky-500 shadow-xl shadow-sky-200"
                >
                  <Icon aria-hidden="true" className="size-6" />
                </span>

                <div
                  className={cn(
                    'absolute left-1/2 w-72 -translate-x-1/2',
                    anchor.isTextAbove ? 'bottom-full mb-10' : 'top-full mt-10',
                  )}
                >
                  <StepCopy card={card} index={index} indexClassName="text-8xl" />
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

function StepCopy({
  card,
  index,
  indexClassName,
}: {
  readonly card: TrustStripCards[number]
  readonly index: number
  readonly indexClassName: string
}) {
  return (
    <>
      <span
        data-step-index=""
        aria-hidden="true"
        className={cn(
          'font-display text-hairline mb-2 block leading-none font-extrabold',
          indexClassName,
        )}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="font-display text-ink text-xl font-bold">{card.title}</h3>
      <p className="text-slate-body mt-3 text-sm leading-relaxed">{card.body}</p>
      <a
        href={card.cta.href}
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition-colors hover:text-sky-500"
      >
        {card.cta.label}
        <ArrowRight aria-hidden="true" className="size-4" />
      </a>
    </>
  )
}

function completeStep(icon: HTMLElement, stepIndex: HTMLElement, sky500: string) {
  return gsap
    .timeline()
    .to(icon, {
      backgroundColor: sky500,
      color: '#ffffff',
      boxShadow: '0 18px 28px -8px rgb(0 170 255 / 0.45)',
      duration: COMPLETE_DURATION,
      ease: 'power2.out',
    })
    .to(
      icon,
      {
        scale: 1.1,
        duration: 0.16,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      },
      '<',
    )
    .to(stepIndex, { color: sky500, duration: COMPLETE_DURATION, ease: 'power2.out' }, '<')
}

function applyPathProgress(path: SVGPathElement, measure: PathMeasure, progress: number) {
  const clamped = gsap.utils.clamp(0, 1, progress)
  const userLength = measure.userTotal * clamped
  const drawn =
    clamped === 0
      ? 0
      : Math.min(measure.screenTotal, screenLengthAt(measure, userLength) + STROKE_COVER_PX)

  path.style.strokeDasharray = `${drawn} ${measure.screenTotal}`
  path.style.strokeDashoffset = '0'

  return path.getPointAtLength(userLength)
}

function measurePath(path: SVGPathElement): PathMeasure | undefined {
  const ctm = path.getScreenCTM()
  const userTotal = path.getTotalLength()

  if (!ctm || userTotal === 0) {
    return undefined
  }

  const samples: { userLength: number; screenLength: number }[] = [
    { userLength: 0, screenLength: 0 },
  ]
  let screenLength = 0
  let previous = toScreenPoint(ctm, path.getPointAtLength(0))

  for (let sample = 1; sample <= PATH_SAMPLE_COUNT; sample += 1) {
    const userLength = (userTotal * sample) / PATH_SAMPLE_COUNT
    const current = toScreenPoint(ctm, path.getPointAtLength(userLength))
    screenLength += Math.hypot(current.x - previous.x, current.y - previous.y)
    samples.push({ userLength, screenLength })
    previous = current
  }

  return { userTotal, screenTotal: screenLength, samples }
}

function toScreenPoint(ctm: DOMMatrix, point: DOMPoint) {
  return new DOMPoint(point.x, point.y).matrixTransform(ctm)
}

function screenLengthAt(measure: PathMeasure, userLength: number) {
  const samples = measure.samples
  const last = samples[samples.length - 1]

  if (userLength <= 0) {
    return 0
  }

  if (!last || userLength >= measure.userTotal) {
    return measure.screenTotal
  }

  let low = 0
  let high = samples.length - 1

  while (low < high) {
    const mid = Math.floor((low + high) / 2)
    const sample = samples[mid]

    if (!sample) {
      break
    }

    if (sample.userLength < userLength) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  const next = samples[low]
  const previous = samples[Math.max(low - 1, 0)]

  if (!next || !previous) {
    return measure.screenTotal
  }

  const span = next.userLength - previous.userLength

  if (span === 0) {
    return next.screenLength
  }

  const mix = (userLength - previous.userLength) / span
  return previous.screenLength + (next.screenLength - previous.screenLength) * mix
}

function getPathRatioAtX(path: SVGPathElement, targetX: number) {
  const total = path.getTotalLength()

  if (total === 0) {
    return 0
  }

  let closestRatio = 0
  let closestDistance = Number.POSITIVE_INFINITY
  const sampleCount = 400

  for (let sample = 0; sample <= sampleCount; sample += 1) {
    const ratio = sample / sampleCount
    const point = path.getPointAtLength(total * ratio)
    const distance = Math.abs(point.x - targetX)

    if (distance < closestDistance) {
      closestDistance = distance
      closestRatio = ratio
    }
  }

  return closestRatio
}

function htmlElements(root: HTMLElement, scopeName: string, marker: string) {
  return Array.from(root.querySelectorAll(`[data-journey="${scopeName}"] [data-${marker}]`)).filter(
    (node): node is HTMLElement => node instanceof HTMLElement,
  )
}

function readThemeColor(variableName: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()

  if (value.length === 0) {
    return fallback
  }

  return value
}
