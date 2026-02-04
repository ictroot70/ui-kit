import type { StorybookConfig } from '@storybook/react-vite'
import { resolve } from 'path'

const config: StorybookConfig = {
  stories: ['../lib/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  viteFinal: async config => {
    if (config.plugins) {
      config.plugins = config.plugins.filter((plugin) => {
        if (!plugin || typeof plugin !== 'object' || !('name' in plugin)) return true;
        return plugin.name !== 'vite:dts' && plugin.name !== 'rollup-plugin-analyzer';
      });
    }
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
  },
}

export default config
