import { join, resolve } from 'path'

import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

import { dependencies, devDependencies } from './package.json'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, join('lib', 'index.ts')),
      fileName: format => `ui-kit.${format}.js`,
      formats: ['es', 'cjs'],
      // the proper extensions will be added
      name: 'ui-kit',
    },
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        ...Object.keys(dependencies),
        ...Object.keys(devDependencies),
      ],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    sourcemap: false,
    target: 'esnext',
  },
  plugins: [viteReact(), tsconfigPaths(), dts()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'lib'),
    },
  },
})
