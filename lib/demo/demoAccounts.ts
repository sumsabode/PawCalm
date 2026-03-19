import type { HistoryEntry, PetProfile, Recommendation } from '@/store'
import { MOCK_HISTORY } from '@/lib/mockHistory'
import { MOCK_CAT_PROFILE } from '@/lib/mockCatProfile'
import { MOCK_DOG_PROFILE } from '@/lib/mockDogProfile'

export interface DemoAccount {
  email: string
  password: string
  fullName: string
  memberSinceISO: string
  onboarding_complete: boolean
}

export interface DemoAccountData {
  account: DemoAccount
  pets: PetProfile[]
  activePetId: string | null
  assessmentHistory: HistoryEntry[]
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: 'demo1@pawcalm.test',
    password: 'DemoPassword1!',
    fullName: 'Alex Johnson',
    memberSinceISO: '2025-01-12T00:00:00.000Z',
    onboarding_complete: true,
  },
  {
    email: 'demo2@pawcalm.test',
    password: 'DemoPassword2!',
    fullName: 'Jordan Lee',
    memberSinceISO: '2025-04-03T00:00:00.000Z',
    onboarding_complete: true,
  },
  {
    email: 'demo3@pawcalm.test',
    password: 'DemoPassword3!',
    fullName: 'Sam Patel',
    memberSinceISO: '2025-08-22T00:00:00.000Z',
    onboarding_complete: true,
  },
]

function mapHistoryEntries(
  source: HistoryEntry[],
  opts: {
    petId: string
    idPrefix: string
  }
): HistoryEntry[] {
  return source.map((e) => ({
    ...e,
    id: `${opts.idPrefix}-${e.id}`,
    petId: opts.petId,
  }))
}

export function getDemoAccountByEmail(email: string): DemoAccount | null {
  const a = DEMO_ACCOUNTS.find((x) => x.email.toLowerCase() === email.toLowerCase())
  return a ?? null
}

export function getDefaultDemoAccountData(email: string): DemoAccountData {
  const account = getDemoAccountByEmail(email)
  if (!account) {
    // Fallback to first account. This is a demo app; avoid throwing.
    return getDefaultDemoAccountData(DEMO_ACCOUNTS[0].email)
  }

  // Partition the existing mock history by pet type.
  const mockDogHistory = MOCK_HISTORY.filter((h) => h.petId === MOCK_DOG_PROFILE.id)
  const mockCatHistory = MOCK_HISTORY.filter((h) => h.petId === MOCK_CAT_PROFILE.id)

  const dogProfileFor = (id: string, name: string, vetClinicName: string): PetProfile => ({
    ...MOCK_DOG_PROFILE,
    id,
    name,
    vetClinicName,
  })

  const catProfileFor = (id: string, name: string, vetClinicName: string): PetProfile => ({
    ...MOCK_CAT_PROFILE,
    id,
    name,
    vetClinicName,
  })

  if (account.email.startsWith('demo1@')) {
    const dogId = 'demo1-dog'
    const catId = 'demo1-cat'

    const dog = dogProfileFor(dogId, 'Luna', 'Happy Paws Veterinary')
    const cat = catProfileFor(catId, 'Mochi', 'City Cats Veterinary')

    return {
      account,
      pets: [dog, cat],
      activePetId: dogId,
      assessmentHistory: [
        ...mapHistoryEntries(mockDogHistory, { petId: dogId, idPrefix: 'd1-dog' }),
        ...mapHistoryEntries(mockCatHistory, { petId: catId, idPrefix: 'd1-cat' }),
      ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
    }
  }

  if (account.email.startsWith('demo2@')) {
    const dogId = 'demo2-dog'
    const catId = 'demo2-cat'

    const dog = dogProfileFor(dogId, 'Buddy', 'Tail Wag Vet')
    const cat = catProfileFor(catId, 'Whiskers', 'Meow & Co. Clinic')

    return {
      account,
      pets: [dog, cat],
      activePetId: catId,
      assessmentHistory: [
        ...mapHistoryEntries(mockDogHistory, { petId: dogId, idPrefix: 'd2-dog' }),
        ...mapHistoryEntries(mockCatHistory, { petId: catId, idPrefix: 'd2-cat' }),
      ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
    }
  }

  // demo3 fallback
  const dogId = 'demo3-dog'
  const catId = 'demo3-cat'
  const dog = dogProfileFor(dogId, 'Pepper', 'Pawsitive Care')
  const cat = catProfileFor(catId, 'Nori', 'Feline Fine Veterinary')

  return {
    account,
    pets: [dog, cat],
    activePetId: dogId,
    assessmentHistory: [
      ...mapHistoryEntries(mockDogHistory, { petId: dogId, idPrefix: 'd3-dog' }),
      ...mapHistoryEntries(mockCatHistory, { petId: catId, idPrefix: 'd3-cat' }),
    ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
  }
}

export function checkDemoCredentials(email: string, password: string): DemoAccount | null {
  const a = getDemoAccountByEmail(email)
  if (!a) return null
  return a.password === password ? a : null
}

export function getDemoRecommendationLabel(rec: Recommendation): string {
  if (rec === 'monitor') return 'Monitor'
  if (rec === 'try_this') return 'Try This'
  return 'Call Vet'
}

