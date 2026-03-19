'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import type { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useAppStore } from '@/store'
import {
  demoSignIn,
  getDemoAccountData,
  getDemoSessionEmail,
  setDemoSessionEmail,
  clearDemoSessionEmail,
  setDemoCookie,
  clearDemoCookie,
} from '@/lib/demo/demoStorage'

const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('.supabase.co') ?? false

interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
  signInDemo: (email: string, password: string) => Promise<{
    ok: true
    onboarding_complete: boolean
  } | { ok: false; error: string }>
}

const AuthContext = createContext<AuthState>({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
  signOut: async () => {},
  signInDemo: async () => ({ ok: false, error: 'Demo auth not available.' }),
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const resetStore = useAppStore((s) => s.reset)
  const setDemoAccountEmail = useAppStore((s) => s.setDemoAccountEmail)
  const hydrateDemoAccount = useAppStore((s) => s.hydrateDemoAccount)
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  function buildMockUser(demoEmail: string) {
    // Supabase User type is structural; we cast since this is demo-mode data.
    const data = getDemoAccountData(demoEmail)
    const mock = {
      id: `demo-${demoEmail}`,
      email: data.account.email,
      app_metadata: { provider: 'email' },
      user_metadata: {
        full_name: data.account.fullName,
        onboarding_complete: data.account.onboarding_complete,
      },
      created_at: data.account.memberSinceISO,
    } as unknown as User
    return mock
  }

  useEffect(() => {
    // In demo mode (no Supabase URL/key), we must not initialize the client,
    // otherwise @supabase/ssr throws during createBrowserClient().
    if (!isConfigured) {
      const email = getDemoSessionEmail()
      if (email) {
        const data = getDemoAccountData(email)
        setDemoAccountEmail(email)
        hydrateDemoAccount({
          pets: data.pets,
          activePetId: data.activePetId,
          assessmentHistory: data.assessmentHistory,
        })
        setUser(buildMockUser(email))
        setDemoCookie()
        if (pathname === '/login') {
          router.replace('/')
        }
      }
      setIsLoading(false)
      setSession(null)
      return
    }

    let subscription: { unsubscribe: () => void } | null = null
    try {
      const supabase = createClient()

      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        setIsLoading(false)
      }).catch(() => {
        setIsLoading(false)
      })

      subscription = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session)
          setUser(session?.user ?? null)
          setIsLoading(false)
        }
      ).data.subscription
    } catch {
      setIsLoading(false)
    }

    return () => subscription?.unsubscribe()
  }, [])

  async function signOut() {
    resetStore()

    if (!isConfigured) {
      clearDemoSessionEmail()
      clearDemoCookie()
      router.push('/login')
      return
    }

    const supabase = createClient()
    await supabase.auth.signOut()
    resetStore()
    router.push('/login')
  }

  async function signInDemo(email: string, password: string) {
    if (isConfigured) {
      return { ok: false as const, error: 'Demo auth not available.' }
    }

    setIsLoading(true)
    try {
      const res = demoSignIn(email, password)
      if (!res.ok) return res

      const data = getDemoAccountData(email)
      setDemoAccountEmail(email)
      setDemoSessionEmail(email)
      hydrateDemoAccount({
        pets: data.pets,
        activePetId: data.activePetId,
        assessmentHistory: data.assessmentHistory,
      })
      setUser(buildMockUser(email))
      setSession(null)
      setDemoCookie()
      return { ok: true as const, onboarding_complete: res.onboarding_complete }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated: !!user,
        signOut,
        signInDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
