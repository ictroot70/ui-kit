import type { StorybookConfig } from '@storybook/react-vite'
import { resolve } from 'path'

const config: StorybookConfig = {
  stories: ['../lib/**/*.stories.@(ts|tsx|mdx)'],

  addons: [
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  viteFinal: async config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': resolve(__dirname, '../lib'),
          providers: resolve(__dirname, '../lib/providers'),
          components: resolve(__dirname, '../lib/components'),
          assets: resolve(__dirname, '../lib/assets'),
        },
      },
    }
  }
}

export default config
