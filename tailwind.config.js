/** @type {import('tailwindcss').Config} */

module.exports = {
  theme: {
      extend: {
          colors: {
              // Vous pouvez personnaliser les couleurs ici  
              gray: {
                  100: '#f9fafb', // couleur claire  
                  800: '#1f2937', // couleur sombre  
                  900: '#111827', // couleur très sombre  
              },
          },
      },
  },
  variants: {
      extend: {},
  },
  plugins: [],
};