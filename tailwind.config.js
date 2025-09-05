/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",   // root index.html
    "./src/**/*.{js,ts,jsx,tsx}", // all React components
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563eb", // blue-600
          light: "#3b82f6",   // blue-500
          dark: "#1e40af",    // blue-900
        },
        sidebar: {
          bg: "#1f2937", // gray-800
          hover: "#374151", // gray-700
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
