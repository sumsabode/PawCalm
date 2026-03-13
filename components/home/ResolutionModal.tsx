'use client'

import { useState } from 'react'
import { CheckCircle, X } from 'lucide-react'
import type { ResolutionOutcome } from '@/store'

interface Props {
  dogName: string
  concernSummary: string
  onSave: (outcome: ResolutionOutcome, notes: string) => void
  onDismiss: () => void
}

const OUTCOMES: { value: ResolutionOutcome; label: string; emoji: string }[] = [
  { value: 'resolved_itself', label: 'It resolved on its own',         emoji: '✨' },
  { value: 'tried_something', label: 'We tried something and it worked', emoji: '💡' },
  { value: 'visited_vet',     label: 'We visited the vet',              emoji: '🏥' },
]

export default function ResolutionModal({ dogName, concernSummary, onSave, onDismiss }: Props) {
  const [selected, setSelected] = useState<ResolutionOutcome | null>(null)
  const [notes, setNotes]       = useState('')
  const [saved, setSaved]       = useState(false)

  function handleSave() {
    if (!selected) return
    onSave(selected, notes.trim())
    setSaved(true)
  }

  // ── Success state ──────────────────────────────────────────────────────
  if (saved) {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-6">
        <div className="bg-white rounded-card w-full max-w-[480px] overflow-hidden shadow-2xl">
          <div className="px-6 py-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-soft-green-bg rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={28} className="text-monitor-green" />
            </div>
            <h2 className="text-[18px] font-bold text-calm-navy mb-2">Thanks for the update!</h2>
            <p className="text-[15px] text-calm-navy/80 leading-relaxed">
              This helps PawCalm learn {dogName}&apos;s patterns and give you better guidance next time.
            </p>
            <button
              type="button"
              onClick={onDismiss}
              className="mt-6 w-full py-3 bg-pawcalm-teal rounded-button text-[15px] font-semibold text-white"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Selection state ────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-6">
      <div className="bg-white rounded-card w-full max-w-[480px] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex-1">
            <h2 className="text-[18px] font-bold text-calm-navy">Great news! What happened?</h2>
            <p className="text-[13px] text-medium-gray mt-0.5 leading-snug line-clamp-1">
              Re: {concernSummary}
            </p>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Close"
            className="ml-3 p-1.5 rounded-full hover:bg-warm-gray transition-colors shrink-0"
          >
            <X size={18} className="text-medium-gray" />
          </button>
        </div>

        {/* Options */}
        <div className="px-5 pb-1 space-y-2.5">
          {OUTCOMES.map((opt) => {
            const isSelected = selected === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelected(opt.value)}
                className={[
                  'w-full flex items-center gap-3 px-4 py-3.5 rounded-button border-2 text-left transition-colors',
                  isSelected
                    ? 'border-pawcalm-teal bg-light-teal'
                    : 'border-warm-gray bg-white',
                ].join(' ')}
              >
                <span className="text-[20px] leading-none">{opt.emoji}</span>
                <span className={`text-[15px] font-medium ${isSelected ? 'text-pawcalm-teal' : 'text-calm-navy'}`}>
                  {opt.label}
                </span>
                {isSelected && (
                  <CheckCircle size={16} className="text-pawcalm-teal ml-auto shrink-0" />
                )}
              </button>
            )
          })}
        </div>

        {/* Notes */}
        <div className="px-5 pt-3 pb-2">
          <label className="block text-[13px] font-semibold text-medium-gray mb-1.5">
            Any notes? <span className="font-normal">(optional)</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. appetite came back the next morning..."
            rows={2}
            maxLength={500}
            className="w-full border-2 border-warm-gray rounded-button px-4 py-2.5 text-[14px] text-calm-navy placeholder-medium-gray focus:outline-none focus:border-pawcalm-teal transition-colors resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 pb-5 pt-1">
          <button
            type="button"
            onClick={onDismiss}
            className="flex-1 py-3 border-2 border-warm-gray rounded-button text-[15px] font-semibold text-medium-gray"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!selected}
            className={[
              'flex-1 py-3 rounded-button text-[15px] font-semibold text-white transition-opacity',
              selected ? 'bg-pawcalm-teal' : 'bg-pawcalm-teal/40',
            ].join(' ')}
          >
            Save resolution
          </button>
        </div>
      </div>
    </div>
  )
}
