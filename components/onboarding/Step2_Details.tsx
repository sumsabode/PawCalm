import { DogProfileDraft } from '@/store'
import SearchableBreedSelect from './SearchableBreedSelect'
import ToggleButton from './ToggleButton'

interface Step2Props {
  draft: DogProfileDraft
  onChange: (updates: Partial<DogProfileDraft>) => void
  errors: Record<string, string>
}

const SEX_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]

const SPAYED_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Not sure', value: 'not_sure' },
]

export default function Step2_Details({ draft, onChange, errors }: Step2Props) {
  const dogName = draft.name || 'your dog'

  return (
    <div className="flex flex-col gap-5 px-6 pt-4 pb-8">
      <div>
        <h2 className="text-2xl font-bold text-calm-navy">Tell us about {dogName}</h2>
        <p className="text-medium-gray text-sm mt-1">We use this to personalize assessments</p>
      </div>

      {/* Breed */}
      <div>
        <label className="block text-sm font-semibold text-calm-navy mb-1.5">
          Breed <span className="text-call-vet-red">*</span>
        </label>
        <SearchableBreedSelect
          value={draft.breed ?? ''}
          onChange={(breed) => onChange({ breed })}
        />
        {errors.breed && <p className="text-call-vet-red text-xs mt-1">{errors.breed}</p>}
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-semibold text-calm-navy mb-1.5">
          Age <span className="text-call-vet-red">*</span>
        </label>
        <label className="flex items-center gap-2 mb-2 cursor-pointer">
          <input
            type="checkbox"
            checked={draft.isPuppy ?? false}
            onChange={(e) => onChange({ isPuppy: e.target.checked, ageYears: null })}
            className="w-4 h-4 accent-pawcalm-teal"
          />
          <span className="text-sm text-calm-navy">Under 1 year old (puppy)</span>
        </label>
        {!draft.isPuppy && (
          <input
            type="number"
            min={1}
            max={25}
            value={draft.ageYears ?? ''}
            onChange={(e) => onChange({ ageYears: e.target.value ? Number(e.target.value) : null })}
            placeholder="Age in years"
            className={`w-full border-2 rounded-button px-4 py-2.5 text-sm text-calm-navy placeholder-medium-gray focus:outline-none transition-colors ${
              errors.ageYears ? 'border-call-vet-red' : 'border-warm-gray focus:border-pawcalm-teal'
            }`}
          />
        )}
        {errors.ageYears && <p className="text-call-vet-red text-xs mt-1">{errors.ageYears}</p>}
      </div>

      {/* Weight */}
      <div>
        <label className="block text-sm font-semibold text-calm-navy mb-1.5">
          Weight (lbs) <span className="text-call-vet-red">*</span>
        </label>
        <input
          type="number"
          min={1}
          max={300}
          value={draft.weightLbs ?? ''}
          onChange={(e) => onChange({ weightLbs: e.target.value ? Number(e.target.value) : undefined })}
          placeholder="e.g. 45"
          className={`w-full border-2 rounded-button px-4 py-2.5 text-sm text-calm-navy placeholder-medium-gray focus:outline-none transition-colors ${
            errors.weightLbs ? 'border-call-vet-red' : 'border-warm-gray focus:border-pawcalm-teal'
          }`}
        />
        {errors.weightLbs && <p className="text-call-vet-red text-xs mt-1">{errors.weightLbs}</p>}
      </div>

      {/* Sex */}
      <div>
        <label className="block text-sm font-semibold text-calm-navy mb-1.5">
          Sex <span className="text-call-vet-red">*</span>
        </label>
        <ToggleButton
          options={SEX_OPTIONS}
          value={draft.sex ?? null}
          onChange={(v) => onChange({ sex: v as 'male' | 'female' })}
        />
        {errors.sex && <p className="text-call-vet-red text-xs mt-1">{errors.sex}</p>}
      </div>

      {/* Spayed/Neutered */}
      <div>
        <label className="block text-sm font-semibold text-calm-navy mb-1.5">
          Spayed / Neutered <span className="text-call-vet-red">*</span>
        </label>
        <ToggleButton
          options={SPAYED_OPTIONS}
          value={draft.spayedNeutered ?? null}
          onChange={(v) => onChange({ spayedNeutered: v as 'yes' | 'no' | 'not_sure' })}
        />
        {errors.spayedNeutered && (
          <p className="text-call-vet-red text-xs mt-1">{errors.spayedNeutered}</p>
        )}
      </div>
    </div>
  )
}
