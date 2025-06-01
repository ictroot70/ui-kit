import type { Meta, StoryObj } from '@storybook/react'
import './Recaptcha.module.scss'
import { RecaptchaStorybookWrapper } from 'components/molecules/Recaptcha/RecaptchaStorybookWrapper'

const TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
const meta: Meta<typeof RecaptchaStorybookWrapper> = {
  title: 'components/RecaptchaStorybookWrapper',
  component: RecaptchaStorybookWrapper,
  tags: ['autodocs'],
  args: {
    sitekey: TEST_SITE_KEY,
  },
  argTypes: {},
} satisfies Meta<typeof RecaptchaStorybookWrapper>

export default meta
type Story = StoryObj<typeof RecaptchaStorybookWrapper>

export const Default: Story = {
  args: {
    statusForStorybook: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: `
### Recaptcha
ℹ️ Developers can use their own real site key for testing purposes if they create one on the Google reCAPTCHA admin console for their local environment.

For more information on creating keys and configuring reCAPTCHA, see the official documentation:  
https://www.google.com/recaptcha/admin/create
      `.trim(),
      },
    },
  },
}

export const Error: Story = {
  args: {
    statusForStorybook: 'error',
  },
}

export const Expired: Story = {
  args: {
    statusForStorybook: 'expired',
  },
  decorators: [
    Story => (
      <>
        <Story />
        <p style={{ marginTop: 8, color: 'orange', fontStyle: 'italic' }}>
          To see the real state of <strong>Expireed</strong>, you need to wait about 2 minutes after
          passing checks.
        </p>
      </>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          '⚠️ To see the real state of `Expired`, you need to wait about 2 minutes after the successful passage of Recaptcha. In this story, we simulate this status manually',
      },
    },
  },
}
