import type { Meta, StoryObj } from '@storybook/react-vite'

import { ToastProvider } from 'providers/ToastProvider/ToastProvider'
import { useToast } from 'providers/ToastProvider/hooks/useToast'

const meta: Meta<typeof ToastProvider> = {
  title: 'components/ToastProvider',
  component: ToastProvider,
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
    maxToasts: {
      control: { type: 'number', min: 1, max: 10 },
    },
    enableHoverPause: {
      control: 'boolean',
    },
    enableProgressBar: {
      control: 'boolean',
    },
  },
  args: {
    position: 'top-right',
    maxToasts: 3,
    enableHoverPause: true,
    enableProgressBar: true,
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof ToastProvider>

export const Interactive: Story = {
  render: args => (
    <ToastProvider {...args}>
      <DemoComponent />
    </ToastProvider>
  ),
}

const buttonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#0056b3',
  color: '#ffffff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
}
const DemoComponent = () => {
  const { toast } = useToast()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <button
        type={'button'}
        style={buttonStyle}
        onClick={() =>
          toast({
            type: 'success',
            title: ' ✅',
            message: 'Successfully uploaded the photo',
            duration: 3000,
            closeable: false,
          })
        }
      >
        Success
      </button>

      <button
        type={'button'}
        style={buttonStyle}
        onClick={() =>
          toast({
            type: 'error',
            title: '❌',
            message: 'The format of the uploaded photo must be PNG and JPEG',
            duration: 0,
            closeable: false,
          })
        }
      >
        Error
      </button>

      <button
        type={'button'}
        style={buttonStyle}
        onClick={() =>
          toast({
            type: 'info',
            title: 'ℹ️',
            message: 'This is just an information message',
            duration: 3000,
          })
        }
      >
        Info
      </button>

      <button
        type={'button'}
        style={buttonStyle}
        onClick={() =>
          toast({
            type: 'warning',
            title: '⚠️',
            message: 'Should you really do this?',
            duration: 5000,
          })
        }
      >
        Attention
      </button>
    </div>
  )
}
