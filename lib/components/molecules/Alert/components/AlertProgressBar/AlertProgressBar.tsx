import styles from 'components/molecules/Alert/components/AlertProgressBar/AlertProgressBar.module.scss'

export interface AlertProgressBarProps {
  progress: number
}

export const AlertProgressBar = (props: AlertProgressBarProps) => {
  const { progress } = props
  return <div className={styles.progress} style={{ width: `${progress}%` }} />
}
