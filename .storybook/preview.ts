import type { Preview } from '@storybook/react'
import '../lib/styles/index.scss'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [
        { name: 'Dark', value: '#1a1a1a' },
        { name: 'White', value: '#ffffff' },
        { name: 'Gray', value: '#B4B4B4' },
        { name: 'Dim', value: '#2d2d2d' },
        { name: 'Secondary', value: '#6c757d' },
      ],
    },
    tags: ['autodocs'],
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
