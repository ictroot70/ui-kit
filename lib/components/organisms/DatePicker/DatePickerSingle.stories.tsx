import type { Meta, StoryObj } from '@storybook/react'

import { type ReactNode, useState } from 'react'

import { expect, userEvent, within } from '@storybook/test'
import { Typography } from 'components/atoms'

import labelRadixStyles from 'components/molecules/LabelRadix/LabelRadix.module.scss'

import { DatePickerSingle, type DatePickerSingleProps } from './components'

const meta: Meta<typeof DatePickerSingle> = {
  title: 'Components/DatePicker/Single',
  component: DatePickerSingle,
  tags: ['autodocs'],
  args: {
    label: 'Date of birth',
    placeholder: 'Select your date',
  },
}

export default meta
type Story = StoryObj<typeof DatePickerSingle>

export const Default: Story = {
  render: (args: DatePickerSingleProps) => <DatePickerSingle {...args} />,
}

export const WithDefaultValue: Story = {
  args: {
    defaultDate: new Date('2000-01-01'),
  },
}

export const WithError: Story = {
  args: {
    error: 'Date is required',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('Date of birth').closest('label')

    await expect(label).not.toBeNull()
    await expect(label).toHaveClass(labelRadixStyles.invalid)
  },
}

export const WithErrorReactNode: Story = {
  args: {
    error: (
      <Typography variant={'danger_small'} style={{ marginTop: '2px' }}>
        This is a custom <strong>ReactNode</strong> error!
      </Typography>
    ),
  },
}

export const WithHint: Story = {
  args: {
    hint: 'You can pick any date after today.',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultDate: new Date(),
  },
}

export const ControlledReset: Story = {
  render: (args: DatePickerSingleProps) => {
    const [date, setDate] = useState<Date | undefined>(undefined)

    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            data-testid={'set-date'}
            type={'button'}
            onClick={() => setDate(new Date('2011-12-12'))}
          >
            Set date
          </button>
          <button data-testid={'clear-date'} type={'button'} onClick={() => setDate(undefined)}>
            Clear date
          </button>
        </div>
        <DatePickerSingle
          {...args}
          value={date}
          defaultDate={new Date('2010-10-10')}
          onDateChange={setDate}
        />
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Select your date')).toBeInTheDocument()

    await userEvent.click(canvas.getByTestId('set-date'))
    await expect(canvas.getByText('12/12/2011')).toBeInTheDocument()

    await userEvent.click(canvas.getByTestId('clear-date'))
    await expect(canvas.getByText('Select your date')).toBeInTheDocument()
  },
}

export const WithAgeValidation: Story = {
  render: (args: DatePickerSingleProps) => {
    const link = (
      <a href={'#'} target={'_blank'} style={{ color: 'inherit' }} rel={'noreferrer'}>
        Privacy Policy
      </a>
    )
    const privacyPolicyMessage = (
      <Typography variant={'danger_small'} style={{ marginTop: '2px' }}>
        A user under 13 cannot create a profile. {link}
      </Typography>
    )
    const [date, setDate] = useState<Date | undefined>(new Date('2011-12-12'))
    const [error, setError] = useState<string | ReactNode | undefined>(privacyPolicyMessage)

    const handleDateChange = (selectedDate: Date | undefined) => {
      setDate(selectedDate)
      if (selectedDate) {
        const today = new Date()
        const birthDate = new Date(selectedDate)
        let age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }
        if (age < 13) {
          setError(privacyPolicyMessage)
        } else {
          setError(undefined)
        }
      }
    }

    return <DatePickerSingle {...args} value={date} onDateChange={handleDateChange} error={error} />
  },
  args: {
    label: 'Date of birth',
    calendarProps: {
      captionLayout: 'dropdown',
      fromYear: 1950,
      endMonth: new Date(),
    },
  },
}
