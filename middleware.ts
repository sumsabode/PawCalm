import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/login', '/signup', '/forgot-password']
const DEMO_COOKIE = 'pawcalm_demo'

function isConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  return url.includes('.supabase.co')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip API, auth callback, and static assets
  if (pathname.startsWith('/api/') || pathname.startsWith('/auth/')) {
    return NextResponse.next()
  }

  // Demo mode: redirect unauthenticated users to login
  if (!isConfigured()) {
    if (PUBLIC_PATHS.includes(pathname)) {
      return NextResponse.next()
    }
    const demoCookie = request.cookies.get(DEMO_COOKIE)
    if (!demoCookie?.value) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (PUBLIC_PATHS.includes(pathname)) {
    if (user) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return supabaseResponse
  }

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
