import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { siteConfig } from '@/lib/site-config'

export default function NotFound() {
  return (
    <main id="main">
      <section
        aria-labelledby="not-found-heading"
        className="bg-linear-to-b from-sky-50 to-white pt-32 pb-20 lg:pt-44 lg:pb-28"
      >
        <div className="main-container text-center">
          <p
            aria-hidden="true"
            className="font-display text-hairline text-7xl leading-none font-extrabold sm:text-8xl lg:text-9xl"
          >
            404
          </p>

          <p className="eyebrow text-ink/50 mt-8">Page not found</p>
          <h1 id="not-found-heading" className="section-heading mx-auto mt-4 max-w-2xl">
            This page is not <span className="text-sky-500">here.</span>
          </h1>
          <p className="section-lead mx-auto mt-5 max-w-lg">
            The link may be old, or the address mistyped. Head back to the home page, or send us
            your requirement and we will come back with a quotation.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="button-primary">
              Back to home
            </Link>
            <Link href="/contact" className="button-secondary">
              Request a quote
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <nav aria-label="Popular pages" className="mt-16">
            <h2 className="eyebrow text-ink/50">Or try one of these</h2>
            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {siteConfig.navigation.map((entry) => (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    className="border-hairline text-slate-body inline-flex rounded-full border bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-sky-300 hover:text-sky-700"
                  >
                    {entry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  )
}
