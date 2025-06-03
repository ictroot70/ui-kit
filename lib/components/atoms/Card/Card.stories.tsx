import type { Meta, StoryObj } from '@storybook/react'

import styles from './Card.module.scss'

import { Card } from './Card'

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <h1>Card</h1>
        <h4>Card content</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequatur dolorem ducimus
          et eum eveniet explicabo fugit in inventore ipsum itaque laborum laudantium magnam
          molestiae nobis quasi quibusdam quisquam recusandae reprehenderit saepe similique suscipit
          temporibus tenetur vel voluptas, voluptatem voluptatibus?
        </p>
      </>
    ),
    className: styles.classNameForStorybook,
  },
}
