// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'w-serverNav': '75px',
        'w-chatList': '384px',
      }
    },
  },
  plugins: [],
};
