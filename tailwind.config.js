/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      // escanea todos los archivos en /app
    "./components/**/*.{js,ts,jsx,tsx}", // escanea todos los componentes
  ],
  theme: {
    extend: {
      fontFamily: {
        // "font-sans" usará la fuente Inter importada con next/font
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],   // para párrafos
        heading: ["var(--font-jakarta)", "sans-serif"],   
      },
      colors: {
        // puedes añadir colores personalizados si quieres
      },
    },
  },
  plugins: [],
};
