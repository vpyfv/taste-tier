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
        "text-color-p": "#fbf1ec",
        "text-color-s": "#4E433F",
      },
      backgroundColor: {
        card: "#4E433F",
        background: "#73635b",
        button: "#fbf1ec",
        buttontext: "#73635b",
      },
    },
  },
  plugins: [],
};
export default config;
