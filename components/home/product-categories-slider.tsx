'use client'

import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { iconRegistry } from '@/lib/icons'
import { cn } from '@/lib/utils/cn'

import type { HomeContent } from '@/data/content'

const X_MULTIPLIER = 0.95
const BACK_SCALE = 0.68
const SIDE_ROTATE_Y = 7
const PERSPECTIVE = 75
const MOVE_DURATION = 1.6
const START_DELAY = 0.9
const PAUSE_DURATION = 1.4
const VISIBLE_DEPTH = 2
const DRAG_THRESHOLD_PX = 4
const DRAG_PROJECTION_MS = 140
const MAX_SNAP_DURATION = 0.55
const MIN_SNAP_DURATION = 0.3

type ProductCategories = HomeContent['productCategories']['categories']

export function ProductCategoriesSlider({
  categories,
}: {
  readonly categories: ProductCategories
}) {
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
    const listElement: HTMLUListElement = listEl

    gsap.registerPlugin(CustomEase)
    CustomEase.create('depth', 'M0,0 C0.6,0 0,1 1,1')

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const state = { progress: 0 }

    let isHovering = false
    let isSettling = false
    let isDragging = false
    let activePointerId: number | null = null
    let dragStartX = 0
    let dragStartProgress = 0
    let lastDragX = 0
    let lastDragTime = 0
    let dragVelocity = 0
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
        const angle = (relative / VISIBLE_DEPTH) * (Math.PI / 2)
        const orbitDepth = Math.cos(angle)

        gsap.set(tile, {
          x: Math.sin(angle) * radiusX,
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

    function animateBy(delta: number, duration: number, isSnap: boolean) {
      stepTimeline?.kill()
      isSettling = isSnap

      stepTimeline = gsap.timeline({
        onComplete: () => {
          stepTimeline = null
          isSettling = false
          setActiveIndex(getActiveIndex())
          scheduleNext()
        },
      })

      stepTimeline.to(state, {
        progress: state.progress + delta,
        duration,
        ease: isSnap ? 'power3.out' : 'depth',
        onUpdate: () => {
          renderDepth()
          setActiveIndex(getActiveIndex())
        },
      })
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

      const duration = prefersReducedMotion
        ? 0
        : MOVE_DURATION * Math.min(1.2, 0.82 + 0.18 * Math.abs(delta))

      animateBy(delta, duration, false)
    }

    function getDragUnit() {
      return (
        Math.sin((1 / VISIBLE_DEPTH) * (Math.PI / 2)) * referenceTile.offsetWidth * X_MULTIPLIER
      )
    }

    function settleFromDrag() {
      const projected = state.progress - (dragVelocity * DRAG_PROJECTION_MS) / getDragUnit()
      const delta = Math.round(projected) - state.progress

      if (Math.abs(delta) < 0.001) {
        setActiveIndex(getActiveIndex())
        scheduleNext()
        return
      }

      const duration = prefersReducedMotion
        ? 0
        : gsap.utils.clamp(
            MIN_SNAP_DURATION,
            MAX_SNAP_DURATION,
            Math.abs(delta) * MAX_SNAP_DURATION,
          )

      animateBy(delta, duration, true)
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return
      }

      activePointerId = event.pointerId
      isDragging = false
      dragStartX = event.clientX
      dragStartProgress = state.progress
      lastDragX = event.clientX
      lastDragTime = event.timeStamp
      dragVelocity = 0

      stopAuto()
      stepTimeline?.kill()
      stepTimeline = null
      isSettling = false
    }

    function handlePointerMove(event: PointerEvent) {
      if (activePointerId !== event.pointerId) {
        return
      }

      const distance = event.clientX - dragStartX

      if (!isDragging) {
        if (Math.abs(distance) < DRAG_THRESHOLD_PX) {
          return
        }

        isDragging = true
        listElement.setPointerCapture(event.pointerId)
      }

      const elapsed = event.timeStamp - lastDragTime

      if (elapsed > 0) {
        dragVelocity = (event.clientX - lastDragX) / elapsed
        lastDragX = event.clientX
        lastDragTime = event.timeStamp
      }

      state.progress = dragStartProgress - distance / getDragUnit()
      renderDepth()
      setActiveIndex(getActiveIndex())
    }

    function handlePointerUp(event: PointerEvent) {
      if (activePointerId !== event.pointerId) {
        return
      }

      activePointerId = null

      if (!isDragging) {
        scheduleNext()
        return
      }

      isDragging = false

      if (listElement.hasPointerCapture(event.pointerId)) {
        listElement.releasePointerCapture(event.pointerId)
      }

      settleFromDrag()
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
      if (isDragging || !(event.target instanceof Element) || !event.target.closest('li')) {
        return
      }

      isHovering = true
      stopAuto()

      if (!isSettling) {
        stepTimeline?.pause()
      }
    }

    function handlePointerLeave() {
      isHovering = false

      if (isDragging || isSettling) {
        return
      }

      if (stepTimeline && stepTimeline.progress() < 1) {
        stepTimeline.play()
        return
      }

      scheduleNext()
    }

    listEl.addEventListener('pointerover', handlePointerOver)
    listEl.addEventListener('pointerleave', handlePointerLeave)
    listEl.addEventListener('pointerdown', handlePointerDown)
    listEl.addEventListener('pointermove', handlePointerMove)
    listEl.addEventListener('pointerup', handlePointerUp)
    listEl.addEventListener('pointercancel', handlePointerUp)
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
      listEl.removeEventListener('pointerdown', handlePointerDown)
      listEl.removeEventListener('pointermove', handlePointerMove)
      listEl.removeEventListener('pointerup', handlePointerUp)
      listEl.removeEventListener('pointercancel', handlePointerUp)
      window.removeEventListener('resize', renderDepth)
    }
  }, [])

  function handleDotClick(index: number) {
    goToIndexRef.current?.(index)
  }

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
                  <h3 className="font-display text-2xl font-bold text-white">{category.title}</h3>
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
            onClick={() => handleDotClick(index)}
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
