/** @type {import('tailwindcss').Config} */

const generateHexColors = () => {
  const hexColors = [];
  for (let i = 0; i <= 255; i++) {
    const hex = i.toString(16).padStart(2, '0');
    hexColors.push(`bg-[#${hex}${hex}${hex}]`);
    hexColors.push(`hover:bg-[#${hex}${hex}${hex}]`);
    hexColors.push(`text-[#${hex}${hex}${hex}]`);
    hexColors.push(`border-[#${hex}${hex}${hex}]`);
  }
  return hexColors;
};

module.exports = {
  mode: 'jit',
  safelist: 
  [
      // Rumah amal
      'bg-[#48b1c9]',
      'bg-[#fcb82e]',
      'hover:bg-[#fcb82e]',
      'text-[#fcb82e]', 
      'border-[#fcb82e]',
      // -----------------
      // YMN
      'bg-[#EF6537]',
      'bg-[#4362E8]',
      'hover:bg-[#4362E8]',
      'text-[#4362E8]',
      'border-[#4362E8]',
      // -----------------
      // CNT
      'bg-[#2972b6]',
      'bg-[#e600e6]',
      'hover:bg-[#e600e6]',
      'text-[#e600e6]',
      'border-[#e600e6]',
      // -----------------
    ],
  
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};

