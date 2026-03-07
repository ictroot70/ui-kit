import { join, resolve } from 'path'

import react from '@vitejs/plugin-react'
import analize from 'rollup-plugin-analyzer'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

import { dependencies, peerDependencies } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, join('lib', 'index.ts')),
        icons: resolve(__dirname, join('lib', 'icons.ts')),
        datepicker: resolve(__dirname, join('lib', 'datepicker.ts')),
        toast: resolve(__dirname, join('lib', 'toast.ts')),
        recaptcha: resolve(__dirname, join('lib', 'recaptcha.ts')),
        modal: resolve(__dirname, join('lib', 'modal.ts')),
        style: resolve(__dirname, join('lib', 'style.ts')),
      },
      fileName: (format, entryName) =>
        entryName === 'index' ? `ui-kit.${format}.js` : `${entryName}.${format}.js`,
      cssFileName: 'ui-kit',
      formats: ['es', 'cjs'],
      name: 'ui-kit',
    },
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        ...Object.keys(peerDependencies),
        ...Object.keys(dependencies),
      ],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    copyPublicDir: false,
    sourcemap: true,
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'lib'),
      providers: resolve(__dirname, 'lib/providers'),
      components: resolve(__dirname, 'lib/components'),
      assets: resolve(__dirname, 'lib/assets'),
    },
  },
  plugins: [
    tsconfigPaths(),
    react(),
    dts({
      rollupTypes: true,
    }),
    analize(),
  ],
})
