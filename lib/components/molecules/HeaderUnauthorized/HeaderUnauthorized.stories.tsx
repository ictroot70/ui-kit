import type { Meta, StoryObj } from '@storybook/react';

import { HeaderUnauthorized } from './HeaderUnauthorized';
import styles from './HeaderUnauthorized.module.scss';

const meta: Meta<typeof HeaderUnauthorized> = {
  component: HeaderUnauthorized,
  tags: ['autodocs'],
  title: 'Components/HeaderUnauthorized',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: styles.classNameForStorybook,
  },
};
