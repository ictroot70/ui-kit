import { Meta, StoryObj } from '@storybook/react'
import { ScrollAreaRadix } from 'components/atoms/ScrollAreaRadix/ScrollAreaRadix'

import './ScrollAreaRadix.module.scss' // убедись, что путь корректный

const meta: Meta<typeof ScrollAreaRadix> = {
  title: 'Components/ScrollAreaRadix',
  component: ScrollAreaRadix,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof ScrollAreaRadix>

export const Default: Story = {
  args: {
    children: Array.from({ length: 50 }).map((_, i, a) => (
      <div
        key={i}
        style={{
          padding: '6px 12px',
          borderBottom: '1px solid #eee',
          fontFamily: 'sans-serif',
        }}
      >
        v1.2.0-beta.{a.length - i}
      </div>
    )),
  },
}
