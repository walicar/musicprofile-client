import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
