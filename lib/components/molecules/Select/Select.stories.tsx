import type { Meta, StoryObj } from '@storybook/react'

import { expect, userEvent, waitFor, within } from '@storybook/test'

import labelRadixStyles from '../LabelRadix/LabelRadix.module.scss'
import styles from './Select.module.scss'

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
    classNames: {
      control: { type: 'object' },
    },
  },
  args: {
    defaultValue: 'React',
    label: 'Select',
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

export const CustomLabelClass: Story = {
  args: {
    label: 'Language Select Label',
    defaultValue: 'React',
    classNames: {
      label: 'custom-select-label',
    },
    items: baseItems,
  },
  render: args => (
    <div>
      <style>{`.custom-select-label { color: var(--color-danger-500); }`}</style>
      <Select {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('Language Select Label').closest('label')

    await expect(label).not.toBeNull()
    await expect(label).toHaveClass('custom-select-label')
  },
}

export const Error: Story = {
  args: {
    label: 'Select',
    error: 'This field is required',
    items: baseItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('Select').closest('label')
    const trigger = canvas.getByLabelText('Select')

    await expect(label).not.toBeNull()
    await expect(label).toHaveClass(labelRadixStyles.invalid)
    await expect(trigger).toHaveClass(styles.triggerError)
    await expect(canvas.getByText('This field is required')).toBeInTheDocument()
  },
}

export const AutoCollisionNearBottom: Story = {
  args: {
    label: 'Select near bottom',
    items: baseItems,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div
        style={{
          width: '100%',
          height: '95vh',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: '4px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: '200px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox', { name: 'Select near bottom' })

    await userEvent.click(trigger)

    await waitFor(() => {
      const content = canvasElement.ownerDocument.querySelector(
        '[data-state="open"][data-side]'
      ) as HTMLElement | null

      expect(content).not.toBeNull()
      expect(content).toHaveAttribute('data-side', 'top')
    })
  },
}

export const AutoCollisionNearTop: Story = {
  args: {
    label: 'Select near top',
    items: baseItems,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div
        style={{
          width: '100%',
          height: '95vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '4px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: '200px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox', { name: 'Select near top' })

    await userEvent.click(trigger)

    await waitFor(() => {
      const content = canvasElement.ownerDocument.querySelector(
        '[data-state="open"][data-side]'
      ) as HTMLElement | null

      expect(content).not.toBeNull()
      expect(content).toHaveAttribute('data-side', 'bottom')
    })
  },
}
