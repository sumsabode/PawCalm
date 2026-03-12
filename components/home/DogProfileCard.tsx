import Link from 'next/link'
import { PawPrint, ChevronRight } from 'lucide-react'
import { DogProfile } from '@/store'
import { formatRelativeTime } from '@/lib/formatTime'
import { Assessment } from '@/lib/mockAssessments'

interface DogProfileCardProps {
  profile: DogProfile | null
  lastAssessment?: Assessment | null
}

export default function DogProfileCard({ profile, lastAssessment }: DogProfileCardProps) {
  if (!profile) {
    return (
      <Link href="/onboarding">
        <div className="bg-white rounded-card p-4 shadow-sm border border-warm-gray flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-warm-gray flex items-center justify-center shrink-0">
            <PawPrint size={28} className="text-medium-gray" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-calm-navy">Set up your dog&apos;s profile</p>
            <p className="text-xs text-medium-gray mt-0.5">Personalize your PawCalm experience</p>
          </div>
          <ChevronRight size={18} className="text-medium-gray shrink-0" />
        </div>
      </Link>
    )
  }

  const ageDisplay = profile.isPuppy ? 'Puppy' : profile.ageYears ? `${profile.ageYears}yr` : null
  const details = [profile.breed, ageDisplay, `${profile.weightLbs} lbs`]
    .filter(Boolean)
    .join(' • ')

  return (
    <Link href="/profile">
      <div className="bg-white rounded-card p-4 shadow-sm border border-warm-gray flex items-center gap-3">
        {/* Photo */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-warm-gray shrink-0 flex items-center justify-center">
          {profile.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <PawPrint size={28} className="text-medium-gray" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[18px] font-semibold text-calm-navy leading-tight">{profile.name}</p>
          <p className="text-xs text-medium-gray mt-0.5 truncate">{details}</p>
          <p className="text-xs text-medium-gray mt-1.5">
            Last check:{' '}
            <span className={lastAssessment ? 'text-pawcalm-teal font-medium' : ''}>
              {lastAssessment
                ? formatRelativeTime(lastAssessment.createdAt)
                : 'No assessments yet'}
            </span>
          </p>
        </div>

        <ChevronRight size={18} className="text-medium-gray shrink-0" />
      </div>
    </Link>
  )
}
