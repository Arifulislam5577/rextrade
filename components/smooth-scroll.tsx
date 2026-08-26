'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

const ANCHOR_OFFSET = -120

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: ANCHOR_OFFSET },
      stopInertiaOnNavigate: true,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}
