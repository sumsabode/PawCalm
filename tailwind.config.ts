import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pawcalm-teal': '#0D9488',
        'calm-navy': '#1E293B',
        'monitor-green': '#22C55E',
        'try-amber': '#F59E0B',
        'call-vet-red': '#EF4444',
        'soft-cream': '#FFF7ED',
        'warm-gray': '#F5F5F4',
        'medium-gray': '#A8A29E',
        'light-teal': '#CCFBF1',
        'soft-green-bg': '#F0FDF4',
        'soft-amber-bg': '#FFFBEB',
        'soft-red-bg': '#FEF2F2',
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'Nunito', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
    },
  },
  plugins: [],
}

export default config
