/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio';
// the above was added when using the store navigation provided by tailwindui

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    aspectRatio
    // the above was added when using the store navigation provided by tailwindui
  ],
}
