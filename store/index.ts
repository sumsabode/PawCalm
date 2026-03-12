import { create } from 'zustand'

export type DogSex = 'male' | 'female'
export type SpayedNeuteredStatus = 'yes' | 'no' | 'not_sure'
export type EatingPattern = 'eats_everything' | 'moderate_eater' | 'picky_eater' | 'variable'
export type EnergyPattern = 'very_active' | 'moderately_active' | 'calm' | 'low_energy'
export type MoodPattern = 'very_social' | 'friendly' | 'independent' | 'anxious'
export type HealthCondition = 'allergies' | 'joint_issues' | 'heart_condition' | 'diabetes' | 'seizures' | 'none' | 'other'

export interface DogProfile {
  id: string
  name: string
  photoUrl: string | null
  breed: string
  isPuppy: boolean
  ageYears: number | null
  weightLbs: number
  sex: DogSex
  spayedNeutered: SpayedNeuteredStatus
  normalEating: EatingPattern
  normalEnergy: EnergyPattern
  normalMood: MoodPattern
  healthConditions: HealthCondition[]
  medications: string
  vetClinicName: string
}

export type DogProfileDraft = Partial<Omit<DogProfile, 'id'>>

interface AppState {
  dogProfile: DogProfile | null
  setDogProfile: (profile: DogProfile) => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  dogProfile: null,
  setDogProfile: (profile) => set({ dogProfile: profile }),
  activeTab: '/',
  setActiveTab: (tab) => set({ activeTab: tab }),
}))
