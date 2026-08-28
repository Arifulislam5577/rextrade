'use client'

import { ArrowRight, Mail, Phone } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useEffect, useRef } from 'react'

import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils/cn'

const CLOSE_DURATION_MS = 300

export function MobileMenu({
  isOpen,
  onClose,
}: {
  readonly isOpen: boolean
  readonly onClose: () => void
}) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const pendingHrefRef = useRef<string | null>(null)

  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>) {
    const href = event.currentTarget.getAttribute('href')

    if (href?.startsWith('#')) {
      event.preventDefault()
      event.stopPropagation()
      pendingHrefRef.current = href
    }

    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const { body } = document
    const previousOverflow = body.style.overflow

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    sheetRef.current?.focus()

    return () => {
      body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    const href = pendingHrefRef.current

    if (isOpen || !href) {
      return
    }

    pendingHrefRef.current = null

    const timer = window.setTimeout(() => {
      const link = document.createElement('a')
      link.href = href
      link.setAttribute('aria-hidden', 'true')
      link.style.position = 'fixed'
      link.style.opacity = '0'
      document.body.append(link)
      link.click()
      link.remove()
    }, CLOSE_DURATION_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <div className={cn('fixed inset-0 z-50 lg:hidden', isOpen ? '' : 'pointer-events-none')}>
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
        className={cn(
          'bg-ink/50 absolute inset-0 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
      >
        <span className="sr-only">Close menu</span>
      </button>

      <div
        ref={sheetRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        tabIndex={-1}
        data-lenis-prevent=""
        className={cn(
          'absolute inset-x-0 bottom-0 h-3/4 overflow-y-auto rounded-t-4xl bg-white pb-8 shadow-2xl transition-transform duration-300 ease-out focus-visible:outline-none',
          isOpen ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div className="flex justify-center pt-3 pb-1">
          <span aria-hidden="true" className="bg-hairline h-1.5 w-12 rounded-full" />
        </div>

        <nav aria-label="Mobile" className="px-5 pt-2">
          <ul className="divide-hairline/70 divide-y">
            {siteConfig.navigation.map((entry) => (
              <li key={entry.href}>
                <a
                  href={entry.href}
                  onClick={handleLinkClick}
                  className="font-display text-ink flex items-center justify-between py-4 text-lg font-bold transition-colors hover:text-sky-600"
                >
                  {entry.label}
                  <ArrowRight aria-hidden="true" className="text-hairline size-4" />
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" onClick={handleLinkClick} className="button-primary mt-6 w-full">
            Request a quote
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href={siteConfig.contact.phoneHref}
              onClick={handleLinkClick}
              className="text-slate-body flex items-center gap-3 text-sm transition-colors hover:text-sky-700"
            >
              <Phone aria-hidden="true" className="size-4 text-sky-500" />
              {siteConfig.contact.phoneLabel}
            </a>
            <a
              href={siteConfig.contact.emailHref}
              onClick={handleLinkClick}
              className="text-slate-body flex items-center gap-3 text-sm break-all transition-colors hover:text-sky-700"
            >
              <Mail aria-hidden="true" className="size-4 text-sky-500" />
              {siteConfig.contact.emailLabel}
            </a>
          </div>
        </nav>
      </div>
    </div>
  )
}
