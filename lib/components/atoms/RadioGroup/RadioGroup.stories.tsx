import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import RadioGroup from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('default')
    return <RadioGroup value={value} onValueChange={setValue} />
  },
}

export const Checked: Story = {
  render: () => {
    const [value, setValue] = useState('compact')
    return <RadioGroup value={value} onValueChange={setValue} />
  },
}

export const Disabled: Story = {
  render: () => {
    return <RadioGroup value="default" onValueChange={() => {}} disabled />
  },
}
