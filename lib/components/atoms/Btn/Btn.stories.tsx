import type { Meta, StoryObj } from '@storybook/react';

import { Btn } from './Btn';
import styles from './Btn.module.scss';

const meta: Meta<typeof Btn> = {
  component: Btn,
  title: 'Components/Btn',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Вариант кнопки',
    },
    children: {
      control: 'text',
      description: 'Текст внутри кнопки',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Sign up',
    className: styles.classNameForStorybook,
  },
};
