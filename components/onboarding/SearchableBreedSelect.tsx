'use client'

import { useState, useRef, useEffect } from 'react'
import { BREEDS } from '@/lib/breeds'

interface SearchableBreedSelectProps {
  value: string
  onChange: (breed: string) => void
  placeholder?: string
  breeds?: string[]
}

export default function SearchableBreedSelect({
  value,
  onChange,
  placeholder = 'Search breeds...',
  breeds = BREEDS,
}: SearchableBreedSelectProps) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = breeds.filter((b) =>
    b.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    setQuery(value)
  }, [value])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        // Reset query to selected value if nothing was selected
        setQuery(value)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [value])

  function handleSelect(breed: string) {
    onChange(breed)
    setQuery(breed)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full border-2 border-warm-gray rounded-button px-4 py-2.5 text-sm text-calm-navy placeholder-medium-gray focus:outline-none focus:border-pawcalm-teal"
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 mt-1 max-h-52 overflow-y-auto bg-white rounded-card shadow-lg border border-warm-gray">
          {filtered.map((breed) => (
            <li key={breed}>
              <button
                type="button"
                onMouseDown={() => handleSelect(breed)}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-warm-gray transition-colors ${
                  breed === value ? 'font-semibold text-pawcalm-teal' : 'text-calm-navy'
                }`}
              >
                {breed}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
