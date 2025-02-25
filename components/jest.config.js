module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  testEnvironmentOptions: {resources: 'usable'},
  transformIgnorePatterns: ['/node_modules/(?!(lodash-es))'],
  moduleNameMapper: {
    '^!!raw-loader!(.*)$': '$1',
  },
  setupFiles: ['<rootDir>/jest.init.js'],
};
