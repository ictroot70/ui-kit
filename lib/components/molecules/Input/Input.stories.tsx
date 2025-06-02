import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './Input'

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
    id: 'email',
  },
}

export const Search: Story = {
  args: {
    placeholder: 'Search...',
    inputType: 'search',
  },
}

export const Hideable: Story = {
  args: {
    placeholder: 'Enter password',
    inputType: 'hide-able',
    label: 'Password',
    id: 'password',
    required: true,
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
