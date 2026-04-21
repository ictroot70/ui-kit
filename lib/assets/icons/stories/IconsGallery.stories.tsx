import type { Meta, StoryObj } from '@storybook/react'

import { IconsGalleryView } from './IconsGalleryView'

const meta: Meta<typeof IconsGalleryView> = {
  title: 'Components/Icons/_Gallery/All Icons',
  component: IconsGalleryView,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof IconsGalleryView>

export const Default: Story = {}
