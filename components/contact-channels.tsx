import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Link from 'next/link'

import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils/cn'

type ContactChannelTone = 'default' | 'on-brand'

const toneClasses = {
  default: {
    chip: 'border-hairline border bg-white text-sky-600 group-hover:border-sky-300',
    link: 'text-ink hover:text-sky-700',
    static: 'text-slate-body',
  },
  'on-brand': {
    chip: 'border border-white/25 bg-white/15 text-white group-hover:bg-white/25',
    link: 'text-white hover:text-white/75',
    static: 'text-white/85',
  },
} as const satisfies Record<ContactChannelTone, Record<string, string>>

const chipBaseClasses =
  'inline-flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors'
const linkBaseClasses = 'group flex items-center gap-3 text-sm font-medium transition-colors'

export function ContactChannels({
  tone = 'default',
  className,
}: {
  readonly tone?: ContactChannelTone
  readonly className?: string
}) {
  const channels = siteConfig.contact
  const classes = toneClasses[tone]

  return (
    <ul className={cn('space-y-4', className)}>
      <li>
        <Link href={channels.emailHref} className={cn(linkBaseClasses, classes.link)}>
          <span aria-hidden="true" className={cn(chipBaseClasses, classes.chip)}>
            <Mail className="size-4" />
          </span>
          {channels.emailLabel}
        </Link>
      </li>
      <li>
        <Link href={channels.phoneHref} className={cn(linkBaseClasses, classes.link)}>
          <span aria-hidden="true" className={cn(chipBaseClasses, classes.chip)}>
            <Phone className="size-4" />
          </span>
          {channels.phoneLabel}
        </Link>
      </li>
      <li>
        <Link
          href={channels.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={cn(linkBaseClasses, classes.link)}
        >
          <span aria-hidden="true" className={cn(chipBaseClasses, classes.chip)}>
            <MessageCircle className="size-4" />
          </span>
          WhatsApp
        </Link>
      </li>
      <li className={cn('flex items-center gap-3 text-sm', classes.static)}>
        <span aria-hidden="true" className={cn(chipBaseClasses, classes.chip)}>
          <MapPin className="size-4" />
        </span>
        {channels.address}
      </li>
    </ul>
  )
}
