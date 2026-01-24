import type { Meta, StoryObj } from '@storybook/react'

import { RussiaFlag, UkFlag } from '../../../assets/icons'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: { type: 'object' },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    defaultValue: 'React',
    label: 'Select-box',
    placeholder: 'React',
  },
  decorators: [
    Story => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof Select>

const baseItems = [
  { value: 'HTML', label: 'HTML' },
  { value: 'CSS', label: 'CSS' },
  { value: 'React', label: 'React' },
  { value: 'Redux', label: 'Redux' },
  { value: 'TypeScript', label: 'TypeScript' },
]

export const Default: Story = {
  args: {
    items: baseItems,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    items: baseItems,
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Select language',
    defaultValue: 'ru',
    items: [
      { value: 'ru', label: 'Russian', icon: <RussiaFlag /> },
      { value: 'en', label: 'English', icon: <UkFlag /> },
    ],
  },
}

export const SmallSize: Story = {
  args: {
    size: 'small',
    defaultValue: '10',
    label: undefined,
    items: [
      { value: '10', label: '10' },
      { value: '20', label: '20' },
      { value: '30', label: '30' },
      { value: '50', label: '50' },
      { value: '100', label: '100' },
    ],
  },
  decorators: [
    Story => (
      <div style={{ width: '50px' }}>
        <Story />
      </div>
    ),
  ],
}
