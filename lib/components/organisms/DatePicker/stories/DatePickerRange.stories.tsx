import type { Meta, StoryObj } from '@storybook/react'

import { DatePickerRange, type DatePickerRangeProps } from '../components'

const meta: Meta<typeof DatePickerRange> = {
  title: 'Components/DatePicker/Range',
  component: DatePickerRange,
  tags: ['autodocs'],
  args: {
    label: 'Vacation Dates',
    placeholder: 'Select date range',
  },
}

export default meta
type Story = StoryObj<typeof DatePickerRange>

export const Default: Story = {
  render: (args: DatePickerRangeProps) => <DatePickerRange {...args} />,
}

export const WithDefaultDate: Story = {
  args: {
    defaultDate: {
      from: new Date(),
      to: (() => {
        const date = new Date()
        date.setDate(date.getDate() + 3)
        return date
      })(),
    },
  },
}

export const WithError: Story = {
  args: {
    error: 'Please select a date range.',
  },
}

export const WithHint: Story = {
  args: {
    hint: 'You can only select future dates.',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultDate: {
      from: new Date(),
      to: (() => {
        const date = new Date()
        date.setDate(date.getDate() + 3)
        return date
      })(),
    },
  },
}
