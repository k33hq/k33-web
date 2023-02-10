/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [`src/**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--poppins-font)', ...fontFamily.sans],
      },
      backgroundImage: {
        'category-products': "url('../assets/product.svg')",
      },
      dropShadow: {
        xl: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        sm: '5px',
        md: '12px',
        lg: '16px',
        xl: '96px',
        full: '24px',
      },
    },
    container: {
      center: true,
      screens: {
        sm: '375px',
        md: '912px',
        lg: '1488px',
      },
    },
    fontSize: {
      heading1: [
        '104px',
        {
          lineHeight: '112px',
          fontWeight: 600,
        },
      ],
      heading2: [
        '80px',
        {
          lineHeight: '96px',
          fontWeight: 600,
        },
      ],
      heading3: [
        '72px',
        {
          lineHeight: '88px',
          fontWeight: 600,
        },
      ],
      heading4: [
        '64px',
        {
          lineHeight: '80px',
          fontWeight: 600,
        },
      ],
      heading5: [
        '48px',
        {
          lineHeight: '56px',
          fontWeight: 600,
        },
      ],
      heading6: [
        '40px',
        {
          lineHeight: '48px',
          fontWeight: 600,
        },
      ],
      heading7: [
        '32px',
        {
          lineHeight: '40px',
          fontWeight: 500,
        },
      ],
      heading8: [
        '24px',
        {
          lineHeight: '32px',
          fontWeight: 500,
        },
      ],
      body1: [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: 500,
        },
      ],
      body2: [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: 400,
        },
      ],
      body3: [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: 300,
        },
      ],
      body4: [
        '14px',
        {
          fontStyle: 'normal',
          lineHeight: '24px',
          fontWeight: 400,
        },
      ],
      small: [
        '12px',
        {
          lineHeight: '16px',
          fontWeight: 400,
        },
      ],
      xsmall: [
        '10px',
        {
          lineHeight: '12px',
          fontWeight: 400,
        },
      ],
      caption: [
        '12px',
        {
          lineHeight: '16px',
          fontWeight: 500,
        },
      ],
    },
    colors: {
      brand: {
        light: {
          primary: '#090A0B',
          secondary: '#2D3339',
          tertiary: '#6C757D',
        },
        dark: {
          primary: '#ffffff',
          // remember to always use opacity at 60% for this
          secondary: '#EBEBF5',
          tertiary: '',
        },
      },
      label: {
        light: {
          primary: '#343A40',
          secondary: 'rgb(var(--color-label-light) / 0.7)',
          tertiary: 'rgb(var(--color-label-light) / 0.3)',
          quat: 'rgb(var(--color-label-light) / 0.16)',
        },
        dark: {
          primary: '#ffffff',
          secondary: 'rgb(var(--color-label-dark-secondary) / 0.7)',
          tertiary: 'rgb(var(--color-label-dark-tertiary) / 0.3)',
          quat: 'rgb(var(--color-label-dark-tertiary) / 0.16)',
        },
      },
      bg: {
        light: {
          primary: '#ffffff',
          secondary: '#f2f2f7',
          tertiary: '#f9f9f9',
        },
        dark: {
          primary: '#1c1c1e',
          secondary: '#2c2c2e',
          tertiary: '#3a3a3c',
        },
        'dark-elevated': {
          primary: '#1c1c1e',
          secondary: '#2c2c2e',
          tertiary: '#3a3a3c',
        },
      },
      default: {
        systemRed: {
          light: '#FF3B3',
          dark: '',
        },
        systemOrange: {
          light: '#FF9500',
        },
        systemYellow: {
          light: '#FFCC00',
        },
        systemGreen: {
          light: '#34C759',
        },
        systemTeal: {
          light: '#0071A4',
          dark: '#70d7ff',
        },
        systemBlue: {
          light: '#007AFF',
        },
        systemIndigo: {
          light: '#5856D6',
        },
        systemPurple: {
          light: '#AF52DE',
        },
        systemPink: {
          light: '#FF2D55',
        },
        systemGrey: {
          light: {
            1: '#8E8E93',
            2: '#AEAEB2',
            3: '#C7C7CC',
            4: '#D1D1D6',
            5: '#E5E5EA',
            6: '#F2F2F7',
          },
        },
      },
    },
  },
  plugins: [],
};
