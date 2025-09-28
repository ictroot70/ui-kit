import { Meta, StoryObj } from '@storybook/react-vite'

import { Typography } from './Typography'

const meta: Meta<typeof Typography> = {
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'regular_16',
        'bold_16',
        'regular_14',
        'medium_14',
        'bold_14',
        'small_text',
        'semibold_small_text',
        'regular_link',
        'small_link',
        'danger',
        'danger_small',
      ],
    },
  },
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default',
  },
}

export const Large: Story = {
  args: {
    children: 'Large heading',
    variant: 'large',
  },
}

export const H1: Story = {
  args: {
    asChild: true,
    children: <h1>Heading level 1</h1>,
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    asChild: true,
    children: <h2>Heading level 2</h2>,
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    asChild: true,
    children: <h3>Heading level 3</h3>,
    variant: 'h3',
  },
}

export const Regular_text_16: Story = {
  args: {
    children: 'Regular 16px text',
    variant: 'regular_16',
  },
}

export const Bold_text_16: Story = {
  args: {
    children: 'Bold 16px text',
    variant: 'bold_16',
  },
}

export const Regular_text_14: Story = {
  args: {
    children: 'Regular 14px text',
    variant: 'regular_14',
  },
}

export const Medium_text_14: Story = {
  args: {
    children: 'Medium 14px text',
    variant: 'medium_14',
  },
}

export const Bold_text_14: Story = {
  args: {
    children: 'Bold 14px text',
    variant: 'bold_14',
  },
}

export const Small_text: Story = {
  args: {
    children: 'Regular 12px text',
    variant: 'small_text',
  },
}

export const Semibold_small_text: Story = {
  args: {
    children: 'Semibold 12px text',
    variant: 'semibold_small_text',
  },
}

export const Regular_link: Story = {
  args: {
    asChild: true,
    children: <a>Regular 14px link</a>,
    variant: 'regular_link',
  },
}

export const Small_link: Story = {
  args: {
    asChild: true,
    children: <a>Regular 12px link</a>,
    variant: 'small_link',
  },
}

export const Danger_text: Story = {
  args: {
    children: 'Error message',
    variant: 'danger',
  },
}

export const Small_danger_text: Story = {
  args: {
    children: 'Small error message',
    variant: 'danger_small',
  },
}
