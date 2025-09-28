import type { Preview } from '@storybook/react-vite'
import '../lib/styles/index.scss'
// TODO: is necessary change background parameters for default theme
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

  tags: ['autodocs']
}

export default preview
