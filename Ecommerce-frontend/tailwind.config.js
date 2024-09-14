/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio';
// the above was added when using the store navigation provided by tailwindui

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
  plugins: [
    aspectRatio
    // the above was added when using the store navigation provided by tailwindui
  ],
}
