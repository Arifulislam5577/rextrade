export const siteConfig = {
  name: 'ReXTrade International',
  legalName: 'ReXTrade International',
  tagline: 'B2B importer & supplier · Dhaka',
  description:
    'B2B importer and supplier of corporate, promotional and institutional products in Bangladesh — gadgets, stationery, leather, wooden, kitchen and houseware goods, customised to your specification.',
  url: 'https://rextradeinternational.com/',
  foundedYear: '2022',
  leadership: {
    name: 'Md. Mehedi Hasan',
    role: 'CEO',
  },
  contact: {
    address: '7/2, Garden Street, Ring Road, Shyamoli, Dhaka-1207, Bangladesh',
    postalAddress: {
      streetAddress: '7/2, Garden Street, Ring Road, Shyamoli',
      addressLocality: 'Dhaka',
      postalCode: '1207',
      addressCountry: 'BD',
    },
    phones: [
      { label: '+880 1762-977488', href: 'tel:+8801762977488' },
      { label: '+880 1841-224920', href: 'tel:+8801841224920' },
    ],
    emailLabel: 'rextrade321@gmail.com',
    emailHref: 'mailto:rextrade321@gmail.com',
    whatsappHref: 'https://wa.me/8801762977488',
  },
  navigation: [
    { label: 'About', href: '/#about' },
    { label: 'Products', href: '/#products' },
    { label: 'Solutions', href: '/#solutions' },
    { label: 'Process', href: '/#process' },
    { label: 'Industries', href: '/#industries' },
  ],
} as const
