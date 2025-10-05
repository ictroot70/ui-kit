/* eslint-disable max-lines */
import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button, Separator, Typography } from '../../atoms'
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
    closeBtnOutside: {
      control: 'boolean',
      description: 'Show outside close button when there is no header',
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

export const WithoutHeaderOutsideClose: Story = {
  render: args => (
    <ModalWithState {...args} style={{ width: '972px', height: '564px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            background: 'rgba(0,0,0,0.59)',
            width: '490px',
            height: '562px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img width={'100%'} src={'https://cbc-group.kz/images/man.png'} alt={'man'} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
            <div
              style={{ width: '36px', height: '36px', background: '#f47008', borderRadius: '50%' }}
            />
            <Typography variant={'h3'} color={'light'}>
              UserName
            </Typography>
          </div>
          <Separator />
          <div style={{ display: 'flex', flexDirection: 'column', padding: '24px', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  flexShrink: 0,
                  background: '#081d79',
                  borderRadius: '50%',
                }}
              />

              <div>
                <Typography variant={'regular_14'} color={'light'}>
                  <strong> UserName</strong> Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                <Typography variant={'small_text'} style={{ color: '#8D9094' }}>
                  2 minute ago
                </Typography>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  flexShrink: 0,
                  background: '#ffffff',
                  borderRadius: '50%',
                }}
              />
              <div>
                <Typography variant={'regular_14'} color={'light'}>
                  <strong> UserName</strong> Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                <Typography variant={'small_text'} style={{ color: '#8D9094' }}>
                  2 hours ago
                </Typography>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  flexShrink: 0,
                  background: '#7f1414',
                  borderRadius: '50%',
                }}
              />
              <div>
                <Typography variant={'regular_14'} color={'light'}>
                  <strong> UserName</strong> Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                <Typography variant={'small_text'} style={{ color: '#8D9094' }}>
                  2 week ago
                </Typography>
              </div>
            </div>
            <div style={{ display: 'flex', textWrap: 'wrap', gap: '8px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  flexShrink: 0,
                  background: '#0b31d5',
                  borderRadius: '50%',
                }}
              />
              <div>
                <Typography variant={'regular_14'} color={'light'}>
                  <strong> UserName</strong> Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                <Typography variant={'small_text'} style={{ color: '#8D9094' }}>
                  2 day ago
                </Typography>
              </div>
            </div>
          </div>
          <Separator />
          <div style={{ display: 'flex', textWrap: 'wrap', gap: '8px', padding: '12px 24px 26px' }}>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  flexShrink: 0,
                  background: '#7f1414',
                  borderRadius: '50%',
                }}
              />
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  flexShrink: 0,
                  background: 'rgba(255,255,255,0.77)',
                  borderRadius: '50%',
                  marginLeft: '-8px',
                  zIndex: -1,
                }}
              />
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  flexShrink: 0,
                  background: '#0773e0',
                  borderRadius: '50%',
                  marginLeft: '-8px',
                  zIndex: -2,
                }}
              />
            </div>
            <div>
              <Typography variant={'regular_14'} color={'light'}>
                2 243 &quot;<strong>Like</strong>&quot;
              </Typography>
              <Typography variant={'small_text'} style={{ color: '#8D9094' }}>
                July 3, 2021
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </ModalWithState>
  ),
  args: {
    closeBtnOutside: true,
  },
}

export const WithoutHeader: Story = {
  render: args => (
    <ModalWithState {...args} style={{ width: '503px', height: '228px', paddingBottom: '50px' }}>
      <div>
        <Typography variant={'regular_16'} color={'light'}>
          We have sent a link to confirm your email to <b>epam@epam.com</b>.
        </Typography>
      </div>
    </ModalWithState>
  ),
  args: {},
}

const Header = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isHoveredSvg, setIsHoveredSvg] = useState(false)

  return (
    <div
      style={{
        padding: '18px 24px',
        width: '100%',
        height: '58px',
        // background: '#222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <button
        type={'button'}
        style={{
          padding: '0',
          color: isHoveredSvg ? '#397DF6' : '#d2cece',
        }}
        onMouseEnter={() => setIsHoveredSvg(true)}
        onMouseLeave={() => setIsHoveredSvg(false)}
      >
        &lt;
      </button>
      <Typography variant={'h1'}>Cropping</Typography>
      <button
        type={'button'}
        style={{
          padding: '0',
          color: isHovered ? '#d2cece' : '#397DF6',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Next
      </button>
    </div>
  )
}

const HoverButtons = () => {
  const [hovered, setHovered] = useState<string | null>(null)

  const buttons = ['original', '1:1', '4:5', '16:9']

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'space-between',
        padding: '12px 14px',
      }}
    >
      <div>
        {buttons.map(name => (
          <button
            type={'button'}
            key={name}
            style={{
              background: hovered === name ? '#397DF6' : 'none',
              border: 'none',
              padding: '6px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHovered(name)}
            onMouseLeave={() => setHovered(null)}
          >
            {name}
          </button>
        ))}
      </div>

      <div>
        <button
          type={'button'}
          style={{
            width: '24px',
            height: '24px',
            fontSize: hovered === 'dot' ? '33px' : '28px',
          }}
          onMouseEnter={() => setHovered('dot')}
          onMouseLeave={() => setHovered(null)}
        >
          📷
        </button>
      </div>
    </div>
  )
}

export const WithoutHeaderAndCloseBtn: Story = {
  render: args => (
    <ModalWithState {...args} style={{ width: '492px' }}>
      <Header />
      <div>
        <div>
          <img
            width={490}
            height={503}
            src={'https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg'}
            alt={'image'}
            aria-label={'image'}
            aria-describedby={'image'}
            loading={'lazy'}
          />
        </div>
        <HoverButtons />
        <div
          style={{ display: 'flex', gap: '30px', alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{ border: '2px solid blue' }}>
            <img
              width={50}
              height={50}
              src={'https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg'}
              alt={''}
            />
          </div>
          <div>
            <img
              width={50}
              height={50}
              src={'https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg'}
              alt={''}
            />
          </div>
          <div>
            <img
              width={50}
              height={50}
              src={'https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg'}
              alt={''}
            />
          </div>
        </div>
      </div>
    </ModalWithState>
  ),
  args: {},
}
// If you need a story with an always open modal window for testing,
// Use a separate Canvas page, not DOCS
