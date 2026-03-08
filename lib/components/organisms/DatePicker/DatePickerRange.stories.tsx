import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import labelRadixStyles from 'components/molecules/LabelRadix/LabelRadix.module.scss'

import { DatePickerRange, type DatePickerRangeProps } from './components'

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('Vacation Dates').closest('label')

    await expect(label).not.toBeNull()
    await expect(label).toHaveClass(labelRadixStyles.invalid)
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
