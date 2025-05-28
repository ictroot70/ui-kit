import type { Meta, StoryObj } from '@storybook/react';

import styles from './SelectLanguage.module.scss';

import { SelectLanguage } from './SelectLanguage';

const meta: Meta<typeof SelectLanguage> = {
  component: SelectLanguage,
  tags: ['autodocs'],
  title: 'Components/SelectLanguage',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { value: 'English', label: 'English' },
      { value: 'Russian', label: 'Русский' },
    ],
    value: 'English',
    className: styles.classNameForStorybook,
  },
};

