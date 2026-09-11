'use client'

import { ArrowRight, CheckCircle2, ChevronDown, Loader2, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

import type { EnquiryErrors } from '@/lib/validations/enquiry'
import { parseEnquiry } from '@/lib/validations/enquiry'

import { homeContent } from '@/data/content'

import type { ApiResponse } from '@/types/api'

type SubmitState = 'idle' | 'sending' | 'sent' | 'failed'

const GENERIC_FAILURE = 'We could not send your enquiry. Please email us directly.'

export function ContactForm() {
  const { contact, productCategories } = homeContent
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [failureMessage, setFailureMessage] = useState(GENERIC_FAILURE)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const result = parseEnquiry(new FormData(form))

    if (!result.ok) {
      setSubmitState('idle')
      setErrors(result.errors)
      return
    }

    setErrors({})
    setSubmitState('sending')

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      const payload: ApiResponse<{ received: boolean }> = await response.json()

      if (!payload.ok) {
        setFailureMessage(payload.error.message)
        setSubmitState('failed')
        return
      }

      form.reset()
      setSubmitState('sent')
    } catch {
      setFailureMessage(GENERIC_FAILURE)
      setSubmitState('failed')
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="enquiry-name" className="field-label">
          Full name
        </label>
        <input
          id="enquiry-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          aria-invalid={errors.name !== undefined}
          data-invalid={errors.name === undefined ? undefined : true}
          aria-describedby={errors.name === undefined ? undefined : 'enquiry-name-error'}
          className="field-control mt-2"
        />
        {errors.name === undefined ? null : (
          <p id="enquiry-name-error" className="field-error">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="enquiry-email" className="field-label">
          Work email
        </label>
        <input
          id="enquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={errors.email !== undefined}
          data-invalid={errors.email === undefined ? undefined : true}
          aria-describedby={errors.email === undefined ? undefined : 'enquiry-email-error'}
          className="field-control mt-2"
        />
        {errors.email === undefined ? null : (
          <p id="enquiry-email-error" className="field-error">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="enquiry-company" className="field-label">
          Company or organisation
        </label>
        <input
          id="enquiry-company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Registered or trading name"
          aria-invalid={errors.company !== undefined}
          data-invalid={errors.company === undefined ? undefined : true}
          aria-describedby={errors.company === undefined ? undefined : 'enquiry-company-error'}
          className="field-control mt-2"
        />
        {errors.company === undefined ? null : (
          <p id="enquiry-company-error" className="field-error">
            {errors.company}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="enquiry-phone" className="field-label">
          Phone or WhatsApp <span className="field-optional">(optional)</span>
        </label>
        <input
          id="enquiry-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+880 1700-000000"
          className="field-control mt-2"
        />
      </div>

      <div>
        <label htmlFor="enquiry-category" className="field-label">
          Product category
        </label>
        <div className="relative mt-2">
          <select
            id="enquiry-category"
            name="category"
            defaultValue=""
            aria-invalid={errors.category !== undefined}
            data-invalid={errors.category === undefined ? undefined : true}
            aria-describedby={errors.category === undefined ? undefined : 'enquiry-category-error'}
            className="field-control field-select"
          >
            <option value="">Select a category</option>
            {productCategories.categories.map((category) => (
              <option key={category.title} value={category.title}>
                {category.title}
              </option>
            ))}
            <option value="Mixed or not sure yet">Mixed or not sure yet</option>
          </select>
          <ChevronDown
            aria-hidden="true"
            className="text-slate-body pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
          />
        </div>
        {errors.category === undefined ? null : (
          <p id="enquiry-category-error" className="field-error">
            {errors.category}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="enquiry-quantity" className="field-label">
          Approximate quantity
        </label>
        <div className="relative mt-2">
          <select
            id="enquiry-quantity"
            name="quantity"
            defaultValue=""
            aria-invalid={errors.quantity !== undefined}
            data-invalid={errors.quantity === undefined ? undefined : true}
            aria-describedby={errors.quantity === undefined ? undefined : 'enquiry-quantity-error'}
            className="field-control field-select"
          >
            <option value="">Select a quantity</option>
            {contact.quantities.map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="text-slate-body pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
          />
        </div>
        {errors.quantity === undefined ? null : (
          <p id="enquiry-quantity-error" className="field-error">
            {errors.quantity}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="enquiry-details" className="field-label">
          What do you need supplied?
        </label>
        <textarea
          id="enquiry-details"
          name="details"
          rows={5}
          placeholder="Product, branding, packaging, delivery date and anything else that shapes the quotation."
          aria-invalid={errors.details !== undefined}
          data-invalid={errors.details === undefined ? undefined : true}
          aria-describedby={errors.details === undefined ? undefined : 'enquiry-details-error'}
          className="field-control mt-2 min-h-36 resize-y"
        />
        {errors.details === undefined ? null : (
          <p id="enquiry-details-error" className="field-error">
            {errors.details}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={submitState === 'sending'}
          className="button-primary w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitState === 'sending' ? 'Sending…' : contact.submitLabel}
          {submitState === 'sending' ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <ArrowRight aria-hidden="true" className="size-4" />
          )}
        </button>

        <p aria-live="polite" className="text-slate-body mt-4 text-xs leading-relaxed">
          <FormStatus state={submitState} failureMessage={failureMessage} />
        </p>
      </div>
    </form>
  )
}

function FormStatus({
  state,
  failureMessage,
}: {
  readonly state: SubmitState
  readonly failureMessage: string
}) {
  if (state === 'sent') {
    return (
      <span className="text-ink inline-flex items-center gap-2 font-medium">
        <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-sky-500" />
        Enquiry sent. We will reply within one working day.
      </span>
    )
  }

  if (state === 'failed') {
    return (
      <span className="text-alert-500 inline-flex items-center gap-2 font-medium">
        <TriangleAlert aria-hidden="true" className="size-4 shrink-0" />
        {failureMessage}
      </span>
    )
  }

  return (
    <>
      Your details go straight to our sourcing desk. We never share them with suppliers without your
      say-so.
    </>
  )
}
