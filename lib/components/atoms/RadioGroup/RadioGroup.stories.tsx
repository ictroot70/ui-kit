import React from 'react'
import type { Meta } from '@storybook/react'
import RadioGroup from './RadioGroup'
import styles from './RadioGroup.module.scss'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
}

export default meta

export const AllStates = () => {
  const values = ['default', 'comfortable', 'compact']

  return (
    <div className={styles['radio-group-showcase']}>
      {/* Default */}
      <div className={styles['state-column']}>
        <span>Default</span>
        <RadioGroup value="default" onValueChange={() => {}} />
      </div>

      {/* Active */}
      <div className={`${styles['state-column']} ${styles['state-active']}`}>
        <span>Active</span>
        <RadioGroup value="comfortable" onValueChange={() => {}} />
      </div>

      {/* Hover */}
      <div className={`${styles['state-column']} ${styles['state-hover']}`}>
        <span>Hover</span>
        <RadioGroup value="compact" onValueChange={() => {}} />
      </div>

      {/* Focus */}
      <div className={`${styles['state-column']} ${styles['state-focus']}`}>
        <span>Focus</span>
        <RadioGroup value="default" onValueChange={() => {}} />
      </div>

      {/* Disabled */}
      <div className={`${styles['state-column']} ${styles['state-disabled']}`}>
        <span>Disabled</span>
        <RadioGroup value="default" onValueChange={() => {}} />
      </div>
    </div>
  )
}
