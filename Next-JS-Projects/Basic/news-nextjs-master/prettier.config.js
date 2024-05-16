module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  singleQuote: true,
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.json'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
