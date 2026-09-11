export function isSamePageHash(href: string, pathname: string): boolean {
  return href.startsWith(`${pathname}#`)
}
