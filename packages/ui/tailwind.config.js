/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Ensure this is set
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#FFFFFF', // Example light mode background
          DEFAULT: '#FFFFFF', // Default to light
          dark: '#18181B',  // Example dark mode background
        },
        foreground: {
          light: '#000000',
          DEFAULT: '#000000',
          dark: '#FFFFFF',
        },
        primary: {
          light: '#3B82F6', // Example blue
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        secondary: {
          light: '#6B7280', // Example gray
          DEFAULT: '#6B7280',
          dark: '#9CA3AF',
        },
        border: {
          light: '#E5E7EB',
          DEFAULT: '#E5E7EB',
          dark: '#374151',
        },
        card: {
          light: '#F3F4F6',
          DEFAULT: '#F3F4F6',
          dark: '#27272A',
        }
      },
    },
  },
  plugins: [],
};
