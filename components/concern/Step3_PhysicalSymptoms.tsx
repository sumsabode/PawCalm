import type { PhysicalSymptom } from '@/store'
import OptionChip from '@/components/onboarding/OptionChip'

const SYMPTOMS: { label: string; value: PhysicalSymptom }[] = [
  { label: 'Excessive drooling', value: 'excessive_drooling' },
  { label: 'Shaking/trembling',  value: 'shaking' },
  { label: 'Coughing',           value: 'coughing' },
  { label: 'Sneezing',           value: 'sneezing' },
  { label: 'Eye discharge',      value: 'eye_discharge' },
  { label: 'Swelling',           value: 'swelling' },
  { label: 'Skin changes',       value: 'skin_changes' },
  { label: 'Bad breath',         value: 'bad_breath' },
  { label: 'Excessive thirst',   value: 'excessive_thirst' },
  { label: 'Weight change',      value: 'weight_change' },
  { label: 'None of these',      value: 'none' },
]

interface Step3Props {
  values: PhysicalSymptom[]
  onChange: (v: PhysicalSymptom[]) => void
}

export default function Step3_PhysicalSymptoms({ values, onChange }: Step3Props) {
  function toggle(val: PhysicalSymptom) {
    if (val === 'none') {
      onChange(['none'])
      return
    }
    const without = values.filter((v) => v !== 'none')
    if (without.includes(val)) {
      onChange(without.filter((v) => v !== val))
    } else {
      onChange([...without, val])
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-calm-navy mb-2">Any physical symptoms?</h2>
      <p className="text-sm text-medium-gray mb-6">Select all that apply</p>
      <div className="flex flex-wrap gap-2">
        {SYMPTOMS.map((s) => (
          <OptionChip
            key={s.value}
            label={s.label}
            selected={values.includes(s.value)}
            onSelect={() => toggle(s.value)}
          />
        ))}
      </div>
    </div>
  )
}
