import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Bookmark,
  BookmarkOutline,
  Home,
  HomeOutline,
  LogOut,
  MessageCircle,
  MessageCircleOutline,
  Person,
  PersonOutline,
  PlusSquare,
  PlusSquareOutline,
  Search,
  TrendingUp,
} from 'assets/icons'
import { Sidebar } from './Sidebar'
import { SidebarGroup } from './SidebarGroup'
import { SidebarLink } from './SidebarLink'

const meta = {
  component: Sidebar,
  title: 'Components/Sidebar',
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const linkGroups = [
  {
    links: [
      {
        href: '/feed',
        icon: <HomeOutline />,
        activeIcon: <Home />,
        label: 'Feed',
      },
      {
        href: '/create',
        icon: <PlusSquareOutline />,
        activeIcon: <PlusSquare />,
        label: 'Create',
      },
      {
        href: '/profile',
        icon: <PersonOutline />,
        activeIcon: <Person />,
        label: 'My Profile',
      },
      {
        href: '/messenger',
        icon: <MessageCircleOutline />,
        activeIcon: <MessageCircle />,
        label: 'Messenger',
      },
      {
        href: '/search',
        icon: <Search />,
        activeIcon: <Search />,
        label: 'Search',
      },
    ],
  },
  {
    links: [
      {
        href: '/statistics',
        icon: <TrendingUp />,
        activeIcon: <TrendingUp />,
        label: 'Statistics',
        disabled: true,
      },
      {
        href: '/favorites',
        icon: <BookmarkOutline />,
        activeIcon: <Bookmark />,
        label: 'Favorites',
      },
    ],
  },
  {
    links: [
      {
        href: '/logout',
        icon: <LogOut />,
        activeIcon: <LogOut />,
        label: 'Log Out',
      },
    ],
  },
]

const InteractiveSidebar = () => {
  const [activeLink, setActiveLink] = useState('/feed')

  const handleClick = (href: string, disabled?: boolean) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (!disabled) {
      setActiveLink(href)
    }
  }

  return (
    <>
      {linkGroups.map((group, index) => (
        <SidebarGroup key={index}>
          {group.links.map(link => (
            <SidebarLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              activeIcon={link.activeIcon}
              onClick={handleClick(link.href, link.disabled)}
              active={activeLink === link.href}
              disabled={link.disabled}
            >
              {link.label}
            </SidebarLink>
          ))}
        </SidebarGroup>
      ))}
    </>
  )
}

export const Default: Story = {
  args: {
    width: 220,
    children: <InteractiveSidebar />,
  },
}

export const WithScroll: Story = {
  args: {
    width: 220,
    children: <InteractiveSidebar />,
  },
  parameters: {
    viewport: {},
  },
  decorators: [
    Story => (
      <div style={{ height: '400px', border: '1px solid var(--color-primary-500)' }}>
        <Story />
      </div>
    ),
  ],
}
