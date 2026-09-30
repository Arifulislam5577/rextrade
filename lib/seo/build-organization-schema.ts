import { siteConfig } from '@/lib/site-config'

export type OrganizationSchema = {
  readonly '@context': 'https://schema.org'
  readonly '@type': 'Organization'
  readonly name: string
  readonly legalName: string
  readonly url: string
  readonly logo: string
  readonly email: string
  readonly telephone: readonly string[]
  readonly foundingDate: string
  readonly founder: { readonly '@type': 'Person'; readonly name: string; readonly jobTitle: string }
  readonly address: {
    readonly '@type': 'PostalAddress'
    readonly streetAddress: string
    readonly addressLocality: string
    readonly postalCode: string
    readonly addressCountry: string
  }
}

export function buildOrganizationSchema(): OrganizationSchema {
  const { contact, leadership } = siteConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: new URL('/logo.png', siteConfig.url).toString(),
    email: contact.emailLabel,
    telephone: contact.phones.map((phone) => phone.href.replace('tel:', '')),
    foundingDate: siteConfig.foundedYear,
    founder: { '@type': 'Person', name: leadership.name, jobTitle: leadership.role },
    address: { '@type': 'PostalAddress', ...contact.postalAddress },
  }
}
