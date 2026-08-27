import type { StaticImageData } from 'next/image'

import type { IconName } from '@/lib/icons'

import aboutPrimary from '@/public/images/about-us-1.png'
import aboutSecondary from '@/public/images/about-us-2.png'
import airpods from '@/public/images/airpods.jpg'
import customizeGift from '@/public/images/customize-gift.jpg'
import desk from '@/public/images/desk.jpg'
import fabrics from '@/public/images/fabrics.jpg'
import fan from '@/public/images/fan.jpg'
import gadgets from '@/public/images/gadgets.jpg'
import houseware from '@/public/images/houseware.jpg'
import kitchen from '@/public/images/kitchen.jpg'
import leather from '@/public/images/lether.jpg'
import office from '@/public/images/office.jpg'
import pens from '@/public/images/pens.jpg'
import powerBank from '@/public/images/power-bank.jpg'
import promotional from '@/public/images/promotional.jpg'
import watch from '@/public/images/watch.jpg'
import waterBottle from '@/public/images/water-bottle.jpg'
import woodenProduct from '@/public/images/wooden-product.jpg'
import wooden from '@/public/images/wooden.jpg'

type LinkTarget = {
  readonly label: string
  readonly href: string
}

type IconCard = {
  readonly icon: IconName
  readonly title: string
  readonly body: string
}

type NumberedStep = {
  readonly number: string
  readonly icon: IconName
  readonly title: string
  readonly body: string
}

export type HeroImageRatio = '4/5' | '7/5' | '6/5' | '3/2' | '3/4' | '2/3' | '9/10' | '16/9'

export type HomeContent = {
  readonly hero: {
    readonly badge: string
    readonly headingLead: string
    readonly headingAccent: string
    readonly lead: string
    readonly primaryCta: LinkTarget
    readonly secondaryCta: LinkTarget
    readonly footnote: string
    readonly gallery: readonly {
      readonly name: string
      readonly items: readonly {
        readonly image: StaticImageData
        readonly alt: string
        readonly ratio: HeroImageRatio
      }[]
    }[]
  }
  readonly trustStrip: {
    readonly eyebrow: string
    readonly heading: string
    readonly lead: string
    readonly cards: readonly (IconCard & { readonly cta: LinkTarget })[]
  }
  readonly whoWeAre: {
    readonly eyebrow: string
    readonly heading: string
    readonly paragraphs: readonly string[]
    readonly stats: readonly { readonly value: string; readonly label: string }[]
    readonly images: readonly { readonly image: StaticImageData; readonly alt: string }[]
    readonly cta: LinkTarget
  }
  readonly productCategories: {
    readonly eyebrow: string
    readonly heading: string
    readonly lead: string
    readonly categories: readonly (IconCard & { readonly image: StaticImageData })[]
  }
  readonly featured: {
    readonly eyebrow: string
    readonly heading: string
    readonly note: string
    readonly products: readonly {
      readonly icon: IconName
      readonly name: string
      readonly image: StaticImageData
      readonly alt: string
    }[]
  }
  readonly customization: {
    readonly steps: readonly {
      readonly number: string
      readonly title: string
      readonly note: string
    }[]
    readonly closing: string
  }
  readonly giftSolutions: {
    readonly eyebrow: string
    readonly heading: string
    readonly lead: string
    readonly solutions: readonly IconCard[]
  }
  readonly supplyProcess: {
    readonly eyebrow: string
    readonly heading: string
    readonly lead: string
    readonly steps: readonly NumberedStep[]
    readonly chain: readonly string[]
  }
  readonly industries: {
    readonly eyebrow: string
    readonly heading: string
    readonly lead: string
    readonly sectors: readonly IconCard[]
    readonly invitation: {
      readonly title: string
      readonly body: string
      readonly cta: LinkTarget
    }
  }
  readonly whyChooseUs: {
    readonly eyebrow: string
    readonly heading: string
    readonly lead: string
    readonly points: readonly IconCard[]
  }
  readonly contact: {
    readonly eyebrow: string
    readonly heading: string
    readonly lead: string
    readonly directHeading: string
    readonly directLead: string
    readonly quantities: readonly string[]
    readonly submitLabel: string
  }
  readonly finalCta: {
    readonly eyebrow: string
    readonly heading: string
    readonly lead: string
    readonly primaryCtaLabel: string
    readonly secondaryCtaLabel: string
  }
}

export const homeContent = {
  hero: {
    badge: 'importer & supplier',
    headingLead: 'All kind of gift items, sourced to your',
    headingAccent: 'specification',
    lead: 'We import and supply corporate, promotional and institutional products — gadgets, stationery, leather, wooden, kitchen and houseware goods — customised to your requirement, quantity and budget.',
    primaryCta: { label: 'Request a quote', href: '#contact' },
    secondaryCta: { label: 'Browse products', href: '#products' },
    footnote:
      'Serving pharmaceuticals, hospitals, banks, NGOs, government bodies and corporates since 2022.',
    gallery: [
      {
        name: 'left',
        items: [
          { image: watch, alt: 'Branded smart watch', ratio: '4/5' },
          { image: wooden, alt: 'Executive desk organiser', ratio: '7/5' },
        ],
      },
      {
        name: 'left-inner',
        items: [{ image: fan, alt: 'Rechargeable hand fan', ratio: '2/3' }],
      },
      {
        name: 'centre',
        items: [{ image: pens, alt: 'Metal pen set', ratio: '3/4' }],
      },
      {
        name: 'right-inner',
        items: [{ image: waterBottle, alt: 'Vacuum flask', ratio: '2/3' }],
      },
      {
        name: 'right',
        items: [
          { image: powerBank, alt: 'Branded power bank', ratio: '9/10' },
          { image: airpods, alt: 'Branded wireless earbuds', ratio: '16/9' },
        ],
      },
    ],
  },
  trustStrip: {
    eyebrow: 'How we work',
    heading: 'Three things decide how a supply order goes.',
    lead: 'Where the goods come from, what we can do to them, and whether they arrive on the date you need. Everything else is detail — and these three are the ones worth checking before you place an order with anybody.',
    cards: [
      {
        icon: 'badge-check',
        title: 'Registered and importing directly',
        body: 'Registered with Dhaka North City Corporation and importing directly since 2022 — no middle layers.',
        cta: { label: 'About the company', href: '#about' },
      },
      {
        icon: 'palette',
        title: 'Customised to your specification',
        body: 'Logo printing, engraving, embossing and packaging — arranged in-house to your brand guidelines.',
        cta: { label: 'See the process', href: '#process' },
      },
      {
        icon: 'delivery',
        title: 'Bulk capacity, delivered nationwide',
        body: 'Institutional volume on a schedule set by your event date, to one address or many.',
        cta: { label: 'Request a quote', href: '#contact' },
      },
    ],
  },
  whoWeAre: {
    eyebrow: 'Who we are',
    heading: 'Simpler for corporate and institutional buyers.',
    paragraphs: [
      'ReXTrade International is a B2B importer and supplier of corporate, promotional and institutional products. Instead of selling from a fixed catalogue, we source against your specification — the right product, in the right quantity, within your budget.',
      'Our clients are pharmaceutical companies, hospitals, NGOs, government and non-government organisations, banks, cement companies and corporate houses across Bangladesh.',
    ],
    stats: [
      { value: '09', label: 'Product categories' },
      { value: '07', label: 'Industries served' },
      { value: '2022', label: 'Trading since' },
    ],
    images: [
      { image: aboutPrimary, alt: 'Colleagues reviewing an order together around a meeting table' },
      { image: aboutSecondary, alt: 'A team working through requirements at a shared desk' },
    ],
    cta: { label: 'More about the company', href: '#why-choose-us' },
  },
  productCategories: {
    eyebrow: 'What we supply',
    heading: 'Nine categories, one supplier.',
    lead: 'Everything below can be branded, boxed and delivered as a single order — so you are not managing five vendors for one campaign.',
    categories: [
      {
        icon: 'smartphone',
        title: 'Gadgets & Electronics',
        image: gadgets,
        body: 'Power banks, earbuds, smart watches, chargers and desk tech.',
      },
      {
        icon: 'stationery',
        title: 'Stationery & Office',
        image: office,
        body: 'Pens, diaries, notebooks, desk clocks and office essentials.',
      },
      {
        icon: 'shirt',
        title: 'Fabrics & Textile',
        image: fabrics,
        body: 'Apparel, uniforms, tote bags and printed textile products.',
      },
      {
        icon: 'wallet',
        title: 'Leather Products',
        image: leather,
        body: 'Wallets, cardholders, folders, belts and executive leather sets.',
      },
      {
        icon: 'wood',
        title: 'Wooden Products',
        image: woodenProduct,
        body: 'Crests, plaques, desk organisers, wall racks and décor pieces.',
      },
      {
        icon: 'cooking-pot',
        title: 'Kitchen Items',
        image: kitchen,
        body: 'Cookers, flasks, mugs, tumblers and small kitchen appliances.',
      },
      {
        icon: 'house',
        title: 'Houseware Products',
        image: houseware,
        body: 'Storage, baskets, home textiles and everyday household goods.',
      },
      {
        icon: 'megaphone',
        title: 'Promotional Items',
        image: promotional,
        body: 'Logo mugs, pens, keyrings, caps and campaign giveaways.',
      },
      {
        icon: 'gift',
        title: 'Customized Gift Sets',
        image: customizeGift,
        body: 'Boxed executive sets built to your brand and budget.',
      },
    ],
  },
  featured: {
    eyebrow: 'Recently supplied',
    heading: 'A sample of what moves most.',
    note: 'Every item shown can be branded and packaged to your specification.',
    products: [
      {
        icon: 'desk-set',
        name: 'Executive desk set',
        image: desk,
        alt: 'Branded executive desk set laid out on a wooden office desk',
      },
      {
        icon: 'flask',
        name: 'Vacuum flask',
        image: waterBottle,
        alt: 'Stainless steel vacuum flask ready for logo printing',
      },
      {
        icon: 'pen-set',
        name: 'Metal pen set',
        image: pens,
        alt: 'Metal pens arranged in a presentation gift box',
      },
      {
        icon: 'watch',
        name: 'Smart watch',
        image: watch,
        alt: 'Smart watch supplied as a corporate gift item',
      },
      {
        icon: 'earbuds',
        name: 'Wireless earbuds',
        image: airpods,
        alt: 'Wireless earbuds in their charging case',
      },
      {
        icon: 'speaker',
        name: 'Bluetooth speaker',
        image: gadgets,
        alt: 'Portable Bluetooth speaker among promotional gadgets',
      },
      {
        icon: 'power-bank',
        name: 'Power bank',
        image: powerBank,
        alt: 'Portable power bank prepared for corporate branding',
      },
      {
        icon: 'fan',
        name: 'Rechargeable hand fan',
        image: fan,
        alt: 'Rechargeable handheld fan supplied in bulk',
      },
    ],
  },
  customization: {
    steps: [
      { number: '01', title: 'Your requirement', note: 'Product, quantity, budget, deadline' },
      { number: '02', title: 'Our sourcing', note: 'Suppliers, samples, branding, checks' },
      { number: '03', title: 'Your customised product', note: 'Boxed, branded, delivered' },
    ],
    closing:
      'Logo printing, laser engraving, embossing, custom packaging and full gift-set assembly — arranged in-house against your artwork and brand guidelines.',
  },
  giftSolutions: {
    eyebrow: 'Corporate gift solutions',
    heading: 'Built around the reason you are buying.',
    lead: 'A conference giveaway, an executive gift and a tender supply are three different jobs. We scope each one separately.',
    solutions: [
      {
        icon: 'gift',
        title: 'Corporate & executive gifts',
        body: 'Considered gift items for clients, employees, business partners and management.',
      },
      {
        icon: 'megaphone',
        title: 'Promotional & branding items',
        body: 'Products designed to carry your brand through a campaign, launch or trade event.',
      },
      {
        icon: 'palette',
        title: 'Branded & personalised products',
        body: 'Customised with your organisation name, logo, colours, packaging or artwork.',
      },
      {
        icon: 'briefcase',
        title: 'Office & lifestyle items',
        body: 'Practical gadgets, stationery, leather, wooden, kitchen and houseware goods.',
      },
      {
        icon: 'calendar',
        title: 'Event & institutional gifts',
        body: 'For seminars, conferences, meetings, campaigns, annual programmes and AGMs.',
      },
      {
        icon: 'boxes',
        title: 'Bulk & tender supply',
        body: 'Large-volume institutional orders with documentation and scheduled delivery.',
      },
    ],
  },
  supplyProcess: {
    eyebrow: 'Our supply process',
    heading: 'Six steps, and you know where the order stands at each one.',
    lead: 'Most sourcing problems come from a vague brief and a silent middle stage. This is how we avoid both.',
    steps: [
      {
        number: '01',
        icon: 'clipboard',
        title: 'Requirement & product selection',
        body: 'We take your brief — product type, quantity, budget, deadline — and shortlist what actually fits.',
      },
      {
        number: '02',
        icon: 'search',
        title: 'Sourcing & procurement',
        body: 'Products are sourced from vetted suppliers against the specification you approve.',
      },
      {
        number: '03',
        icon: 'palette',
        title: 'Product customization',
        body: 'Logo printing, engraving, embossing, custom packaging and gift-set assembly.',
      },
      {
        number: '04',
        icon: 'shield',
        title: 'Quality & order verification',
        body: 'Specification, quantity and finish are checked against the order before anything ships.',
      },
      {
        number: '05',
        icon: 'ship',
        title: 'Import & supply management',
        body: 'We handle procurement and import-related processes for bulk and institutional orders.',
      },
      {
        number: '06',
        icon: 'delivery',
        title: 'Delivery & client support',
        body: 'Organised delivery on schedule, with a single point of contact throughout.',
      },
    ],
    chain: ['Requirement', 'Sourcing', 'Customization', 'Verification', 'Import', 'Delivery'],
  },
  industries: {
    eyebrow: 'Industries served',
    heading: 'Who we supply.',
    lead: 'Seven sectors that buy in volume, each with a procurement process we already know how to work inside.',
    sectors: [
      {
        icon: 'pill',
        title: 'Pharmaceutical companies',
        body: 'Corporate gifts, promotional products, stationery, gadgets and customised items.',
      },
      {
        icon: 'stethoscope',
        title: 'Hospitals & healthcare',
        body: 'Institutional supplies, promotional items, houseware, gadgets and custom products.',
      },
      {
        icon: 'landmark',
        title: 'Government organisations',
        body: 'Institutional procurement, official gifts, promotional items and customised supplies.',
      },
      {
        icon: 'handshake',
        title: 'NGOs & development',
        body: 'Corporate and organisational products tailored to programme requirements.',
      },
      {
        icon: 'banknote',
        title: 'Banks & financial institutions',
        body: 'Corporate gifts, promotional merchandise, office items and branded products.',
      },
      {
        icon: 'hard-hat',
        title: 'Cement & construction',
        body: 'Corporate gifts, promotional items, safety merchandise and institutional supplies.',
      },
      {
        icon: 'building',
        title: 'Corporate & business',
        body: 'Customised products and bulk supply for employees, clients, events and campaigns.',
      },
    ],
    invitation: {
      title: 'Not on this list?',
      body: 'We supply any organisation buying in volume. Send the requirement and we will tell you honestly whether we are the right fit for it.',
      cta: { label: 'Send your requirement', href: '#contact' },
    },
  },
  whyChooseUs: {
    eyebrow: 'Why choose us',
    heading: 'What you actually get by working with us.',
    lead: 'No claims we cannot back on an order. These are the six things clients come back for.',
    points: [
      {
        icon: 'boxes',
        title: 'Wide product range',
        body: 'Nine categories under one supplier — fewer vendors to manage per order.',
      },
      {
        icon: 'sliders',
        title: 'Customized sourcing',
        body: 'We source to your specification instead of pushing a fixed catalogue.',
      },
      {
        icon: 'pricing',
        title: 'Competitive pricing',
        body: 'Direct import and supplier relationships keep bulk pricing workable.',
      },
      {
        icon: 'warehouse',
        title: 'Bulk & institutional capacity',
        body: 'Built for large-volume orders, not one-off retail purchases.',
      },
      {
        icon: 'shield',
        title: 'Quality-focused procurement',
        body: 'Specification and finish verified before the order leaves us.',
      },
      {
        icon: 'delivery',
        title: 'Timely, organised delivery',
        body: 'Scheduled against your event or programme date, nationwide.',
      },
    ],
  },
  contact: {
    eyebrow: 'Get in touch',
    heading: 'Tell us what you need to source.',
    lead: 'Share the product, the quantity, the branding you want on it and the date you need it by. We come back with a quotation, samples where they help, and a delivery schedule you can plan around.',
    directHeading: 'Reach us directly',
    directLead: 'Prefer to talk it through first? We answer enquiries within one working day.',
    quantities: [
      'Under 100 units',
      '100 - 500 units',
      '500 - 2,000 units',
      '2,000 - 10,000 units',
      'More than 10,000 units',
    ],
    submitLabel: 'Send your enquiry',
  },
  finalCta: {
    eyebrow: 'Get in touch',
    heading: 'Send us your requirement.',
    lead: 'Tell us the product, quantity, branding and the date you need it by. We will come back with a quotation and a realistic schedule.',
    primaryCtaLabel: 'Request a quote',
    secondaryCtaLabel: 'Message on WhatsApp',
  },
} as const satisfies HomeContent
