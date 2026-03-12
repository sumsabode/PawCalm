'use client'

import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LogConcernButton() {
  return (
    <motion.div
      animate={{ opacity: [0.92, 1, 0.92] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Link href="/concern">
        <div className="w-full bg-pawcalm-teal rounded-card flex items-center gap-4 px-5 py-4 shadow-[0_6px_24px_rgba(13,148,136,0.32)] min-h-[72px]">
          <AlertCircle size={28} className="text-white shrink-0" />
          <div className="flex-1">
            <p className="text-white font-bold text-[17px] leading-snug">Log a Concern</p>
            <p className="text-white/80 text-[13px] mt-0.5 leading-snug">
              Something seems off? Let&apos;s figure it out together.
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
