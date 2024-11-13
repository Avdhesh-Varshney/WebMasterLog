import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { fetchUrl } from '@/utils/urlsFetcher'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.match(/\/\d+/)) {
    const id = Number(request.nextUrl.pathname.substring(1))
    const url = await fetchUrl(id)
    if (url) return NextResponse.redirect(new URL(url!))
  }
}
