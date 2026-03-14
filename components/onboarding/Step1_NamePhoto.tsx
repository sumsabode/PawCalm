import { useRef } from 'react'
import { Camera } from 'lucide-react'
import { DogProfileDraft } from '@/store'

interface Step1Props {
  draft: DogProfileDraft
  onChange: (updates: Partial<DogProfileDraft>) => void
  errors: Record<string, string>
  petType: 'dog' | 'cat'
}

export default function Step1_NamePhoto({ draft, onChange, errors, petType }: Step1Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handlePhotoClick() {
    fileInputRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      onChange({ photoUrl: ev.target?.result as string })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col items-center gap-6 px-6 pt-4 pb-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-calm-navy">
          {petType === 'cat' ? "Let's meet your kitty!" : "Let's meet your pup!"}
        </h2>
        <p className="text-medium-gray text-sm mt-1">
          {petType === 'cat' ? "Tell us your cat's name and add a photo" : "Tell us your dog's name and add a photo"}
        </p>
      </div>

      {/* Photo upload */}
      <button
        type="button"
        onClick={handlePhotoClick}
        className="relative w-28 h-28 rounded-full overflow-hidden bg-warm-gray border-2 border-dashed border-medium-gray flex items-center justify-center hover:border-pawcalm-teal transition-colors"
      >
        {draft.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={draft.photoUrl} alt="Dog photo" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-medium-gray">
            <Camera size={28} />
            <span className="text-xs font-medium">Add photo</span>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </button>

      {/* Name input */}
      <div className="w-full">
        <label className="block text-sm font-semibold text-calm-navy mb-1.5">
          Pet&apos;s name <span className="text-call-vet-red">*</span>
        </label>
        <input
          type="text"
          value={draft.name ?? ''}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="e.g. Buddy"
          className={`w-full border-2 rounded-button px-4 py-2.5 text-sm text-calm-navy placeholder-medium-gray focus:outline-none transition-colors ${
            errors.name ? 'border-call-vet-red' : 'border-warm-gray focus:border-pawcalm-teal'
          }`}
        />
        {errors.name && (
          <p className="text-call-vet-red text-xs mt-1">{errors.name}</p>
        )}
      </div>
    </div>
  )
}
