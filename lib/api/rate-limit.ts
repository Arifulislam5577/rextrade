const WINDOW_MS = 60_000
const MAX_REQUESTS = 3

const hits = new Map<string, readonly number[]>()

export function isRateLimited(key: string): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((stamp) => now - stamp < WINDOW_MS)

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent)
    return true
  }

  hits.set(key, [...recent, now])
  return false
}

export function readClientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')

  return forwarded?.split(',')[0]?.trim() || 'unknown'
}
