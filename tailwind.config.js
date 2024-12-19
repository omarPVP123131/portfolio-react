/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // rutas donde ShadCN busca componentes
    "./components/**/*.{js,jsx,ts,tsx}", // ajusta según sea necesario
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};