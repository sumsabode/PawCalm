export type Recommendation = 'monitor' | 'try_this' | 'call_vet'

export interface Assessment {
  id: string
  concernSummary: string
  recommendation: Recommendation
  createdAt: Date
}

export const MOCK_ASSESSMENTS: Assessment[] = [
  {
    id: 'mock-1',
    concernSummary: 'Skipped breakfast, seemed uninterested in food',
    recommendation: 'monitor',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'mock-2',
    concernSummary: 'Scratching ears more than usual, shaking head',
    recommendation: 'try_this',
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000),
  },
  {
    id: 'mock-3',
    concernSummary: 'Limping on right front leg after morning walk',
    recommendation: 'call_vet',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
]
