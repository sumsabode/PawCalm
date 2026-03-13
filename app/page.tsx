'use client'

import { Bell } from 'lucide-react'
import { useAppStore } from '@/store'
import { MOCK_ASSESSMENTS } from '@/lib/mockAssessments'
import DogProfileCard from '@/components/home/DogProfileCard'
import LogConcernButton from '@/components/home/LogConcernButton'
import RecentAssessments from '@/components/home/RecentAssessments'
import QuickLog from '@/components/home/QuickLog'
import FollowUpBanner from '@/components/home/FollowUpBanner'

export default function HomePage() {
  const dogProfile = useAppStore((s) => s.dogProfile)

  const dogName = dogProfile?.name ?? 'your pup'
  const lastAssessment = MOCK_ASSESSMENTS[0] ?? null

  return (
    <div className="min-h-screen bg-soft-cream">
      <div className="px-4 pt-12 pb-8 space-y-5">

        {/* Top bar */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[18px] font-semibold text-calm-navy">Hi there 👋</h1>
            <p className="text-sm text-medium-gray mt-0.5">
              {dogProfile ? `${dogName}'s dashboard` : 'Welcome to PawCalm'}
            </p>
          </div>
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-warm-gray shadow-sm"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={1.5} className="text-medium-gray" />
          </button>
        </div>

        {/* Dog profile card */}
        <DogProfileCard profile={dogProfile} lastAssessment={lastAssessment} />

        {/* Primary CTA */}
        <LogConcernButton />

        {/* Follow-up resolution banner */}
        <FollowUpBanner />

        {/* Recent assessments */}
        <RecentAssessments assessments={MOCK_ASSESSMENTS} dogName={dogName} />

        {/* Divider */}
        <div className="border-t border-warm-gray" />

        {/* Quick log */}
        <QuickLog />

      </div>
    </div>
  )
}
