'use client'

import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils/cn'

import type { HomeContent } from '@/data/content'
import { homeContent } from '@/data/content'

const X_MULTIPLIER = 0.65
const BACK_SCALE = 0.52
const SIDE_ROTATE_Y = 7
const PERSPECTIVE = 75
const MOVE_DURATION = 1.6
const START_DELAY = 0.8
const PAUSE_DURATION = 0.3
const VISIBLE_DEPTH = 2

type HeroSlide = HomeContent['hero']['gallery'][number]['items'][number]

export function HeroSlider() {
  const slides: readonly HeroSlide[] = homeContent.hero.gallery.flatMap((column) => [
    ...column.items,
  ])
  const listRef = useRef<HTMLUListElement>(null)
  const goToIndexRef = useRef<((target: number) => void) | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const listEl = listRef.current

    if (!listEl) {
      return
    }

    const tiles = Array.from(listEl.children).filter(
      (node): node is HTMLLIElement => node instanceof HTMLLIElement,
    )
    const firstTile = tiles[0]
    const tileCount = tiles.length

    if (!firstTile || tileCount < 2) {
      return
    }

    const referenceTile: HTMLLIElement = firstTile

    gsap.registerPlugin(CustomEase)
    CustomEase.create('depth', 'M0,0 C0.6,0 0,1 1,1')

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const state = { progress: 0 }

    let isHovering = false
    let stepTimeline: gsap.core.Timeline | null = null
    let pendingCall: gsap.core.Tween | null = null

    gsap.set(listEl, { perspective: `${PERSPECTIVE}em` })
    gsap.set(tiles, {
      transformStyle: 'preserve-3d',
      transformPerspective: PERSPECTIVE * 16,
    })

    function getRelativeIndex(index: number) {
      const offset = index - state.progress
      const wrapped =
        ((((offset + tileCount / 2) % tileCount) + tileCount) % tileCount) - tileCount / 2

      return gsap.utils.clamp(-VISIBLE_DEPTH, VISIBLE_DEPTH, wrapped)
    }

    function getActiveIndex() {
      return ((Math.round(state.progress) % tileCount) + tileCount) % tileCount
    }

    function renderDepth() {
      const radiusX = referenceTile.offsetWidth * X_MULTIPLIER

      tiles.forEach((tile, index) => {
        const relative = getRelativeIndex(index)
        const angle = (relative / 2) * Math.PI
        const orbitDepth = (Math.cos(angle) + 1) / 2
        const isBehind = relative <= -VISIBLE_DEPTH || relative >= VISIBLE_DEPTH

        gsap.set(tile, {
          x: isBehind ? 0 : Math.sin(angle) * radiusX,
          scale: gsap.utils.interpolate(BACK_SCALE, 1, orbitDepth),
          rotateY: Math.sin(angle) * -SIDE_ROTATE_Y,
          zIndex: Math.round(gsap.utils.interpolate(1, 1000, orbitDepth)),
        })
      })
    }

    function stopAuto() {
      pendingCall?.kill()
      pendingCall = null
    }

    function scheduleNext() {
      stopAuto()

      if (prefersReducedMotion || isHovering) {
        return
      }

      pendingCall = gsap.delayedCall(PAUSE_DURATION, () => goBy(1, false))
    }

    function goBy(delta: number, fromUser: boolean) {
      if (!delta) {
        return
      }

      if (fromUser) {
        stopAuto()
      } else if (isHovering) {
        return
      }

      stepTimeline?.kill()

      const duration = prefersReducedMotion
        ? 0
        : MOVE_DURATION * Math.min(1.2, 0.82 + 0.18 * Math.abs(delta))

      stepTimeline = gsap.timeline({
        onComplete: () => {
          stepTimeline = null
          setActiveIndex(getActiveIndex())
          scheduleNext()
        },
      })

      stepTimeline.to(state, {
        progress: state.progress + delta,
        duration,
        ease: 'depth',
        onUpdate: () => {
          renderDepth()
          setActiveIndex(getActiveIndex())
        },
      })
    }

    goToIndexRef.current = (target) => {
      const current = ((state.progress % tileCount) + tileCount) % tileCount
      let diff = target - current

      while (diff > tileCount / 2) {
        diff -= tileCount
      }

      while (diff <= -tileCount / 2) {
        diff += tileCount
      }

      if (Math.abs(diff) < 0.02) {
        return
      }

      goBy(diff, true)
    }

    function handlePointerOver(event: PointerEvent) {
      if (!(event.target instanceof Element) || !event.target.closest('li')) {
        return
      }

      isHovering = true
      stopAuto()
      stepTimeline?.pause()
    }

    function handlePointerLeave() {
      isHovering = false

      if (stepTimeline && stepTimeline.progress() < 1) {
        stepTimeline.play()
        return
      }

      scheduleNext()
    }

    listEl.addEventListener('pointerover', handlePointerOver)
    listEl.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('resize', renderDepth)

    renderDepth()

    if (!prefersReducedMotion) {
      pendingCall = gsap.delayedCall(START_DELAY, () => goBy(1, false))
    }

    return () => {
      stopAuto()
      stepTimeline?.kill()
      goToIndexRef.current = null
      listEl.removeEventListener('pointerover', handlePointerOver)
      listEl.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('resize', renderDepth)
    }
  }, [])

  function handleDotClick(index: number) {
    goToIndexRef.current?.(index)
  }

  return (
    <div
      className="mt-14 lg:hidden"
      role="group"
      aria-roledescription="carousel"
      aria-label="Products we supply"
    >
      <ul ref={listRef} className="grid place-items-center">
        {slides.map((slide) => (
          <li
            key={slide.image.src}
            className="col-start-1 row-start-1 flex items-center justify-center"
          >
            <div className="relative aspect-2/3 w-56 overflow-hidden rounded-4xl shadow-2xl shadow-sky-200 sm:w-64">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="(min-width: 640px) 256px, 224px"
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
            onClick={() => handleDotClick(index)}
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
