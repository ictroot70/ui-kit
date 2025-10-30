import type { Meta, StoryObj } from '@storybook/react'
import { ActionsMenu } from './ActionsMenu'

const meta = {
  title: 'Components/ActionsMenu',
  component: ActionsMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ActionsMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Disabled: Story = {}
