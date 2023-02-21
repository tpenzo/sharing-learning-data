/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        "primary-blue":"var(--primary-blue)",
        "second-blue":"var(--second-blue)",
        "third-blue":"var(--third-blue)",
        "fourth-blue":"var(--fourth-blue)",
        "light-gray":"var(--light-gray)",
        "bold-gray":"var(--bold-gray)",
      },
    },
  },
  plugins: [],
}