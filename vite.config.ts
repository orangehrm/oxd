import {resolve} from 'path';
import pkg from './package.json';
import vue from '@vitejs/plugin-vue';
import {fileURLToPath, URL} from 'node:url';
import {defineConfig, type UserConfig} from 'vite';
import collectSass from './vite-plugin-collect-scss';

// https://vitejs.dev/config/
export default defineConfig((conf) => {
  const mode = conf.mode === 'library' ? 'lib' : 'dev';

  const baseConfig: UserConfig = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import 'src/styles/index.${mode}.scss';`,
        },
      },
    },
  };
  if (mode === 'lib') {
    baseConfig['build'] = {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'oxd',
        formats: ['es', 'umd'],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: [...Object.keys(pkg.dependencies)],
      },
      emptyOutDir: false,
    };

    baseConfig['plugins']?.push(collectSass());
  }
  return baseConfig;
});
