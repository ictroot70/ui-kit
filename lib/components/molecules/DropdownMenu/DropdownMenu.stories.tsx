import type { Meta, StoryObj } from '@storybook/react'

import {
  BlockFull,
  EditOutline,
  MenuOutline,
  MoreHorizontal,
  PersonRemoveOutline,
  TrashOutline,
} from '../../../assets/icons'
import { DropdownMenu } from './DropdownMenu'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Edit Post',
        icon: <EditOutline />,
        onClick: () => console.log('Edit post'),
      },
      {
        label: 'Delete Post',
        icon: <TrashOutline />,
        onClick: () => console.log('Delete post'),
      },
    ],
  },
}

export const WithDisabledItems: Story = {
  args: {
    items: [
      {
        label: 'Delete User',
        icon: <PersonRemoveOutline />,
        onClick: () => console.log('Delete User'),
      },
      {
        label: 'Ban in the system',
        icon: <BlockFull />,
        onClick: () => console.log('Ban in the system'),
      },
      {
        label: 'More information',
        icon: <MoreHorizontal />,
        onClick: () => console.log('More information'),
        disabled: true,
      },
    ],
  },
}

export const WithCustomTrigger: Story = {
  args: {
    trigger: (
      <button type={'button'} style={{ cursor: 'pointer' }}>
        <MenuOutline />
      </button>
    ),
    items: [
      {
        label: 'Option 1',
        onClick: () => console.log('Option 1'),
      },
      {
        label: 'Option 2',
        onClick: () => console.log('Option 2'),
      },
    ],
  },
}

export const DifferentPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '40px' }}>
        <DropdownMenu
          items={[
            { label: 'Top Start', onClick: () => console.log('top start') },
            { label: 'Option 2', onClick: () => console.log('option 2') },
          ]}
          side={'top'}
          align={'start'}
        />
        <DropdownMenu
          items={[
            { label: 'Top Center', onClick: () => console.log('top center') },
            { label: 'Option 2', onClick: () => console.log('option 2') },
          ]}
          side={'top'}
          align={'center'}
        />
        <DropdownMenu
          items={[
            { label: 'Top End', onClick: () => console.log('top end') },
            { label: 'Option 2', onClick: () => console.log('option 2') },
          ]}
          side={'top'}
          align={'end'}
        />
      </div>

      <div style={{ display: 'flex', gap: '40px' }}>
        <DropdownMenu
          items={[
            { label: 'Bottom Start', onClick: () => console.log('bottom start') },
            { label: 'Option 2', onClick: () => console.log('option 2') },
          ]}
          side={'bottom'}
          align={'start'}
        />
        <DropdownMenu
          items={[
            { label: 'Bottom Center', onClick: () => console.log('bottom center') },
            { label: 'Option 2', onClick: () => console.log('option 2') },
          ]}
          side={'bottom'}
          align={'center'}
        />
        <DropdownMenu
          items={[
            { label: 'Bottom End', onClick: () => console.log('bottom end') },
            { label: 'Option 2', onClick: () => console.log('option 2') },
          ]}
          side={'bottom'}
          align={'end'}
        />
      </div>
    </div>
  ),
}

export const WithArrow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px' }}>
      <DropdownMenu
        items={[
          { label: 'Top Side', onClick: () => console.log('top side') },
          { label: 'With Arrow', onClick: () => console.log('with arrow') },
        ]}
        side={'top'}
        showArrow
      />
      <DropdownMenu
        items={[
          { label: 'Bottom Side', onClick: () => console.log('bottom side') },
          { label: 'With Arrow', onClick: () => console.log('with arrow') },
        ]}
        side={'bottom'}
        showArrow
      />
      <DropdownMenu
        items={[
          { label: 'Right Side', onClick: () => console.log('right side') },
          { label: 'With Arrow', onClick: () => console.log('with arrow') },
        ]}
        side={'right'}
        showArrow
      />
      <DropdownMenu
        items={[
          { label: 'Left Side', onClick: () => console.log('left side') },
          { label: 'With Arrow', onClick: () => console.log('with arrow') },
        ]}
        side={'left'}
        showArrow
      />
    </div>
  ),
}

export const WithCustomArrow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px' }}>
      <DropdownMenu
        items={[
          { label: 'Custom SVG Arrow', onClick: () => console.log('custom svg') },
          { label: 'Grey Arrow', onClick: () => console.log('grey arrow') },
        ]}
        showArrow
        arrow={
          <svg width={'16'} height={'8'} viewBox={'0 0 16 8'} fill={'none'}>
            <path d={'M8 8L0 0L16 0L8 8Z'} fill={'#4c4c4c'} />
          </svg>
        }
      />
      <DropdownMenu
        items={[
          { label: 'Custom SVG Arrow', onClick: () => console.log('custom svg') },
          { label: 'Grey Arrow', onClick: () => console.log('grey arrow') },
        ]}
        showArrow
        side={'top'}
        arrow={
          <svg width={'16'} height={'8'} viewBox={'0 0 16 8'} fill={'none'}>
            <path d={'M8 8L0 0L16 0L8 8Z'} fill={'#4c4c4c'} />
          </svg>
        }
      />
      <DropdownMenu
        items={[
          { label: 'Custom SVG Arrow', onClick: () => console.log('custom svg') },
          { label: 'Grey Arrow', onClick: () => console.log('grey arrow') },
        ]}
        showArrow
        side={'left'}
        arrow={
          <svg width={'16'} height={'8'} viewBox={'0 0 16 8'} fill={'none'}>
            <path d={'M8 8L0 0L16 0L8 8Z'} fill={'#4c4c4c'} />
          </svg>
        }
      />
      <DropdownMenu
        items={[
          { label: 'Custom SVG Arrow', onClick: () => console.log('custom svg') },
          { label: 'Grey Arrow', onClick: () => console.log('grey arrow') },
        ]}
        showArrow
        side={'right'}
        arrow={
          <svg width={'16'} height={'8'} viewBox={'0 0 16 8'} fill={'none'}>
            <path d={'M8 8L0 0L16 0L8 8Z'} fill={'#4c4c4c'} />
          </svg>
        }
      />
    </div>
  ),
}
