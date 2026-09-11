type ContactPageContent = {
  readonly eyebrow: string
  readonly headingLead: string
  readonly headingAccent: string
  readonly lead: string
  readonly metaDescription: string
  readonly nextSteps: {
    readonly eyebrow: string
    readonly headingLead: string
    readonly headingAccent: string
    readonly lead: string
  }
}

export const contactPageContent = {
  eyebrow: 'Contact us',
  headingLead: 'Send us your',
  headingAccent: 'requirement.',
  lead: 'Tell us the product, the quantity and the deadline. We come back with a quotation, or an honest answer that it is not something we can supply well.',
  metaDescription:
    'Request a quotation from ReXTrade International — corporate, promotional and institutional products sourced to your specification, quantity and budget from Dhaka.',
  nextSteps: {
    eyebrow: 'What happens next',
    headingLead: 'Three steps between your brief and a',
    headingAccent: 'quotation.',
    lead: 'Nothing sits in a queue. Here is what we do with the requirement once it reaches us.',
  },
} as const satisfies ContactPageContent
