import { DogProfile } from '@/store'

export async function saveDogProfile(profile: DogProfile): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log('[mockDataService] saveDogProfile called with:', profile)
}
