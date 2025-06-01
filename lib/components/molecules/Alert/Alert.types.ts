import { TypographyVariant } from 'components/atoms'

export interface AlertProps {
  typographyVariant: variantType
  type: AlertType
  title?: string
  message: string
  onClose?: () => void
  closeable?: boolean
  className?: string
  duration?: number
  progressBar?: boolean
  progress?: number
}

export type AlertType = 'success' | 'error' | 'warning' | 'info'

type variantType = Extract<TypographyVariant, 'regular_16' | 'bold_16' | 'regular_14'>
