import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

const meta = {
  argTypes: {},
  component: Tabs,
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const WrapperStyle = {
  padding: '40px',
  width: '600px',
  backgroundColor: 'var(--color-dark-900)',
}

export const Default: Story = {
  args: {
    defaultValue: 'modern',
  },
  render: args => (
    <div style={WrapperStyle}>
      <Tabs {...args}>
        <TabsList>
          <TabsTrigger value={'modern'}>Modern</TabsTrigger>
          <TabsTrigger value={'warm'}>Warm</TabsTrigger>
          <TabsTrigger value={'bold'}>Bold</TabsTrigger>
        </TabsList>
        <div
          style={{
            padding: '10px',
          }}
        >
          <TabsContent value={'modern'}>
            {
              'Clean lines, neutral tones, and functional elegance define this space. Every element serves a purpose, creating harmony between form and utility. Less truly becomes more.'
            }
          </TabsContent>
          <TabsContent value={'warm'}>
            {
              'Soft textures, earthy hues, and ambient lighting welcome you in. This cozy retreat balances comfort and style, making it perfect for relaxation and connection.'
            }
          </TabsContent>
          <TabsContent value={'bold'}>
            {
              'Vibrant colors, mixed patterns, and curated art pieces ignite creativity. This dynamic space celebrates individuality, where every detail tells a unique story.'
            }
          </TabsContent>
        </div>
      </Tabs>
    </div>
  ),
}
