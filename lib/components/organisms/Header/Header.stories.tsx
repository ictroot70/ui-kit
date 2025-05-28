import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
  argTypes: {
    isAuthorized: {
      control: 'boolean',
      description: 'Determines whether to show authorized or unauthorized header',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Authorized: Story = {
  args: {
    isAuthorized: true,
  },
};

export const Unauthorized: Story = {
  args: {
    isAuthorized: false,
  },
};