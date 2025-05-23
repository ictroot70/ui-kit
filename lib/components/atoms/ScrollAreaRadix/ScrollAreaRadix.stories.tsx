import { Meta, StoryObj } from '@storybook/react'
import { ScrollAreaRadix } from 'components/atoms/ScrollAreaRadix/ScrollAreaRadix'

import styles from './ScrollAreaRadix.module.scss' // убедись, что путь корректный

const meta: Meta<typeof ScrollAreaRadix> = {
  title: 'Components/ScrollAreaRadix',
  component: ScrollAreaRadix,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof ScrollAreaRadix>
const largeContentStyle = {
  alignItems: 'center',

  backgroundSize: '40px 40px',
  display: 'flex',
  height: 'fit-content',
  justifyContent: 'center',
  width: '800px',
}
export const Vertical: Story = {
  args: {
    className: styles.scrollAreaVertical_storybook,
    children: Array.from({ length: 50 }).map((_, i, a) => (
      <div
        key={i}
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid #eee',
          fontFamily: 'sans-serif',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'yellow',
            marginRight: '10px',
          }}
        />
        v1.2.0-beta.{a.length - i}
      </div>
    )),
  },
}
export const Horizontal: Story = {
  args: {
    className: styles.scrollAreaHorizontal_storybook,
    viewportClassName: styles.scrollAreaViewportHorizontal_storybook,
    children: (
      <div style={largeContentStyle}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              borderRadius: '8px',
              fontFamily: 'sans-serif',
              padding: '8px',
              width: '200px',
              marginRight: '12px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <img
              src={`https://picsum.photos/200/200?random=${i + 1}`}
              alt={`Random ${i + 1}`}
              style={{ borderRadius: '4px', objectFit: 'cover' }}
            />
            <div style={{ marginTop: '8px', textAlign: 'center' }}>
              <strong>Item {i + 1}</strong>
            </div>
          </div>
        ))}
      </div>
    ),
  },
}
