import { DogProfileDraft, EatingPattern, EnergyPattern, MoodPattern } from '@/store'
import OptionChip from './OptionChip'

interface Step3Props {
  draft: DogProfileDraft
  onChange: (updates: Partial<DogProfileDraft>) => void
  errors: Record<string, string>
}

const EATING_OPTIONS: { label: string; value: EatingPattern }[] = [
  { label: 'Eats everything', value: 'eats_everything' },
  { label: 'Moderate eater', value: 'moderate_eater' },
  { label: 'Picky eater', value: 'picky_eater' },
  { label: 'Variable', value: 'variable' },
]

const ENERGY_OPTIONS: { label: string; value: EnergyPattern }[] = [
  { label: 'Very active', value: 'very_active' },
  { label: 'Moderately active', value: 'moderately_active' },
  { label: 'Calm', value: 'calm' },
  { label: 'Low energy', value: 'low_energy' },
]

const MOOD_OPTIONS: { label: string; value: MoodPattern }[] = [
  { label: 'Very social', value: 'very_social' },
  { label: 'Friendly', value: 'friendly' },
  { label: 'Independent', value: 'independent' },
  { label: 'Anxious', value: 'anxious' },
]

export default function Step3_Baseline({ draft, onChange, errors }: Step3Props) {
  return (
    <div className="flex flex-col gap-6 px-6 pt-4 pb-8">
      <div>
        <h2 className="text-2xl font-bold text-calm-navy">Normal baseline</h2>
        <p className="text-medium-gray text-sm mt-1">
          Describe {draft.name ? `${draft.name}'s` : "your dog's"} typical behavior
        </p>
      </div>

      {/* Eating */}
      <div>
        <label className="block text-sm font-semibold text-calm-navy mb-2">
          Eating habits <span className="text-call-vet-red">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {EATING_OPTIONS.map((opt) => (
            <OptionChip
              key={opt.value}
              label={opt.label}
              selected={draft.normalEating === opt.value}
              onSelect={() => onChange({ normalEating: opt.value })}
            />
          ))}
        </div>
        {errors.normalEating && (
          <p className="text-call-vet-red text-xs mt-1">{errors.normalEating}</p>
        )}
      </div>

      {/* Energy */}
      <div>
        <label className="block text-sm font-semibold text-calm-navy mb-2">
          Energy level <span className="text-call-vet-red">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {ENERGY_OPTIONS.map((opt) => (
            <OptionChip
              key={opt.value}
              label={opt.label}
              selected={draft.normalEnergy === opt.value}
              onSelect={() => onChange({ normalEnergy: opt.value })}
            />
          ))}
        </div>
        {errors.normalEnergy && (
          <p className="text-call-vet-red text-xs mt-1">{errors.normalEnergy}</p>
        )}
      </div>

      {/* Mood */}
      <div>
        <label className="block text-sm font-semibold text-calm-navy mb-2">
          Typical mood <span className="text-call-vet-red">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {MOOD_OPTIONS.map((opt) => (
            <OptionChip
              key={opt.value}
              label={opt.label}
              selected={draft.normalMood === opt.value}
              onSelect={() => onChange({ normalMood: opt.value })}
            />
          ))}
        </div>
        {errors.normalMood && (
          <p className="text-call-vet-red text-xs mt-1">{errors.normalMood}</p>
        )}
      </div>
    </div>
  )
}
