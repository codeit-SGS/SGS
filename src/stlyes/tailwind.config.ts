

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        tablet: '745px',
        pc: '1920px',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        '3xl': ['32px', '42px'],
        '2xl': ['24px', '32px'],
        'xl': ['20px', '32px'],
        '2lg': ['18px', '26px'],
        'lg': ['16px', '26px'],
        'md': ['14px', '24px'],
        'sm': ['13px', '22px'],
        'xs': ['12px', '20px'],
        '2xs': ['12px', '18px'],
      },
      colors: {
        black: '#101318',
        white: '#FFFFFF',
        'gray-100': '#F2F4F8',
        'gray-300': '#CFDBEA',
        'gray-500': '#9FACBD',
        'gray-800': '#2D3034',
        main: '#6A42DB',
        'main-10': '#F1EDFC',
      },
      spacing: {
        spacing: '0.0625rem', // 1px
      },
    },
  },
  plugins: [],
};

export default config;
