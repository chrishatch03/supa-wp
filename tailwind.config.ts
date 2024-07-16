/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gray
        primary: "#101010",
        secondary: "#1a1a1a",
        tertiary: "#262626",
        white: "#ececec",
      },
      minHeight: {
        'empty': '290px',
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [],
};
