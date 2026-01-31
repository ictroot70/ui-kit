import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Typography } from 'components/atoms'

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
    const [error, setError] = useState<string | React.ReactNode | undefined>(privacyPolicyMessage)

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
      toYear: new Date().getFullYear(),
    },
  },
}
