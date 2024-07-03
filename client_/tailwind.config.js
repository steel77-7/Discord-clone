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
        'w-chatList': '300px',
      },
      height:{
        'dmHeight' : '610px'
      }
    },
  },
  plugins: [],
};
