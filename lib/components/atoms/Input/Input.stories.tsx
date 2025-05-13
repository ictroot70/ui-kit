import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
// import { SearchIcon } from '@radix-ui/react-icons'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
}

export const WithIcons: Story = {
  args: {
    // leftIcon: <SearchIcon />,
    placeholder: 'Search...',
  },
}

export const Error: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    error: 'Error text',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'You cannot type here',
    disabled: true,
  },
}

// For hover, focus, and active states, we can use pseudo-states
export const Interactive: Story = {
  parameters: {
    pseudo: {
      hover: true, // Shows hover state
      focus: true, // Shows focus state
      active: true, // Shows active state
    },
  },
  args: {
    placeholder: 'Interactive states example',
  },
}