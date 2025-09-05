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
          bg: "#1f2937",    // gray-800
          hover: "#374151", // gray-700
        },
        green: {
          DEFAULT: "#16a34a", // main green
          dark: "#065f46",    // dark green
          light: "#d1fae5",   // light green / background
        },
        grayCustom: {
          light: "#f3f4f6",
          medium: "#9ca3af",
          dark: "#4b5563",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 4px 6px rgba(0,0,0,0.1)",
        cardHover: "0 8px 15px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};

