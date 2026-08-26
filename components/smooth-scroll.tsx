'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect } from 'react'

const ANCHOR_OFFSET = -120
const MILLISECONDS_PER_SECOND = 1000
const DEFAULT_LAG_THRESHOLD = 500
const DEFAULT_LAG_ADJUSTED_LAG = 33

export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      anchors: { offset: ANCHOR_OFFSET },
      stopInertiaOnNavigate: true,
    })

    function advanceLenis(time: number) {
      lenis.raf(time * MILLISECONDS_PER_SECOND)
    }

    function syncScrollTrigger() {
      ScrollTrigger.update()
    }

    lenis.on('scroll', syncScrollTrigger)
    gsap.ticker.add(advanceLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', syncScrollTrigger)
      gsap.ticker.remove(advanceLenis)
      gsap.ticker.lagSmoothing(DEFAULT_LAG_THRESHOLD, DEFAULT_LAG_ADJUSTED_LAG)
      lenis.destroy()
    }
  }, [])

  return null
}
