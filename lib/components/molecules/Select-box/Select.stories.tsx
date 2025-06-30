import type { Meta, StoryObj } from '@storybook/react'

import s from './Select.module.scss'

import { RussiaFlag } from '../../../assets/icons'
import UkFlag from '../../../assets/icons/components/UkFlag'
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
  },
  args: {
    defaultValue: 'React',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof Select>

export const SelectLanguages: Story = {
  render: () => {
    return (
      <div style={{ width: '210px' }}>
        <Select
          label={'Select-box'}
          placeholder={'React'}
          items={[
            { value: 'HTML', label: 'HTML' },
            { value: 'CSS', label: 'CSS' },
            { value: 'React', label: 'React' },
            { value: 'Redux', label: 'Redux' },
            { value: 'TypeScript', label: 'TypeScript' },
          ]}
        ></Select>
      </div>
    )
  },
}

export const SelectDisabled: Story = {
  render: () => {
    return (
      <div style={{ width: '210px' }}>
        <Select
          label={'Select-box'}
          placeholder={'React'}
          disabled
          items={[
            { value: 'HTML', label: 'HTML' },
            { value: 'CSS', label: 'CSS' },
            { value: 'React', label: 'React' },
            { value: 'Redux', label: 'Redux' },
            { value: 'TypeScript', label: 'TypeScript' },
          ]}
        ></Select>
      </div>
    )
  },
}

export const SelectWithFlag: Story = {
  args: {
    label: 'Выберите язык',
    defaultValue: 'ru',
    items: [
      { value: 'ru', label: 'Русский', icon: <RussiaFlag /> },
      { value: 'en', label: 'Английский', icon: <UkFlag /> },
    ],
    disabled: false,
  },
}

export const SelectMedium: Story = {
  render: () => {
    return (
      <div className={s.pagination}>
        <Select
          width={'50px'}
          placeholder={'100'}
          pagination
          items={[
            { value: '10', label: '10' },
            { value: '20', label: '20' },
            { value: '30', label: '30' },
            { value: '50', label: '50' },
            { value: '100', label: '100' },
          ]}
        ></Select>
      </div>
    )
  },
}
