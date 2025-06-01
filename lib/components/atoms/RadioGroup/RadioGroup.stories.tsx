import { Meta, StoryObj } from '@storybook/react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import s from './RadioGroup.module.scss'

const meta: Meta = {
  title: 'Components/RadioGroup',
  component: RadixRadioGroup.Root,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1A1A1A' }],
    },
  },
}

export default meta

type Option = {
  value: string
  label: string
  disabled?: boolean
}

type TemplateProps = {
  defaultValue: string
  options: Option[]
}

type Story = StoryObj<TemplateProps>

const options: Option[] = [
  { value: 'one', label: 'Option 1' },
  { value: 'two', label: 'Option 2' },
]

const Template = ({ defaultValue, options }: TemplateProps) => (
  <form style={{ padding: 20 }}>
    <RadixRadioGroup.Root
      className={s.root}
      defaultValue={defaultValue}
      aria-label="Example radio group"
    >
      {options.map(({ value, label, disabled }) => (
        <div className={s.wrapper} key={value}>
          <RadixRadioGroup.Item
            className={s.item}
            value={value}
            disabled={disabled}
            id={`radio-${value}`}
          >
            <div className={s.circle}>
              <div className={s.dot} />
            </div>
          </RadixRadioGroup.Item>
          <label className={s.label} htmlFor={`radio-${value}`}>
            {label}
          </label>
        </div>
      ))}
    </RadixRadioGroup.Root>
  </form>
)

export const Default: Story = {
  render: Template,
  args: {
    defaultValue: 'one',
    options,
  },
}

export const Checked: Story = {
  render: Template,
  args: {
    defaultValue: 'two',
    options,
  },
}

export const Disabled: Story = {
  render: Template,
  args: {
    defaultValue: 'one',
    options: [
      { value: 'one', label: 'Disabled', disabled: true },
      { value: 'two', label: 'Disabled', disabled: true },
    ],
  },
}

export const Hover: Story = {
  ...Default,
  parameters: {
    pseudo: { hover: true },
  },
}

export const Focus: Story = {
  ...Default,
  parameters: {
    pseudo: { focusVisible: true },
  },
}

export const Active: Story = {
  ...Default,
  parameters: {
    pseudo: { active: true },
  },
}
