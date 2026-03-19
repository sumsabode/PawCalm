import type { HistoryEntry, PetProfile } from '@/store'
import { checkDemoCredentials, getDefaultDemoAccountData, getDemoAccountByEmail } from './demoAccounts'

const DEMO_SESSION_KEY = 'pawcalm_demo_session_v1'
const DEMO_TABLES_KEY = 'pawcalm_demo_tables_v1'
export const DEMO_COOKIE_NAME = 'pawcalm_demo'

type SerializedResolution = Omit<NonNullable<HistoryEntry['resolution']>, 'resolvedAt'> & {
  resolvedAtISO: string
}

type SerializedHistoryEntry = Omit<
  HistoryEntry,
  'createdAt' | 'resolution'
> & {
  createdAtISO: string
  resolution?: SerializedResolution
}

type DemoAccountTable = {
  pets: PetProfile[]
  activePetId: string | null
  assessmentHistory: SerializedHistoryEntry[]
  onboarding_complete: boolean
  updatedAtISO: string
}

type DemoTables = {
  accounts: Record<string, DemoAccountTable>
}

function hasWindow(): boolean {
  return typeof window !== 'undefined'
}

function safeLoadTables(): DemoTables {
  if (!hasWindow()) return { accounts: {} }
  try {
    const raw = window.localStorage.getItem(DEMO_TABLES_KEY)
    if (!raw) return { accounts: {} }
    const parsed = JSON.parse(raw) as DemoTables
    if (!parsed?.accounts) return { accounts: {} }
    return parsed
  } catch {
    return { accounts: {} }
  }
}

function safeSaveTables(tables: DemoTables) {
  if (!hasWindow()) return
  window.localStorage.setItem(DEMO_TABLES_KEY, JSON.stringify(tables))
}

function serializeHistory(history: HistoryEntry[]): SerializedHistoryEntry[] {
  return history.map((e) => {
    const createdAtISO = e.createdAt?.toISOString?.() ?? new Date(e.createdAt).toISOString()
    const resolution = e.resolution
      ? {
          outcome: e.resolution.outcome,
          notes: e.resolution.notes,
          resolvedAtISO: e.resolution.resolvedAt.toISOString(),
        }
      : undefined

    return {
      id: e.id,
      petId: e.petId,
      concernSummary: e.concernSummary,
      recommendation: e.recommendation,
      createdAtISO,
      resolved: e.resolved,
      result: e.result,
      resolution,
    }
  })
}

function deserializeHistory(history: SerializedHistoryEntry[]): HistoryEntry[] {
  return history.map((e) => {
    const resolution = e.resolution
      ? {
          outcome: e.resolution.outcome,
          notes: e.resolution.notes,
          resolvedAt: new Date(e.resolution.resolvedAtISO),
        }
      : undefined

    return {
      id: e.id,
      petId: e.petId,
      concernSummary: e.concernSummary,
      recommendation: e.recommendation,
      createdAt: new Date(e.createdAtISO),
      resolved: e.resolved,
      result: e.result,
      resolution,
    }
  })
}

export function getDemoSessionEmail(): string | null {
  if (!hasWindow()) return null
  try {
    return window.localStorage.getItem(DEMO_SESSION_KEY)
  } catch {
    return null
  }
}

export function setDemoSessionEmail(email: string) {
  if (!hasWindow()) return
  window.localStorage.setItem(DEMO_SESSION_KEY, email)
}

export function clearDemoSessionEmail() {
  if (!hasWindow()) return
  window.localStorage.removeItem(DEMO_SESSION_KEY)
}

/** Set cookie so middleware can recognize demo-authenticated users */
export function setDemoCookie() {
  if (!hasWindow()) return
  document.cookie = `${DEMO_COOKIE_NAME}=1; path=/; max-age=604800` // 7 days
}

/** Clear demo cookie on sign out */
export function clearDemoCookie() {
  if (!hasWindow()) return
  document.cookie = `${DEMO_COOKIE_NAME}=; path=/; max-age=0`
}

export function getDemoAccountData(email: string) {
  const persistedEmail = getDemoAccountByEmail(email)?.email ?? email
  const defaultData = getDefaultDemoAccountData(persistedEmail)

  const tables = safeLoadTables()
  const table = tables.accounts[persistedEmail]
  if (!table) return defaultData

  return {
    account: defaultData.account,
    pets: table.pets,
    activePetId: table.activePetId,
    assessmentHistory: deserializeHistory(table.assessmentHistory),
  }
}

export function persistDemoAccountData(
  email: string,
  data: { pets: PetProfile[]; activePetId: string | null; assessmentHistory: HistoryEntry[] }
) {
  if (!hasWindow()) return
  const account = getDemoAccountByEmail(email)
  if (!account) return

  const tables = safeLoadTables()
  const next: DemoAccountTable = {
    pets: data.pets,
    activePetId: data.activePetId,
    assessmentHistory: serializeHistory(data.assessmentHistory),
    onboarding_complete: account.onboarding_complete,
    updatedAtISO: new Date().toISOString(),
  }

  tables.accounts[email] = next
  safeSaveTables(tables)
}

export function persistDemoAccountOnboardingComplete(email: string, onboarding_complete: boolean) {
  if (!hasWindow()) return
  const tables = safeLoadTables()
  const existing = tables.accounts[email]
  if (!existing) return

  tables.accounts[email] = {
    ...existing,
    onboarding_complete,
    updatedAtISO: new Date().toISOString(),
  }
  safeSaveTables(tables)
}

export function demoSignIn(
  email: string,
  password: string
): { ok: true; onboarding_complete: boolean } | { ok: false; error: string } {
  const account = checkDemoCredentials(email, password)
  if (!account) return { ok: false, error: 'Invalid email or password.' }
  return { ok: true, onboarding_complete: account.onboarding_complete }
}

