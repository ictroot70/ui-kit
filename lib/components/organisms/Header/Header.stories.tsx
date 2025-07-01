import type { Meta, StoryObj } from '@storybook/react'

import { BellOutline, RussiaFlag, UkFlag } from '../../../assets/icons'
import { Button, Typography } from '../../atoms'
import { Select } from '../../molecules'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
  parameters: {
    backgrounds: {
      // default: 'dark',
    },
  },
  argTypes: {
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    background: {
      control: 'color',
      description: 'Background color of the header',
    },

    isAuthorized: {
      control: 'boolean',
      description: 'Determines whether to show authorized or unauthorized header',
    },
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const HeaderStories: Story = {
  args: {
    logo: <Typography variant={'large'}>Inctagram</Typography>, // Here is necessary to use Typography component and Link in real project
    children: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        <button type={'button'}>
          <BellOutline size={24} />
        </button>
        <div style={{ paddingInline: '45px 36px' }}>
          <Select
            width={'163px'}
            defaultValue={'en'}
            placeholder={'Select...'}
            items={[
              { value: 'en', label: 'English', icon: <UkFlag /> },
              { value: 'rus', label: 'Russian', icon: <RussiaFlag /> },
            ]}
            onValueChange={() => {}}
          />
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Button variant={'text'}>Login</Button>
          <Button>Logout</Button>
        </div>
      </div>
    ),
  },
}
