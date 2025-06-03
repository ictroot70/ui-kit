import type { Meta, StoryObj } from '@storybook/react'

import { ErrorMessage } from 'components/atoms/ErrorMessage/ErrorMessage'

const meta = {
  component: ErrorMessage,
  tags: ['autodocs'],
  title: 'Components/ErrorMessage',
  argTypes: {
    message: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ErrorMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: {
    message: 'This is an error message',
  },
}

export const Big: Story = {
  args: {
    ...Small.args,
    variant: 'danger',
  },
}
