const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
  loaders: [
    {
      test: require.resolve('tinymce/tinymce'),
      loaders: ['imports?this=>window', 'exports?window.tinymce'],
    },
    {
      test: /tinymce\/(themes|plugins)\//,
      loaders: ['imports?this=>window'],
    },
  ],
});
