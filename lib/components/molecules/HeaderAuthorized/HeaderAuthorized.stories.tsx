import type { Meta, StoryObj } from '@storybook/react';

import { HeaderAuthorized } from './HeaderAuthorized';
import styles from './HeaderAuthorized.module.scss';

const meta: Meta<typeof HeaderAuthorized> = {
  component: HeaderAuthorized,
  tags: ['autodocs'],
  title: 'Components/Header',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: styles.classNameForStorybook,
  },
};
