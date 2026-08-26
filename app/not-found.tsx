import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main" className="bg-white">
      <div className="main-container py-28 text-center lg:py-40">
        <p className="eyebrow text-sky-600">Error 404</p>
        <h1 className="font-display text-ink mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          This page does not exist.
        </h1>
        <p className="text-slate-body mx-auto mt-5 max-w-md leading-relaxed">
          The page you asked for is not here. Head back to the home page, or send us your
          requirement and we will come back with a quotation.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="button-primary">
            Back to home
          </Link>
          <Link href="/#contact" className="button-secondary">
            Request a quote
          </Link>
        </div>
      </div>
    </main>
  )
}
