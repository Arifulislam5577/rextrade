import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

import type { EnquiryInput } from '@/lib/validations/enquiry'

const LABEL_COLUMN_WIDTH = '150px'

export function EnquiryEmail({ enquiry }: { readonly enquiry: EnquiryInput }) {
  const rows = [
    { label: 'Name', value: enquiry.name },
    { label: 'Company', value: enquiry.company },
    { label: 'Phone', value: enquiry.phone.length > 0 ? enquiry.phone : 'Not provided' },
    { label: 'Category', value: enquiry.category },
    { label: 'Quantity', value: enquiry.quantity },
  ]

  return (
    <Html>
      <Head />
      <Preview>
        {enquiry.company} — {enquiry.category} ({enquiry.quantity})
      </Preview>
      <Tailwind>
        <Body className="bg-[#f2f6fb] font-sans">
          <Container className="mx-auto my-8 max-w-[600px] overflow-hidden rounded-[12px] bg-white">
            <Section className="bg-[#00aaff] px-10 py-6">
              <Text className="m-0 text-[18px] font-bold text-white">New sourcing enquiry</Text>
              <Text className="m-0 mt-1 text-[13px] text-white">
                ReXTrade International — website enquiry form
              </Text>
            </Section>

            <Section className="px-10 pt-8">
              {rows.map((row) => (
                <Row key={row.label} className="mb-2">
                  <Column style={{ width: LABEL_COLUMN_WIDTH }}>
                    <Text className="m-0 text-[13px] font-semibold text-[#0e1526]">
                      {row.label}
                    </Text>
                  </Column>
                  <Column>
                    <Text className="m-0 text-[13px] text-[#56637d]">{row.value}</Text>
                  </Column>
                </Row>
              ))}

              <Row className="mb-2">
                <Column style={{ width: LABEL_COLUMN_WIDTH }}>
                  <Text className="m-0 text-[13px] font-semibold text-[#0e1526]">Email</Text>
                </Column>
                <Column>
                  <Link
                    href={`mailto:${enquiry.email}`}
                    className="text-[13px] break-all text-[#1f86bb]"
                  >
                    {enquiry.email}
                  </Link>
                </Column>
              </Row>
            </Section>

            <Section className="px-10">
              <Hr className="my-6 border-[#dde5f0]" />
              <Text className="m-0 mb-2 text-[13px] font-semibold text-[#0e1526]">Requirement</Text>
              <Text className="m-0 text-[13px] leading-relaxed whitespace-pre-wrap text-[#56637d]">
                {enquiry.details}
              </Text>
              <Hr className="my-6 border-[#dde5f0]" />
            </Section>

            <Section className="px-10 pb-8">
              <Text className="m-0 text-center text-[12px] text-[#56637d]">
                Reply to this email to reach {enquiry.name} directly.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
