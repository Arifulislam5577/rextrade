import Link from 'next/link'

import { siteConfig } from '@/lib/site-config'

import { homeContent } from '@/data/content'

const CATEGORY_LINK_COUNT = 5

export function SiteFooter() {
  const currentYear = new Date().getUTCFullYear()
  const categories = homeContent.productCategories.categories.slice(0, CATEGORY_LINK_COUNT)

  return (
    <footer className="bg-ink border-t border-white/10">
      <div className="main-container py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="font-display inline-flex size-9 items-center justify-center rounded-xl bg-sky-500 text-base font-extrabold text-white"
              >
                R
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-labelledby="footer-company-heading" className="lg:col-span-3">
            <h2 id="footer-company-heading" className="eyebrow text-white/50">
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {siteConfig.navigation.map((entry) => (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    scroll={false}
                    className="text-sm text-white/70 transition-colors hover:text-sky-300"
                  >
                    {entry.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/70 transition-colors hover:text-sky-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-products-heading" className="lg:col-span-2">
            <h2 id="footer-products-heading" className="eyebrow text-white/50">
              Products
            </h2>
            <ul className="mt-5 space-y-3">
              {categories.map((category) => (
                <li key={category.title}>
                  <Link
                    href="/#products"
                    scroll={false}
                    className="text-sm text-white/70 transition-colors hover:text-sky-300"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="eyebrow text-white/50">Contact</h2>
            <address className="mt-5 space-y-3 not-italic">
              <p className="text-sm leading-relaxed text-white/70">{siteConfig.contact.address}</p>
              <Link
                href={siteConfig.contact.phoneHref}
                className="block text-sm text-white/70 transition-colors hover:text-sky-300"
              >
                {siteConfig.contact.phoneLabel}
              </Link>
              <Link
                href={siteConfig.contact.emailHref}
                className="block text-sm break-all text-white/70 transition-colors hover:text-sky-300"
              >
                {siteConfig.contact.emailLabel}
              </Link>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">
            &copy; <time dateTime={String(currentYear)}>{currentYear}</time> {siteConfig.legalName}.
            All rights reserved.
          </p>
          <p className="text-sm text-white/50">Registered with Dhaka North City Corporation</p>
        </div>
      </div>
    </footer>
  )
}
