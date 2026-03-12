interface ToggleOption {
  label: string
  value: string
}

interface ToggleButtonProps {
  options: ToggleOption[]
  value: string | null
  onChange: (value: string) => void
}

export default function ToggleButton({ options, value, onChange }: ToggleButtonProps) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2.5 rounded-button border-2 text-sm font-semibold transition-colors duration-150 ${
            value === opt.value
              ? 'bg-pawcalm-teal border-pawcalm-teal text-white'
              : 'bg-white border-warm-gray text-calm-navy'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
