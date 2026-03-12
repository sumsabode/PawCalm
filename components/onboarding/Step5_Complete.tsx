import { DogProfile } from '@/store'

interface Step5Props {
  profile: DogProfile
  onConfirm: () => void
  isLoading: boolean
}

const EATING_LABELS: Record<string, string> = {
  eats_everything: 'Eats everything',
  moderate_eater: 'Moderate eater',
  picky_eater: 'Picky eater',
  variable: 'Variable',
}

const ENERGY_LABELS: Record<string, string> = {
  very_active: 'Very active',
  moderately_active: 'Moderately active',
  calm: 'Calm',
  low_energy: 'Low energy',
}

const MOOD_LABELS: Record<string, string> = {
  very_social: 'Very social',
  friendly: 'Friendly',
  independent: 'Independent',
  anxious: 'Anxious',
}

export default function Step5_Complete({ profile, onConfirm, isLoading }: Step5Props) {
  const ageDisplay = profile.isPuppy ? 'Puppy (< 1 year)' : `${profile.ageYears} year${profile.ageYears === 1 ? '' : 's'}`

  return (
    <div className="flex flex-col items-center gap-6 px-6 pt-8 pb-8">
      <div className="text-center">
        <div className="text-5xl mb-3">🐾</div>
        <h2 className="text-2xl font-bold text-calm-navy">Welcome, {profile.name}!</h2>
        <p className="text-medium-gray text-sm mt-1">
          Here&apos;s a summary of your profile
        </p>
      </div>

      {/* Profile photo */}
      {profile.photoUrl && (
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pawcalm-teal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Summary card */}
      <div className="w-full bg-white rounded-card p-4 shadow-sm space-y-3">
        <SummaryRow label="Name" value={profile.name} />
        <SummaryRow label="Breed" value={profile.breed} />
        <SummaryRow label="Age" value={ageDisplay} />
        <SummaryRow label="Weight" value={`${profile.weightLbs} lbs`} />
        <SummaryRow label="Sex" value={profile.sex === 'male' ? 'Male' : 'Female'} />
        <SummaryRow
          label="Spayed/Neutered"
          value={profile.spayedNeutered === 'yes' ? 'Yes' : profile.spayedNeutered === 'no' ? 'No' : 'Not sure'}
        />
        <div className="border-t border-warm-gray pt-3 space-y-3">
          <SummaryRow label="Eating" value={EATING_LABELS[profile.normalEating] ?? profile.normalEating} />
          <SummaryRow label="Energy" value={ENERGY_LABELS[profile.normalEnergy] ?? profile.normalEnergy} />
          <SummaryRow label="Mood" value={MOOD_LABELS[profile.normalMood] ?? profile.normalMood} />
        </div>
        {profile.healthConditions.length > 0 && (
          <div className="border-t border-warm-gray pt-3">
            <SummaryRow
              label="Health"
              value={profile.healthConditions.join(', ')}
            />
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onConfirm}
        disabled={isLoading}
        className="w-full bg-pawcalm-teal text-white font-bold py-3.5 rounded-button disabled:opacity-60 transition-opacity"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Saving...
          </span>
        ) : (
          'Start using PawCalm'
        )}
      </button>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-sm text-medium-gray shrink-0">{label}</span>
      <span className="text-sm font-semibold text-calm-navy text-right">{value}</span>
    </div>
  )
}
