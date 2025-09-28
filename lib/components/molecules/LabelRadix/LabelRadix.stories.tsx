import type { Meta, StoryObj } from '@storybook/react-vite'

import { LabelRadix } from 'components/molecules/LabelRadix/LabelRadix'

const meta = {
  component: LabelRadix,
  tags: ['autodocs'],
  title: 'Components/LabelRadix',
  argTypes: {
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof LabelRadix>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label Text',
    disabled: false,
    required: false,
    children: (
      <input style={{ color: 'var(--color-primary-500)' }} type={'email'} placeholder={'Email'} />
    ),
  },
}
