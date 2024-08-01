/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      ts: "390px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        btnPrimary: "#add8e6",
        btnSecondary: "",
        textPrimary: "",
        textSecondary: "",
      },
    },
  },
  plugins: [],
};
