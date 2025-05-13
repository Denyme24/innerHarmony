/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: "var(--lavender)",
        "soft-lilac": "var(--soft-lilac)",
        "pale-rose": "var(--pale-rose)",
        mint: "var(--mint)",
        "sky-blue": "var(--sky-blue)",
        "warm-white": "var(--warm-white)",
        "soft-black": "var(--soft-black)",
      },
      fontFamily: {
        sans: ["var(--font-nunito)"],
        serif: ["var(--font-cormorant)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        breathe: "breathe 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
