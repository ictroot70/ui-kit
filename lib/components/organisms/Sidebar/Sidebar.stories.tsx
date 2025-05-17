import type { Meta, StoryObj } from '@storybook/react'
import {
  BookmarkOutline,
  Home,
  HomeOutline,
  LogOut,
  MessageCircleOutline,
  PersonOutline,
  PlusSquare,
  PlusSquareOutline,
  Search,
  TrendingUp,
} from 'assets/icons'
import styles from './Sidebar.module.scss'
import { Sidebar, SidebarItem } from './Sidebar'

const meta = {
  component: Sidebar,
  title: 'Components/Sidebar',
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 220,
    children: (
      <>
        <div className={styles.group}>
          <SidebarItem as="a" href="/feed" icon={<HomeOutline />} activeIcon={<Home />} active>
            Feed
          </SidebarItem>
          <SidebarItem as="a" href="/create" icon={<PlusSquareOutline />}>
            Create
          </SidebarItem>
          <SidebarItem as="a" href="/profile" icon={<PersonOutline />}>
            My Profile
          </SidebarItem>
          <SidebarItem as="a" href="/messenger" icon={<MessageCircleOutline />}>
            Messenger
          </SidebarItem>
          <SidebarItem as="a" href="/search" icon={<Search />}>
            Search
          </SidebarItem>
        </div>
        <div className={styles.group}>
          <SidebarItem as="a" href="/statistics" icon={<TrendingUp />} disabled>
            Statistics
          </SidebarItem>
          <SidebarItem as="a" href="/favorites" icon={<BookmarkOutline />}>
            Favorites
          </SidebarItem>
        </div>
        <div className={styles.group}>
          <SidebarItem as="a" href="/logout" icon={<LogOut />}>
            Log Out
          </SidebarItem>
        </div>
      </>
    ),
  },
}

export const AllSidebarItemStates: Story = {
  args: {
    ...Default.args,
    children: (
      <>
        <div className={styles.group}>
          <SidebarItem as="a" href="/feed" icon={<HomeOutline />} activeIcon={<Home />}>
            Feed
          </SidebarItem>
          <SidebarItem
            as="a"
            href="/create"
            icon={<PlusSquareOutline />}
            activeIcon={<PlusSquare />}
            active
          >
            Create
          </SidebarItem>
          <SidebarItem as="a" href="/profile" icon={<PersonOutline />} disabled>
            My Profile
          </SidebarItem>
        </div>
      </>
    ),
  },
}
