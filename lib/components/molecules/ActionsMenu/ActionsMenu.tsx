import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './ActionsMenu.module.scss'
import {
  CopyOutline,
  EditOutline,
  MoreHorizontal,
  PersonAddOutline,
  TrashOutline,
} from 'assets/icons'
import { Typography } from 'components/atoms'

const ActionsMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={s.toggle} aria-label="Open menu">
          <MoreHorizontal />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={s.menu}
          align="end"
          onCloseAutoFocus={e => e.preventDefault()}
        >
          <DropdownMenu.Item className={s.item}>
            <EditOutline />
            <Typography variant="regular_14">Edit Post</Typography>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={s.item}>
            <TrashOutline />
            <Typography variant="regular_14">Delete Post</Typography>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={s.item}>
            <PersonAddOutline />
            <Typography variant="regular_14">Follow</Typography>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={s.item} disabled>
            <CopyOutline />
            <Typography variant="regular_14">Copy Link</Typography>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export { ActionsMenu }
