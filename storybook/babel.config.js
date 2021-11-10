module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['../'],
        extensions: ['.ts', '.tsx', '.vue', '.js', '.json'],
        alias: {
          '@ohrm/oxd': '../components/src',

          // storybook releated
          stories: './stories',
        },
      },
    ],
  ],
};
