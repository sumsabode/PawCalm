import { Dog, Cat } from 'lucide-react'

interface Step0Props {
  petType: 'dog' | 'cat' | null
  onSelect: (type: 'dog' | 'cat') => void
  errors: Record<string, string>
}

export default function Step0_SpeciesPicker({ petType, onSelect, errors }: Step0Props) {
  return (
    <div className="flex flex-col gap-6 px-6 pt-4 pb-8">
      <div>
        <h2 className="text-2xl font-bold text-calm-navy">Who are we meeting?</h2>
        <p className="text-medium-gray text-sm mt-1">Let&apos;s get to know your new companion</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onSelect('dog')}
          className={`rounded-card p-6 flex flex-col items-center justify-center h-[150px] border-2 transition-colors ${
            petType === 'dog' ? 'border-pawcalm-teal bg-light-teal' : 'border-warm-gray bg-white'
          }`}
        >
          <Dog size={48} className="text-pawcalm-teal mb-2" />
          <span className="font-semibold text-calm-navy">Dog</span>
        </button>
        <button
          type="button"
          onClick={() => onSelect('cat')}
          className={`rounded-card p-6 flex flex-col items-center justify-center h-[150px] border-2 transition-colors ${
            petType === 'cat' ? 'border-pawcalm-teal bg-light-teal' : 'border-warm-gray bg-white'
          }`}
        >
          <Cat size={48} className="text-pawcalm-teal mb-2" />
          <span className="font-semibold text-calm-navy">Cat</span>
        </button>
      </div>
      {errors.petType && (
        <p className="text-call-vet-red text-xs text-center">{errors.petType}</p>
      )}
      <p className="text-xs text-medium-gray text-center">
        PawCalm works for dogs and cats — more species coming soon!
      </p>
    </div>
  )
}
