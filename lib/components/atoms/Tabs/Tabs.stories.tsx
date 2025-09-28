import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tabs, TabsContent } from './Tabs'

const meta = {
  argTypes: {},
  component: Tabs,
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const wrapperStyle = {
  padding: '40px',
  backgroundColor: 'var(--color-dark-900)',
}

const templateContent = {
  modern:
    'Clean lines, neutral tones, and functional elegance define this space. Every element serves a purpose, creating harmony between form and utility. Less truly becomes more.',
  warm: 'Soft textures, earthy hues, and ambient lighting welcome you in. This cozy retreat balances comfort and style, making it perfect for relaxation and connection.',
  bold: 'Vibrant colors, mixed patterns, and curated art pieces ignite creativity. This dynamic space celebrates individuality, where every detail tells a unique story.',
}

const commonTabsArgs = {
  triggers: [
    { value: 'modern', title: 'Modern' },
    { value: 'warm', title: 'Warm' },
    { value: 'bold', title: 'Bold' },
  ],
  defaultValue: 'modern',
  children: (
    <div style={{ padding: '10px' }}>
      <TabsContent value={'modern'}>{templateContent.modern}</TabsContent>
      <TabsContent value={'warm'}>{templateContent.warm}</TabsContent>
      <TabsContent value={'bold'}>{templateContent.bold}</TabsContent>
    </div>
  ),
}

const Template = (args: Story['args']) => (
  <div style={wrapperStyle}>
    <Tabs {...args} />
  </div>
)

export const Default: Story = {
  args: commonTabsArgs,
  render: Template,
}

export const FullWidth: Story = {
  args: {
    ...commonTabsArgs,
    fullWidth: true,
  },
  render: Template,
}

export const WithDisabled: Story = {
  args: {
    ...commonTabsArgs,
    triggers: [
      { value: 'modern', title: 'Modern' },
      { value: 'warm', title: 'Warm', disabled: true },
      { value: 'bold', title: 'Bold' },
    ],
  },
  render: Template,
}
