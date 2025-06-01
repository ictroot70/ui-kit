import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { Person } from 'assets/icons'
import './Button.module.scss'

const meta: Meta<typeof Button> = {
  title: 'Components/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'text'],
      defaultValue: 'primary',
    },
    fullWidth: { control: 'boolean' },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      defaultValue: 'left',
    },
    as: {
      control: 'select',
      options: ['button', 'a', 'div', 'span'],
      defaultValue: 'button',
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof Button>

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Person /> Button with Icon
      </>
    ),
    iconPosition: 'left',
  },
}
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    disabled: true,
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    href: '#',
    target: '_blank',
    children: 'Link Button',
    variant: 'primary',
  },
}

export const Text: StoryObj<typeof Button> = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
}
