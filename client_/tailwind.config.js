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
      },
      transitionTimingFunction: {
        'ease-in-out-custom': 'cubic-bezier(0.5, 0, 0.25, 1)',
        'ease-in-out-sine': 'cubic-bezier(0.37, 0, 0.63, 1)',
        'ease-in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'ease-in-out-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'ease-in-out-back': 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        'ease-in-out' : 'ease-in-out'
      },
    },
  },
  plugins: [],
};
