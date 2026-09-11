import { apiError, apiSuccess } from '@/lib/api/json-response'
import { isRateLimited, readClientKey } from '@/lib/api/rate-limit'
import { readJsonBody } from '@/lib/api/read-json-body'
import { sendEnquiryEmail } from '@/lib/email/send-enquiry-email'
import { parseEnquiryPayload } from '@/lib/validations/enquiry'

export async function POST(request: Request) {
  if (isRateLimited(readClientKey(request))) {
    return apiError('RATE_LIMITED', 'Too many enquiries. Please try again in a minute.', 429)
  }

  const parsed = parseEnquiryPayload(await readJsonBody(request))

  if (!parsed.ok) {
    return apiError('INVALID_ENQUIRY', 'Some details need correcting.', 400)
  }

  const sent = await sendEnquiryEmail(parsed.data)

  if (!sent.ok) {
    return apiError('ENQUIRY_NOT_SENT', 'We could not send your enquiry. Please email us.', 502)
  }

  return apiSuccess({ received: true })
}
