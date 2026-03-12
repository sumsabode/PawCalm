'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { PawPrint } from 'lucide-react'
import { useAppStore } from '@/store'

const MESSAGES = (dogName: string) => [
  `Reviewing ${dogName}'s profile...`,
  'Analyzing your concern...',
  'Preparing your guidance...',
]

export default function ProcessingPage() {
  const router = useRouter()
  const dogProfile = useAppStore((s) => s.dogProfile)
  const dogName = dogProfile?.name ?? 'your dog'
  const messages = MESSAGES(dogName)

  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((i) => (i + 1) % messages.length)
    }, 800)
    return () => clearInterval(interval)
  }, [messages.length])

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/results')
    }, 2500)
    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-soft-cream gap-6 px-6">
      {/* Breathing paw circle */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-24 h-24 bg-light-teal rounded-full flex items-center justify-center"
      >
        <PawPrint size={40} className="text-pawcalm-teal" />
      </motion.div>

      <h2 className="text-xl font-semibold text-calm-navy text-center">
        Analyzing {dogName}&apos;s concern
      </h2>

      {/* Cycling message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={msgIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-[15px] text-medium-gray text-center"
        >
          {messages[msgIdx]}
        </motion.p>
      </AnimatePresence>

      <p className="text-xs text-medium-gray text-center mt-8">
        This is general guidance, not a substitute for veterinary advice.
      </p>
    </div>
  )
}
