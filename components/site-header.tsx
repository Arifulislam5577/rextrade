'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { isSamePageHash } from '@/lib/navigation/is-same-page-hash'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils/cn'

import { MobileMenu } from '@/components/mobile-menu'
import logo from '@/public/logo.png'
import Image from 'next/image'

const SCROLL_THRESHOLD = 24

export function SiteHeader() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    const initialFrame = requestAnimationFrame(handleScroll)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(initialFrame)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function handleMenuToggle() {
    setIsMenuOpen((wasOpen) => !wasOpen)
  }

  function handleMenuClose() {
    setIsMenuOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 z-40 transition-[top] duration-300 ease-out motion-reduce:transition-none',
        isScrolled ? 'top-2.5' : 'top-4 lg:top-6',
      )}
    >
      <div className="main-container">
        <div className="relative flex h-15 items-center justify-between gap-6 rounded-full px-2.5 lg:h-17 lg:px-4">
          <Link href="/" className="w-full max-w-36" onClick={handleMenuClose}>
            <Image src={logo} alt="Logo" className="h-full w-full object-cover" />
          </Link>

          <div className="flex items-center gap-6 lg:gap-8">
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {siteConfig.navigation.map((entry) => (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      scroll={!isSamePageHash(entry.href, pathname)}
                      className="text-slate-body text-sm font-medium transition-colors hover:text-sky-700"
                    >
                      {entry.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link href="/contact" className="button-primary hidden lg:inline-flex">
              Contact Us
            </Link>

            <button
              type="button"
              onClick={handleMenuToggle}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className={cn(
                'inline-flex size-11 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 lg:hidden',
                isMenuOpen
                  ? 'border-sky-300 bg-sky-50 text-sky-700'
                  : 'border-hairline/50 text-ink bg-white',
              )}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </header>
  )
}
