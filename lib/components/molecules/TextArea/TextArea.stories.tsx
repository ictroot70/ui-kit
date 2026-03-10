import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import labelRadixStyles from '../LabelRadix/LabelRadix.module.scss'

import { TextArea } from './TextArea'

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'TextArea',
    placeholder: 'Type something...',
  },
}

export const Error: Story = {
  args: {
    placeholder: 'Type something...',
    error: 'Error text',
    label: 'Error',
    id: 'error',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('Error').closest('label')

    await expect(label).not.toBeNull()
    await expect(label).toHaveClass(labelRadixStyles.invalid)
  },
}

export const CustomLabelClass: Story = {
  args: {
    label: 'Comment',
    id: 'custom-label-textarea',
    placeholder: 'Type your comment...',
    labelClassName: 'custom-textarea-label',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('Comment').closest('label')

    await expect(label).not.toBeNull()
    await expect(label).toHaveClass('custom-textarea-label')
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Type something...',
    disabled: true,
    value: 'Disabled textarea',
    label: 'Disabled TextArea',
  },
}
