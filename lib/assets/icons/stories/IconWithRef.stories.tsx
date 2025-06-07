import type { Meta, StoryObj } from '@storybook/react'

import { useRef } from 'react'

import { IconWrapper } from '../IconWrapper'
import ArrowBack from '../components/ArrowBack'
import Bell from '../components/Bell'
import BookmarkOutline from '../components/BookmarkOutline'

const meta: Meta<typeof IconWrapper> = {
  title: 'Components/Icons/Icon with Ref',
  component: IconWrapper,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
}

export default meta

type Story = StoryObj<typeof IconWrapper>

const IconsWithRefExample = () => {
  const bellRef = useRef<HTMLSpanElement>(null)
  const arrowBackRef = useRef<HTMLSpanElement>(null)
  const bookmarkRef = useRef<HTMLSpanElement>(null)

  const handleClick = () => {
    if (bellRef.current) {
      bellRef.current.style.color = 'var(--color-primary-500)'
    }

    if (arrowBackRef.current) {
      arrowBackRef.current.style.color = 'var(--color-success-500)'
    }

    if (bookmarkRef.current) {
      bookmarkRef.current.style.color = 'var(--color-danger-500)'
    }
  }

  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Bell ref={bellRef} size={32} />
      <ArrowBack ref={arrowBackRef} size={32} />
      <BookmarkOutline ref={bookmarkRef} size={32} />

      <button
        type={'button'}
        onClick={handleClick}
        style={{ padding: '8px 16px', cursor: 'pointer', background: 'var(--color-primary-500)' }}
      >
        Check ref
      </button>
    </div>
  )
}

export const Default: Story = {
  render: () => <IconsWithRefExample />,
}
