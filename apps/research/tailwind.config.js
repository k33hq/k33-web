const sharedConfig = require('tailwind-config/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme.extend,
      backgroundImage: {
        ...sharedConfig.theme.extend.backgroundImage,
        'category-products': "url('../assets/product.svg')",
        landing: "url('../assets/landing.svg')",
        sub: "url('../assets/sub.png')",
      },
    },
  },
  plugins: [
    require('tailwind-gradient-mask-image'),
    require('@tailwindcss/line-clamp'),
  ],
};
