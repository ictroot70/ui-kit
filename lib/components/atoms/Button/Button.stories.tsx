import type { Meta, StoryObj } from '@storybook/react'

import { Person } from 'assets/icons'

import './Button.module.scss'

import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
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
    asChild: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof Button>

export const WithIconLeft: Story = {
  args: {
    children: (
      <>
        <Person /> Button with Icon
      </>
    ),
  },
}

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Button with Icon
        <Person />
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

// Пример использования as prop (приоритет 2)
export const AsLink: Story = {
  args: {
    as: 'a',
    href: '#',
    target: '_blank',
    children: 'Link Button (using as prop)',
    variant: 'primary',
  },
}

// Пример использования asChild (приоритет 1)
export const AsLinkWithSlot: Story = {
  args: {
    asChild: true,
    children: (
      <a href={'#'} target={'_blank'} rel={'noopener noreferrer'}>
        Link Button (using asChild)
      </a>
    ),
    variant: 'outlined',
  },
}

// Пример использования asChild с div
export const AsCustomElement: Story = {
  args: {
    asChild: true,
    children: (
      <div role={'button'} tabIndex={0}>
        Custom Element Button
      </div>
    ),
    variant: 'secondary',
  },
}

// Пример обычной кнопки (приоритет 3)
export const Text: StoryObj<typeof Button> = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
}
