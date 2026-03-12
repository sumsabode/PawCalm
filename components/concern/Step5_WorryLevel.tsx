const LEVELS = [
  { level: 1 as const, emoji: '😌', label: 'Just curious',       bg: 'bg-light-teal',    border: 'border-pawcalm-teal', text: 'text-pawcalm-teal',  bar: 'bg-pawcalm-teal' },
  { level: 2 as const, emoji: '🤔', label: 'A little concerned', bg: 'bg-light-teal',    border: 'border-pawcalm-teal', text: 'text-pawcalm-teal',  bar: 'bg-pawcalm-teal' },
  { level: 3 as const, emoji: '😟', label: 'Pretty worried',     bg: 'bg-soft-amber-bg', border: 'border-try-amber',    text: 'text-try-amber',     bar: 'bg-try-amber' },
  { level: 4 as const, emoji: '😰', label: 'Very worried',       bg: 'bg-soft-amber-bg', border: 'border-try-amber',    text: 'text-try-amber',     bar: 'bg-try-amber' },
  { level: 5 as const, emoji: '😨', label: 'Panicking',          bg: 'bg-soft-red-bg',   border: 'border-call-vet-red', text: 'text-call-vet-red',  bar: 'bg-call-vet-red' },
]

interface Step5Props {
  value: 1 | 2 | 3 | 4 | 5 | null
  onChange: (v: 1 | 2 | 3 | 4 | 5) => void
  error?: string
}

export default function Step5_WorryLevel({ value, onChange, error }: Step5Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-calm-navy mb-6">How worried are you right now?</h2>
      <div className="space-y-2.5">
        {LEVELS.map(({ level, emoji, label, bg, border, text, bar }) => {
          const selected = value === level
          return (
            <button
              key={level}
              type="button"
              onClick={() => onChange(level)}
              className={`relative w-full min-h-[64px] flex items-center gap-4 px-5 rounded-card border-2 overflow-hidden transition-all duration-150 ${
                selected ? `${bg} ${border}` : 'bg-white border-warm-gray'
              }`}
            >
              {selected && <div className={`absolute left-0 top-0 bottom-0 w-1 ${bar}`} />}
              <span className="text-2xl ml-1">{emoji}</span>
              <span className={`text-[15px] font-semibold ${selected ? text : 'text-calm-navy'}`}>{label}</span>
            </button>
          )
        })}
      </div>
      {error && <p className="mt-2 text-sm text-call-vet-red">{error}</p>}
      <p className="text-sm text-medium-gray text-center mt-4">
        There are no wrong answers. We&apos;re here to help regardless of how you feel.
      </p>
    </div>
  )
}
