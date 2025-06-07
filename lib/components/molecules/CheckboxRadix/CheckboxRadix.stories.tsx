import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { CheckboxRadix } from 'components/molecules/CheckboxRadix/CheckboxRadix'

const meta = {
  component: CheckboxRadix,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
  argTypes: {
    disabled: {
      control: 'radio',
      options: [true, false],
      description: 'Disable the checkbox',
    },
  },
} satisfies Meta<typeof CheckboxRadix>

const fruits = ['Apple', 'Banana', 'Orange']

export default meta
type Story = StoryObj<typeof meta>
const linkStyle = {
  color: '#66b2ff',
}

export const Controlled: Story = {
  args: {
    id: 'eeewww',
    errorMessage: 'required field',
    disabled: false,
    label: (
      <>
        I agree to the{' '}
        <a
          style={linkStyle}
          href={''}
          rel={'noopener noreferrer'}
          onClick={e => e.stopPropagation()}
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          style={linkStyle}
          href={''}
          rel={'noopener noreferrer'}
          onClick={e => e.stopPropagation()}
        >
          Privacy Policy
        </a>
      </>
    ),
    onChange: () => {},
  },
  render: args => {
    const [checked, setChecked] = useState(false)

    return (
      <CheckboxRadix {...args} checked={checked} onCheckedChange={() => setChecked(!checked)} />
    )
  },
}

export const Unchecked: Story = {
  args: {
    checked: false,
    label: 'Click me',
    onChange: () => {},
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Click me',
    onChange: () => {},
  },
}
export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Click me',
    onChange: () => {},
  },
}

export const DisabledUnchecked: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Click me',
    onChange: () => {},
  },
}

export const MasterWithChildren: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState<boolean[]>(() => fruits.map(() => false))

    const allChecked = checkedItems.every(Boolean)
    const someChecked = checkedItems.some(Boolean)
    let masterChecked: boolean | 'indeterminate'

    if (allChecked) {
      masterChecked = true
    } else if (someChecked) {
      masterChecked = 'indeterminate'
    } else {
      masterChecked = false
    }

    const toggleAll = (value: boolean) => {
      setCheckedItems(checkedItems.map(() => value))
    }

    const toggleOne = (index: number, value: boolean) => {
      const updated = [...checkedItems]

      updated[index] = value
      setCheckedItems(updated)
    }

    return (
      <div style={{ padding: 16 }}>
        <CheckboxRadix
          label={'Select all fruits'}
          checked={masterChecked}
          onCheckedChange={val => {
            if (typeof val === 'boolean') {
              toggleAll(val)
            }
          }}
        />

        <div style={{ marginLeft: 16, marginTop: 8 }}>
          {fruits.map((fruit, index) => (
            <CheckboxRadix
              key={fruit}
              label={fruit}
              checked={checkedItems[index]}
              onCheckedChange={val => toggleOne(index, val as boolean)}
            />
          ))}
        </div>
      </div>
    )
  },
}
