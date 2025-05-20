import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from 'components/molecules/Alert/Alert'

const meta: Meta<typeof Alert> = {
  title: 'components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    message: 'This is a notification for demonstrating the ALERT component',
    closeable: true,
    onClose: () => alert('closed'),
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Success: Story = {
  args: {
    type: 'success',
    message: 'The operation was successful!',
  },
}

export const ErrorWithTitle: Story = {
  args: {
    type: 'error',
    title: 'Error! ',
    message: 'Photo size must be less than 10 MB!',
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'This is a warning message',
  },
}

export const Info: Story = {
  args: {
    type: 'info',
    message: 'This is an informational message',
  },
}

export const WithTitle: Story = {
  args: {
    type: 'info',
    title: 'Info',
    message: 'This is an informational message with a title',
  },
}

export const NotCloseable: Story = {
  args: {
    type: 'success',
    closeable: false,
    message: 'This message cannot be closed manually',
  },
}
