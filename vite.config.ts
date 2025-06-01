import { join, resolve } from 'path'

import analize from 'rollup-plugin-analyzer'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

import { dependencies, devDependencies, peerDependencies } from './package.json'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, join('lib', 'index.ts')),
      fileName: format => `ui-kit.${format}.js`,
      formats: ['es', 'cjs'],
      name: 'ui-kit',
    },
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        ...Object.keys(peerDependencies),
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
    sourcemap: true,
    target: 'esnext',
  },
  plugins: [viteReact(), tsconfigPaths(), dts({ insertTypesEntry: true }), analize()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'lib'),
    },
  },
})
