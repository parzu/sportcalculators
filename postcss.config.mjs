// Tailwind CSS v4 uses a dedicated PostCSS plugin instead of the old 'tailwindcss' plugin.
// The @tailwindcss/postcss package handles everything — no tailwind.config.ts needed.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
