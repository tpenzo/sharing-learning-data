/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    container: {
      // you can configure the container to be centered
      center: true,
      padding: '1rem',

      // default breakpoints but with 40px removed
      screens: {
        sm: '600px',
        md: '720px',
        lg: '960px',
        xl: '1240px',
        '2xl': '1340px',
      },
    },
    extend: {
      colors: {
        "primary-blue":"var(--primary-blue)",
        "primary-red": "var(--primary-red)",
        "second-blue":"var(--second-blue)",
        "third-blue":"var(--third-blue)",
        "fourth-blue":"var(--fourth-blue)",
        "light-gray":"var(--light-gray)",
        "bold-gray":"var(--bold-gray)",
      },
      boxShadow: {
        'hover-button': 'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;',
      }
    },
  },
  plugins: [
  ],
}