import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#f42c37',
        secondary: '#f42c37',
        axYellow: '#fdc62e',
        axGreen: '#2dcc6f',
        axBlue: '#1376f4',
        axDarkPurple: '#4527a1',
        axLightPurple: '#5e35b0',
        axWhite: '#ece6f5',
        axGray: '#edf1f5',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '3rem',
        },
      },
      boxShadow: {
        ax1: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      },
      backgroundImage: {
        profileGradient:
          'linear-gradient(to bottom, rgba(116, 185, 255, 0.2) 10%, rgba(255, 255, 255, 1))',
      },
    },
  },
  plugins: [],
};
export default config;
