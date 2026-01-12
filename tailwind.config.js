/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Montemflumen brand colors
      colors: {
        // Primary brand colors
        forest: {
          50: '#f4f6f3',
          100: '#e6ebe4',
          200: '#cdd7ca',
          300: '#a8bba2',
          400: '#7d9974',
          500: '#5c7a52',
          600: '#476240',
          700: '#3a4f35',
          800: '#283618', // Main brand forest green
          900: '#242f1e',
          950: '#131910',
        },
        ash: {
          50: '#f9f9f8',
          100: '#f3f3f1',
          200: '#e8e7e4',
          300: '#d5d4cf',
          400: '#B7B7A4', // Main brand ash
          500: '#9e9d8c',
          600: '#8a8977',
          700: '#737262',
          800: '#5f5f52',
          900: '#4e4e44',
          950: '#2a2a24',
        },
        picket: {
          50: '#fdfdfb',
          100: '#F0EFEB', // Main brand picket white
          200: '#e5e4de',
          300: '#d4d2c8',
          400: '#bbb8aa',
          500: '#a5a18f',
          600: '#918c78',
          700: '#787363',
          800: '#636053',
          900: '#524f45',
          950: '#2b2924',
        },
        // Border color for the @apply border-border
        border: 'hsl(var(--color-border))',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
      fontSize: {
        // Custom fluid typography
        'display-1': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'heading-1': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-2': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'section': 'clamp(4rem, 10vw, 8rem)',
        'section-sm': 'clamp(2rem, 5vw, 4rem)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 16px -4px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 8px 24px -4px rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 24px -4px rgba(0, 0, 0, 0.12), 0 16px 48px -8px rgba(0, 0, 0, 0.16)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
