import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { useEffect, useRef, useState } from 'react'

const DRAG_THRESHOLD_PX = 4
const DRAG_PROJECTION_MS = 140
const MAX_SNAP_DURATION = 0.55
const MIN_SNAP_DURATION = 0.3

export type CoverflowOptions = {
  readonly perspective: number
  readonly xMultiplier: number
  readonly visibleDepth: number
  readonly moveDuration: number
  readonly startDelay: number
  readonly pauseDuration: number
  readonly getTileVars: (relative: number, radiusX: number) => gsap.TweenVars
}

export function useCoverflow(options: CoverflowOptions) {
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

    gsap.set(listElement, { perspective: `${options.perspective}em` })
    gsap.set(tiles, {
      transformStyle: 'preserve-3d',
      transformPerspective: options.perspective * 16,
    })

    function getRadiusX() {
      return referenceTile.offsetWidth * options.xMultiplier
    }

    function getRelativeIndex(index: number) {
      const offset = index - state.progress
      const wrapped =
        ((((offset + tileCount / 2) % tileCount) + tileCount) % tileCount) - tileCount / 2

      return gsap.utils.clamp(-options.visibleDepth, options.visibleDepth, wrapped)
    }

    function getActiveIndex() {
      return ((Math.round(state.progress) % tileCount) + tileCount) % tileCount
    }

    function renderDepth() {
      const radiusX = getRadiusX()

      tiles.forEach((tile, index) => {
        gsap.set(tile, options.getTileVars(getRelativeIndex(index), radiusX))
      })
    }

    function getDragUnit() {
      const radiusX = getRadiusX()
      const neighbourX = options.getTileVars(1, radiusX).x

      if (typeof neighbourX !== 'number' || neighbourX === 0) {
        return radiusX
      }

      return Math.abs(neighbourX)
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

      pendingCall = gsap.delayedCall(options.pauseDuration, () => goBy(1, false))
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
        : options.moveDuration * Math.min(1.2, 0.82 + 0.18 * Math.abs(delta))

      animateBy(delta, duration, false)
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

    listElement.addEventListener('pointerover', handlePointerOver)
    listElement.addEventListener('pointerleave', handlePointerLeave)
    listElement.addEventListener('pointerdown', handlePointerDown)
    listElement.addEventListener('pointermove', handlePointerMove)
    listElement.addEventListener('pointerup', handlePointerUp)
    listElement.addEventListener('pointercancel', handlePointerUp)
    window.addEventListener('resize', renderDepth)

    renderDepth()

    if (!prefersReducedMotion) {
      pendingCall = gsap.delayedCall(options.startDelay, () => goBy(1, false))
    }

    return () => {
      stopAuto()
      stepTimeline?.kill()
      goToIndexRef.current = null
      listElement.removeEventListener('pointerover', handlePointerOver)
      listElement.removeEventListener('pointerleave', handlePointerLeave)
      listElement.removeEventListener('pointerdown', handlePointerDown)
      listElement.removeEventListener('pointermove', handlePointerMove)
      listElement.removeEventListener('pointerup', handlePointerUp)
      listElement.removeEventListener('pointercancel', handlePointerUp)
      window.removeEventListener('resize', renderDepth)
    }
  }, [options])

  function goToIndex(index: number) {
    goToIndexRef.current?.(index)
  }

  return { listRef, activeIndex, goToIndex }
}
