import type { OnsetTiming } from '@/store'

const OPTIONS: { label: string; value: OnsetTiming }[] = [
  { label: 'Just now (within the hour)', value: 'within_the_hour' },
  { label: 'Earlier today',              value: 'earlier_today' },
  { label: 'Yesterday',                  value: 'yesterday' },
  { label: 'A few days ago',             value: 'few_days' },
  { label: 'A week or more',             value: 'week_or_more' },
]

interface Step2Props {
  value: OnsetTiming | null
  onChange: (v: OnsetTiming) => void
  error?: string
}

export default function Step2_WhenStarted({ value, onChange, error }: Step2Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-calm-navy mb-6">When did you first notice this?</h2>
      <div className="space-y-2.5">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`w-full min-h-[56px] rounded-button border-2 px-4 flex items-center text-left text-[15px] font-medium transition-colors duration-150 ${
              value === opt.value
                ? 'border-pawcalm-teal bg-light-teal text-pawcalm-teal'
                : 'border-warm-gray bg-white text-calm-navy'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-call-vet-red">{error}</p>}
    </div>
  )
}
