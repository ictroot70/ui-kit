import type { Meta, StoryObj } from '@storybook/react'
import './Card.module.scss'
import { CSSProperties } from 'react'

import { Card } from './Card'

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
}

export default meta
type Story = StoryObj<typeof meta>

const contentStyles: CSSProperties = {
  fontSize: '24px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
}

export const Default: Story = {
  args: {
    children: (
      <div style={contentStyles}>
        <h1>Card</h1>
        <p>Card content</p>
      </div>
    ),
  },
}
