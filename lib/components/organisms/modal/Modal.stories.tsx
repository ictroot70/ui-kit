import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Button, Typography } from '../../atoms'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls visibility of the modal',
    },
    onClose: { action: 'closed' },
    modalTitle: {
      control: 'text',
      description: 'Modal window title',
    },
    className: {
      control: false,
    },
    children: {
      control: false,
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Modal>

// Компонент-обертка для управления состоянием
const ModalWithState = ({ children, modalTitle, ...args }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCloseModal = () => setIsOpen(false)

  // Клонируем children и передаем функцию закрытия в кнопки
  const enhancedChildren = typeof children === 'function' ? children(handleCloseModal) : children

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} open={isOpen} onClose={handleCloseModal} modalTitle={modalTitle}>
        {enhancedChildren}
      </Modal>
    </div>
  )
}

export const WithButton: Story = {
  render: args => (
    <ModalWithState {...args}>
      {(closeModal: () => void) => (
        <div>
          <Typography variant={'regular_16'} color={'light'}>
            We have sent a link to confirm your email to <b>epam@epam.com</b>.
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <Button onClick={closeModal}>OK</Button>
          </div>
        </div>
      )}
    </ModalWithState>
  ),
  args: {
    modalTitle: 'Email sent',
  },
}

export const Default: Story = {
  render: args => (
    <ModalWithState {...args}>
      <div>
        <Typography variant={'regular_16'} color={'light'}>
          We have sent a link to confirm your email to <b>epam@epam.com</b>.
        </Typography>
      </div>
    </ModalWithState>
  ),
  args: {
    modalTitle: 'Email sent',
  },
}

// Если нужна история с всегда открытым модальным окном для тестирования,
// используйте отдельную страницу Canvas, а не Docs
