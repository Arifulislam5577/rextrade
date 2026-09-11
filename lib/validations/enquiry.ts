export type EnquiryField =
  'name' | 'email' | 'company' | 'phone' | 'category' | 'quantity' | 'details'

export type EnquiryInput = Readonly<Record<EnquiryField, string>>

export type EnquiryErrors = Partial<Record<EnquiryField, string>>

export type EnquiryResult =
  | { readonly ok: true; readonly data: EnquiryInput }
  | { readonly ok: false; readonly errors: EnquiryErrors }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const DETAILS_MIN_LENGTH = 20
const DETAILS_MAX_LENGTH = 4000
const TEXT_MAX_LENGTH = 200

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function collect(read: (field: EnquiryField) => string): EnquiryInput {
  return {
    name: read('name'),
    email: read('email'),
    company: read('company'),
    phone: read('phone'),
    category: read('category'),
    quantity: read('quantity'),
    details: read('details'),
  }
}

function validate(data: EnquiryInput): EnquiryResult {
  const errors: EnquiryErrors = {}

  if (data.name.length === 0) {
    errors.name = 'Tell us who we should reply to.'
  } else if (data.name.length > TEXT_MAX_LENGTH) {
    errors.name = 'That name is too long.'
  }

  if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = 'Enter a work email we can reach you on.'
  }

  if (data.company.length === 0) {
    errors.company = 'Enter your company or organisation.'
  } else if (data.company.length > TEXT_MAX_LENGTH) {
    errors.company = 'That company name is too long.'
  }

  if (data.category.length === 0) {
    errors.category = 'Choose the product category you need.'
  }

  if (data.quantity.length === 0) {
    errors.quantity = 'Choose an approximate order quantity.'
  }

  if (data.details.length < DETAILS_MIN_LENGTH) {
    errors.details = 'Add a little more detail about the requirement.'
  } else if (data.details.length > DETAILS_MAX_LENGTH) {
    errors.details = 'That is longer than we can accept. Please summarise the requirement.'
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return { ok: true, data }
}

export function parseEnquiry(fields: FormData): EnquiryResult {
  return validate(
    collect((field) => {
      const value = fields.get(field)

      return typeof value === 'string' ? value.trim() : ''
    }),
  )
}

export function parseEnquiryPayload(payload: unknown): EnquiryResult {
  if (!isRecord(payload)) {
    return { ok: false, errors: { details: 'Send the enquiry as a JSON object.' } }
  }

  return validate(
    collect((field) => {
      const value = payload[field]

      return typeof value === 'string' ? value.trim() : ''
    }),
  )
}
