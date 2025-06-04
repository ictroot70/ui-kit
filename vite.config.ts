import { join, resolve } from 'path'

import react from '@vitejs/plugin-react'
import analize from 'rollup-plugin-analyzer'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import { dependencies, devDependencies, peerDependencies } from './package.json'
import path from 'node:path'

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
        dir: 'dist',
        entryFileNames: '[name].js',
        format: 'es',
        globals: {
          react: 'React',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    target: 'esnext',
    sourcemap: true,
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'lib'),
      providers: path.resolve(__dirname, 'lib/providers'),
      components: path.resolve(__dirname, 'lib/components'),
      assets: path.resolve(__dirname, 'lib/assets'),
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
