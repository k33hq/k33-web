const sharedConfig = require('tailwind-config/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  plugins: [require('@tailwindcss/typography')],
};
