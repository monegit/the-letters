/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        roundXL: "0 0px 100px 0px rgba(0, 0, 0, 0.25)",
        round: "0 0px 20px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
