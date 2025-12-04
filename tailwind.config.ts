import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#2563EB',
          light: '#E0F2FE',
        },
        text: {
          primary: '#0F172A',
          secondary: '#334155',
        },
        background: {
          default: '#FFFFFF',
          sidebar: '#F8FAFC',
        },
        module: {
          cheatSheets: '#E0F2FE',
          flashcards: '#F3E8FF',
          quizzes: '#FFEED5',
          studyPlan: '#DCFCE7',
          classes: '#FFE4E6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '8px',
        button: '6px',
        input: '6px',
        modal: '10px',
      },
    },
  },
  plugins: [],
}
export default config

