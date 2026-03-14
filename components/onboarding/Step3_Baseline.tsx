import { DogProfileDraft, EatingPattern, EnergyPattern, MoodPattern } from '@/store'
import OptionChip from './OptionChip'

interface Step3Props {
  draft: DogProfileDraft
  onChange: (updates: Partial<DogProfileDraft>) => void
  errors: Record<string, string>
  petType: 'dog' | 'cat'
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

const LITTER_OPTIONS = [
  { label: 'Regular', value: 'regular' },
  { label: 'Occasional issues', value: 'occasional_issues' },
  { label: 'Frequent changes', value: 'frequent_changes' },
  { label: 'Shared box', value: 'shared_box' },
]

const GROOMING_OPTIONS = [
  { label: 'Normal', value: 'normal' },
  { label: 'Excessive', value: 'excessive' },
  { label: 'Under-grooms', value: 'under_grooms' },
  { label: 'Varies', value: 'varies' },
]

export default function Step3_Baseline({ draft, onChange, errors, petType }: Step3Props) {
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

      {/* Cat-only sections */}
      {petType === 'cat' && (
        <>
          <div>
            <label className="block text-sm font-semibold text-calm-navy mb-2">
              Litter box habits
            </label>
            <div className="flex flex-wrap gap-2">
              {LITTER_OPTIONS.map((opt) => (
                <OptionChip
                  key={opt.value}
                  label={opt.label}
                  selected={draft.normalLitterBox === opt.value}
                  onSelect={() => onChange({ normalLitterBox: opt.value })}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-calm-navy mb-2">
              Grooming level
            </label>
            <div className="flex flex-wrap gap-2">
              {GROOMING_OPTIONS.map((opt) => (
                <OptionChip
                  key={opt.value}
                  label={opt.label}
                  selected={draft.normalGrooming === opt.value}
                  onSelect={() => onChange({ normalGrooming: opt.value })}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
