/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Branding — from EcoBazar Figma design system
        success: {
          DEFAULT: '#00B207', // Branding/Success
          dark: '#2C742F',    // Branding/Success Dark
        },
        warning: '#FF8A00',   // Branding/Warning
        error: '#EA4B48',     // Branding/Error
        gray: {
          50: '#F2F2F2',
          100: '#E5E5E5',
          200: '#CCCCCC',
          400: '#999999',
          700: '#4D4D4D',
          900: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        tiny: ['12px', { lineHeight: '1.3' }],
        small: ['14px', { lineHeight: '1.5' }],
        medium: ['16px', { lineHeight: '1.5' }],
      },
      borderRadius: {
        pill: '43px',
      },
      boxShadow: {
        hover: '0px 0px 12px 0px rgba(32, 181, 38, 0.32)',
      },
      maxWidth: {
        container: '1320px',
      },
    },
  },
  plugins: [],
};
