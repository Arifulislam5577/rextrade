import { siteConfig } from '@/lib/site-config'
import type { EnquiryInput } from '@/lib/validations/enquiry'

export function buildEnquiryMailto(enquiry: EnquiryInput): string {
  const subject = `Sourcing enquiry — ${enquiry.category} — ${enquiry.company}`

  const body = [
    `Name: ${enquiry.name}`,
    `Company: ${enquiry.company}`,
    `Email: ${enquiry.email}`,
    `Phone / WhatsApp: ${enquiry.phone.length > 0 ? enquiry.phone : 'Not provided'}`,
    `Product category: ${enquiry.category}`,
    `Approximate quantity: ${enquiry.quantity}`,
    '',
    'Requirement:',
    enquiry.details,
  ].join('\n')

  return `${siteConfig.contact.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
