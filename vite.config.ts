import {resolve} from 'path';
import vue from '@vitejs/plugin-vue';
import {fileURLToPath, URL} from 'node:url';
import {defineConfig, type UserConfig} from 'vite';
import collectSass from './vite-plugin-collect-scss';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
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
          additionalData: `@import 'src/styles';`,
        },
      },
    },
  };
  if (mode === 'library') {
    baseConfig['build'] = {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'oxd',
        formats: ['es', 'umd'],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
      emptyOutDir: false,
    };

    baseConfig['plugins']?.push([collectSass()]);
  }
  return baseConfig;
});
