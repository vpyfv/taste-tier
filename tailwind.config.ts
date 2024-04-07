import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "text-color-p": "rgba(0,6,9,1)",
        "text-color-s": "rgba(255,249,240,1)",
      },
      backgroundColor: {
        card: "rgba(0,6,9,1)",
        background: "rgba(255,249,240,1)",
      },
      borderColor: {
        card: "rgba(0,6,9,0.3)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;

// back ground: rgba(255,249,240,1)
// card: rgba(0,6,9,1)
//text color p : rgba(0,6,9,1)
//text color s : rgba(255,249,240,1)
