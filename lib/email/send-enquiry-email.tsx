import { render } from '@react-email/components'
import nodemailer from 'nodemailer'

import { readSmtpCredentials } from '@/lib/env'
import { siteConfig } from '@/lib/site-config'
import type { EnquiryInput } from '@/lib/validations/enquiry'

import { EnquiryEmail } from '@/components/emails/enquiry-email'

export type SendEnquiryResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly code: 'EMAIL_NOT_CONFIGURED' | 'EMAIL_SEND_FAILED' }

function buildPlainText(enquiry: EnquiryInput): string {
  return [
    `Name: ${enquiry.name}`,
    `Company: ${enquiry.company}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone.length > 0 ? enquiry.phone : 'Not provided'}`,
    `Category: ${enquiry.category}`,
    `Quantity: ${enquiry.quantity}`,
    '',
    'Requirement:',
    enquiry.details,
  ].join('\n')
}

export async function sendEnquiryEmail(enquiry: EnquiryInput): Promise<SendEnquiryResult> {
  const credentials = readSmtpCredentials()

  if (!credentials) {
    console.error('Enquiry email skipped: SMTP_EMAIL and SMTP_PASSWORD are not set.')
    return { ok: false, code: 'EMAIL_NOT_CONFIGURED' }
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { user: credentials.user, pass: credentials.password },
  })

  const html = await render(<EnquiryEmail enquiry={enquiry} />)

  try {
    await transporter.sendMail({
      from: `"${siteConfig.name}" <${credentials.user}>`,
      to: credentials.user,
      replyTo: enquiry.email,
      subject: `Sourcing enquiry — ${enquiry.category} — ${enquiry.company}`,
      text: buildPlainText(enquiry),
      html,
    })

    return { ok: true }
  } catch (error) {
    console.error('Enquiry email failed', {
      code: 'EMAIL_SEND_FAILED',
      reason: error instanceof Error ? error.message : 'unknown',
    })

    return { ok: false, code: 'EMAIL_SEND_FAILED' }
  }
}
