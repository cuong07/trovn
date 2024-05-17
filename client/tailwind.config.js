/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "custom-calc": "calc(100% - 80px)",
      },
    },
  },
  plugins: [],
};
