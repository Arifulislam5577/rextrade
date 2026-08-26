'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils/cn'

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleMenuToggle() {
    setIsMenuOpen((wasOpen) => !wasOpen)
  }

  function handleMenuClose() {
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-4 z-40 lg:top-6">
      <div className="main-container">
        <div className="relative flex h-15 items-center justify-between gap-6 rounded-full bg-white px-3 lg:h-17 lg:px-4">
          <Link href="/" className="flex items-center gap-3" onClick={handleMenuClose}>
            <span
              aria-hidden="true"
              className="font-display inline-flex size-6.5 items-center justify-center rounded-xl bg-sky-500 text-base font-extrabold text-white"
            >
              R
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-ink text-sm font-medium tracking-tight">
                ReXTrade
              </span>
              <span className="eyebrow text-slate-body mt-1 text-xs">International</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {siteConfig.navigation.map((entry) => (
                <li key={entry.href}>
                  <a
                    href={entry.href}
                    className="text-slate-body text-sm font-medium transition-colors hover:text-sky-700"
                  >
                    {entry.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#contact" className="button-primary hidden lg:inline-flex">
            Request a quote
          </a>

          <button
            type="button"
            onClick={handleMenuToggle}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className={cn(
              'inline-flex size-11 items-center justify-center rounded-xl border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 lg:hidden',
              isMenuOpen
                ? 'border-sky-300 bg-sky-50 text-sky-700'
                : 'border-hairline text-ink bg-white',
            )}
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {isMenuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>

          <div
            id="mobile-navigation"
            hidden={!isMenuOpen}
            className="border-hairline absolute inset-x-0 top-full mt-2 rounded-2xl border bg-white shadow-lg shadow-sky-100 lg:hidden"
          >
            <nav aria-label="Mobile" className="px-4 py-4">
              <ul className="flex flex-col">
                {siteConfig.navigation.map((entry) => (
                  <li key={entry.href}>
                    <a
                      href={entry.href}
                      onClick={handleMenuClose}
                      className="border-hairline font-display text-ink block border-b py-4 text-lg font-semibold transition-colors hover:text-sky-700"
                    >
                      {entry.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#contact" onClick={handleMenuClose} className="button-primary mt-6 w-full">
                Request a quote
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
