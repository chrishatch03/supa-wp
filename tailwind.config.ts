/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        pianist:
          "linear-gradient(to left bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('/images/pianist.jpeg')",
        adventure1: 
          "url('/images/adventure1.jpg')",
        "adventure1-dark":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('/images/adventure1.jpg')",
        adventure2:
          "url('/images/adventure2.jpg')",
        "adventure2-dark":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('/images/adventure2.jpg')",
        adventure3:
          "url('/images/adventure3.jpg')",
        "adventure3-dark":
          "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('/images/adventure3.jpg')",
        adventure3big:
          "url('/images/adventure3 copy.png')",
        "adventure3big-dark":
          "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('/images/adventure3 copy.png')",
        adv3center:
          "url('/images/adventure3 copy.png')",
        adventure4:
          "url('/images/adventure4.avif')",
        "adventure4-dark":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('/images/adventure4.avif')",
        adventure5:
          "url('/images/adventure5.webp')",
        "adventure5-dark":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('/images/adventure5.webp')",
        adventure6:
          "url('/images/adventure6.avif')",
        "adventure6-dark":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('/images/adventure6.avif')",
        adventure7:
          "url('/images/adventure7.jpg')",
        "adventure7-dark":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('/images/adventure7.jpg')",
        adventure8:
          "url('/images/adventure8.avif')",
        "adventure8-dark":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('/images/adventure8.avif')",
        adventure9:
          "url('/images/adventure9.jpeg')",
        "adventure9-dark":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('/images/adventure9.jpeg')",
        adventure10:
          "url('/images/adventure10.jpg')",
        "adventure10-dark":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('/images/adventure10.jpg')",
        adventure11:
          "url('/images/adventure11.jpg')",
        "adventure11-dark":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('/images/adventure11.jpg')",
        adventure12:
          "url('/images/adventure12.jpg')",
        "adventure12-dark":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('/images/adventure12.jpg')",
        pbbgTL:
          "url('/images/pbbgTL.jpg')",
        pbbgIL:
          "url('/images/pbbgIL.jpg')",
        pbbgIR:
          "url('/images/pbbgIR.jpg')",
        pbbgTR:
          "url('/images/pbbgTR.jpg')",
        pbbgBL:
          "url('/images/pbbgBL.jpg')",
        pbbgM:
          "url('/images/pbbgM.jpg')",
        pbbgBR:
          "url('/images/pbbgBR.jpg')",
      },
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
