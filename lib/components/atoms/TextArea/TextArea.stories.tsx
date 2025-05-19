import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from './TextArea'

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'TextArea',
    placeholder: 'Type something...'
  }
}

export const Error: Story = {
  args: {
    placeholder: 'Type something...',
    error: 'Error text',
    label: 'Error'
  }
}

export const Hover: Story = {
  args: {
    placeholder: 'Type something...',
    value: 'Hover over me'
  },
  parameters: {
    pseudo: { hover: true }
  }
}

export const Focus: Story = {
  args: {
    placeholder: 'Type something...',
    value: 'Focused textarea'
  },
  parameters: {
    pseudo: { focus: true }
  }
}

export const Disabled: Story = {
  args: {
    placeholder: 'Type something...',
    disabled: true,
    value: 'Disabled textarea',
    label: 'Disabled TextArea'
  }
}