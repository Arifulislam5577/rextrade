import { NextResponse } from 'next/server'

import type { ApiResponse } from '@/types/api'

export function apiSuccess<T>(data: T): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ ok: true, data })
}

export function apiError(
  code: string,
  message: string,
  status: number,
): NextResponse<ApiResponse<never>> {
  return NextResponse.json({ ok: false, error: { code, message } }, { status })
}
