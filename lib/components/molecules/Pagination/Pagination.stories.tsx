import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';
 
const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    onPageChange: { action: 'pageChanged' },
    onItemsPerPageChange: { action: 'itemsPerPageChanged' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationWithState = (args: any) => {
  const [page, setPage] = useState(args.currentPage || 1);
  const [itemsPerPage, setItemsPerPage] = useState(args.itemsPerPage || 10);

  return (
    <div style={{
      minWidth: '800px',
      padding: '20px',
      position: 'relative',
      height: '100px',
      backgroundColor: 'black'
    }}>
      <Pagination
        {...args}
        currentPage={page}
        itemsPerPage={itemsPerPage}
        onPageChange={setPage}
        onItemsPerPageChange={setItemsPerPage}
        className={args.className}
      />
    </div>
  );
};

const Template: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: {
    totalItems: 120,
    currentPage: 1,
    itemsPerPage: 10,
  } as any,
};

export const Default: Story = {
  ...Template
};

export const ManyPages: Story = {
  ...Template,
  args: {
    ...Template.args,
    totalItems: 500,
    currentPage: 25,
  },
  name: 'Many Pages (500 items)',
};

export const FewItems: Story = {
  ...Template,
  args: {
    ...Template.args,
    totalItems: 15,
  },
  name: 'Few Items (15 items)',
};

export const LargeItemsPerPage: Story = {
  ...Template,
  args: {
    ...Template.args,
    itemsPerPage: 50,
  },
  name: '50 Items Per Page',
};

export const SinglePage: Story = {
  ...Template,
  args: {
    ...Template.args,
    itemsPerPage: 100,
  },
  name: 'Single Page (100 items)',
};

export const InsideComponent: Story = {
  ...Template,
  args: {
    ...Template.args,
    className: 'insideComponent',
  },
  name: 'Inside Component',
};

export const MobileView: Story = {
  ...Template,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  name: 'Mobile View',
};