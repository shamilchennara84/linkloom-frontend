/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    // screens: {
    //   sm: "640px",
    //   md: "768px",
    //   lg: "1024px",
    //   xl: "1280px",
    //   "2xl": "1536px",
    //   desktop: "1280px",
    // },
    extend: {
      colors: {
        "custom-black": "#020000",
      },
    },
  },
  variants: {},
  plugins: [require("daisyui")],
};
