import { Typography, TypographyVariant } from 'components/atoms'
import styles from 'components/molecules/Alert/components/AlertContent/AlertContent.module.scss'

type Props = {
  title?: string
  message: string
  variant: TypographyVariant
}

export const AlertContent = ({ title, message, variant }: Props) => (
  <div className={styles.root}>
    {title && (
      <Typography className={styles.title} variant="bold_16">
        {title}
      </Typography>
    )}
    <Typography variant={variant}>{message}</Typography>
  </div>
)
