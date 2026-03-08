import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'

import { useState } from 'react'

import labelRadixStyles from 'components/molecules/LabelRadix/LabelRadix.module.scss'

import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    background: 'dark',
  },
  argTypes: {
    label: { control: 'text' },
    labelClassName: { control: 'text' },
    feedbackSlotClassName: { control: 'text' },
    error: { control: 'text' },
    reserveErrorSpace: { control: 'boolean' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    id: 'email',
  },
}

export const Search: Story = {
  args: {
    placeholder: 'Search...',
    inputType: 'search',
  },
}

export const Hideable: Story = {
  args: {
    placeholder: 'Enter password',
    inputType: 'hide-able',
    label: 'Password',
    id: 'password',
    required: true,
  },
}

export const Error: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    error: 'Error text',
    defaultValue: 'Wrong value',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('Password').closest('label')

    await expect(label).not.toBeNull()
    await expect(label).toHaveClass(labelRadixStyles.invalid)
  },
}

export const CustomLabelClass: Story = {
  args: {
    label: 'Email',
    id: 'custom-label-input',
    placeholder: 'Enter your email',
    labelClassName: 'custom-input-label',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('Email').closest('label')

    await expect(label).not.toBeNull()
    await expect(label).toHaveClass('custom-input-label')
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'You cannot type here',
    disabled: true,
  },
}

export const ReservedErrorSpace: Story = {
  render: args => {
    const [showFirstError, setShowFirstError] = useState(false)
    const [showSecondError, setShowSecondError] = useState(false)

    return (
      <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button type={'button'} onClick={() => setShowFirstError(prev => !prev)}>
          Toggle first error
        </button>
        <button type={'button'} onClick={() => setShowSecondError(prev => !prev)}>
          Toggle second error
        </button>
        <Input
          {...args}
          id={'reserved-space-first'}
          label={'First name'}
          placeholder={'Enter first name'}
          reserveErrorSpace
          error={showFirstError ? 'First name is required' : undefined}
        />
        <Input
          id={'reserved-space-second'}
          label={'Second name'}
          placeholder={'Enter second name'}
          reserveErrorSpace
          error={showSecondError ? 'Second name is required' : undefined}
        />
        <div style={{ border: '1px dashed var(--color-dark-100)', padding: '8px' }}>
          Block below should not jump
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const firstToggle = canvas.getByRole('button', { name: 'Toggle first error' })
    const secondToggle = canvas.getByRole('button', { name: 'Toggle second error' })
    const secondInput = canvas.getByLabelText('Second name')
    const topBefore = secondInput.getBoundingClientRect().top

    await userEvent.click(firstToggle)
    await userEvent.click(secondToggle)

    await expect(canvas.getByText('First name is required')).toBeInTheDocument()
    await expect(canvas.getByText('Second name is required')).toBeInTheDocument()

    const topAfter = secondInput.getBoundingClientRect().top

    await expect(Math.round(topAfter)).toBe(Math.round(topBefore))
  },
}

export const ReservedErrorSpaceCompact: Story = {
  render: args => {
    const [showFirstError, setShowFirstError] = useState(false)
    const [showSecondError, setShowSecondError] = useState(false)

    return (
      <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <style>
          {`
            .compact-feedback-slot {
              min-height: 14px;
              margin-top: 0;
            }
          `}
        </style>
        <button type={'button'} onClick={() => setShowFirstError(prev => !prev)}>
          Toggle compact error
        </button>
        <button type={'button'} onClick={() => setShowSecondError(prev => !prev)}>
          Toggle compact second error
        </button>
        <Input
          {...args}
          id={'compact-space-first'}
          label={'Compact first name'}
          placeholder={'Enter first name'}
          reserveErrorSpace
          feedbackSlotClassName={'compact-feedback-slot'}
          error={showFirstError ? 'First name is required' : undefined}
        />
        <Input
          id={'compact-space-second'}
          label={'Compact second name'}
          placeholder={'Enter second name'}
          reserveErrorSpace
          feedbackSlotClassName={'compact-feedback-slot'}
          error={showSecondError ? 'Second name is required' : undefined}
        />
        <div style={{ border: '1px dashed var(--color-dark-100)', padding: '8px' }}>
          Compact block below should not jump
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const firstToggle = canvas.getByRole('button', { name: 'Toggle compact error' })
    const secondToggle = canvas.getByRole('button', { name: 'Toggle compact second error' })
    const secondInput = canvas.getByLabelText('Compact second name')
    const topBefore = secondInput.getBoundingClientRect().top

    await userEvent.click(firstToggle)
    await userEvent.click(secondToggle)

    await expect(canvas.getByText('First name is required')).toBeInTheDocument()
    await expect(canvas.getByText('Second name is required')).toBeInTheDocument()

    const topAfter = secondInput.getBoundingClientRect().top

    await expect(Math.round(topAfter)).toBe(Math.round(topBefore))
  },
}
