import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme');
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#FFCA1D',
        strongAccent: '#E0B526',
        background: '#F2F2F2',
        foreground: '#4B4AEF',
        strongForeground: '#3534A7',
        orange:'#EB801D',
        green:'#85EFAC',
        greyWhite:'#F7F7FC'

      },
      fontFamily: {
        Poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
       },
    },
  },
  plugins: [],
};
export default config;
