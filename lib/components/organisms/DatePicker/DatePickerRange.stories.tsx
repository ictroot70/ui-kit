import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { expect, userEvent, within } from '@storybook/test'

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

export const ControlledReset: Story = {
  render: (args: DatePickerRangeProps) => {
    const [range, setRange] = useState<DatePickerRangeProps['value']>(undefined)

    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            data-testid={'set-range'}
            type={'button'}
            onClick={() => setRange({ from: new Date('2011-12-12'), to: new Date('2011-12-15') })}
          >
            Set range
          </button>
          <button data-testid={'clear-range'} type={'button'} onClick={() => setRange(undefined)}>
            Clear range
          </button>
        </div>
        <DatePickerRange
          {...args}
          value={range}
          defaultDate={{ from: new Date('2010-10-10'), to: new Date('2010-10-12') }}
          onDateChange={setRange}
        />
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Select date range')).toBeInTheDocument()

    await userEvent.click(canvas.getByTestId('set-range'))
    await expect(canvas.getByText('12/12/2011 - 15/12/2011')).toBeInTheDocument()

    await userEvent.click(canvas.getByTestId('clear-range'))
    await expect(canvas.getByText('Select date range')).toBeInTheDocument()
  },
}
