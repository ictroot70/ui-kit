import { Meta, StoryObj } from '@storybook/react'
import { RadioGroupRadix, RadioGroupRadixProps } from './RadioGroupRadix'
import { useState } from 'react'

const meta: Meta<typeof RadioGroupRadix> = {
  title: 'Components/RadioGroupRadix',
  component: RadioGroupRadix,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the radio group',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the radio group',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Marks the radio group as required',
    },
  },
} satisfies Meta<typeof RadioGroupRadix>
export default meta

type Story = StoryObj<typeof RadioGroupRadix>

export const Default: Story = {
  render: (args: RadioGroupRadixProps) => {
    const [value, setValue] = useState(args.defaultValue ?? '')

    return <RadioGroupRadix {...args} value={value} onValueChange={setValue} />
  },
  args: {
    label: 'Favorite fruit',
    defaultValue: 'apple',
    options: [
      { value: 'apple', label: 'Apple', id: 'radio-apple' },
      { value: 'banana', label: 'Banana', id: 'radio-banana' },
      { value: 'orange', label: 'Orange', id: 'radio-orange', disabled: true },
    ],
  },
}
