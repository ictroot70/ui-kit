import type { AlertType } from 'components/molecules'

export type Toast = {
  id: string
  type: AlertType
  title?: string
  message: string
  duration?: number
  closeable?: boolean
  pauseStart?: number
  remaining?: number
  createdAt: number
  timeoutId?: ReturnType<typeof setTimeout>
}
