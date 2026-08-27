export type EnquiryField =
  'name' | 'email' | 'company' | 'phone' | 'category' | 'quantity' | 'details'

export type EnquiryInput = Readonly<Record<EnquiryField, string>>

export type EnquiryErrors = Partial<Record<EnquiryField, string>>

export type EnquiryResult =
  | { readonly ok: true; readonly data: EnquiryInput }
  | { readonly ok: false; readonly errors: EnquiryErrors }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const DETAILS_MIN_LENGTH = 20

function readText(fields: FormData, field: EnquiryField): string {
  const value = fields.get(field)

  return typeof value === 'string' ? value.trim() : ''
}

export function parseEnquiry(fields: FormData): EnquiryResult {
  const data: EnquiryInput = {
    name: readText(fields, 'name'),
    email: readText(fields, 'email'),
    company: readText(fields, 'company'),
    phone: readText(fields, 'phone'),
    category: readText(fields, 'category'),
    quantity: readText(fields, 'quantity'),
    details: readText(fields, 'details'),
  }

  const errors: EnquiryErrors = {}

  if (data.name.length === 0) {
    errors.name = 'Tell us who we should reply to.'
  }

  if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = 'Enter a work email we can reach you on.'
  }

  if (data.company.length === 0) {
    errors.company = 'Enter your company or organisation.'
  }

  if (data.category.length === 0) {
    errors.category = 'Choose the product category you need.'
  }

  if (data.quantity.length === 0) {
    errors.quantity = 'Choose an approximate order quantity.'
  }

  if (data.details.length < DETAILS_MIN_LENGTH) {
    errors.details = 'Add a little more detail about the requirement.'
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return { ok: true, data }
}
