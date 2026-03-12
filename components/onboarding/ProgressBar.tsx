interface ProgressBarProps {
  currentStep: number // 1–4
  totalSteps?: number
}

export default function ProgressBar({ currentStep, totalSteps = 4 }: ProgressBarProps) {
  return (
    <div className="flex gap-1.5 w-full">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1
        let colorClass = 'bg-warm-gray'
        if (stepNum < currentStep) colorClass = 'bg-pawcalm-teal'
        else if (stepNum === currentStep) colorClass = 'bg-light-teal border border-pawcalm-teal'
        return (
          <div
            key={stepNum}
            className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${colorClass}`}
          />
        )
      })}
    </div>
  )
}
