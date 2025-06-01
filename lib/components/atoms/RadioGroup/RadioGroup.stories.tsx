import type { Meta, StoryObj } from '@storybook/react'
import RadioGroup from './RadioGroup'
import styles from './RadioGroup.module.scss'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof RadioGroup>

export const StatesGrid: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '40px', padding: '40px', background: '#1e1e1e' }}>
        {/* Default */}
        <div>
          <div className={styles.slabel}>Default</div>
          <RadioGroup value="default" onValueChange={() => {}} />
        </div>

        {/* Hover */}
        <div>
          <div className={styles.slabel}>Hover</div>
          <div style={{ pointerEvents: 'none' }}>
            <RadioGroup value="default" onValueChange={() => {}} />
          </div>
        </div>

        {/* Focus */}
        <div>
          <div className={styles.slabel}>Focus</div>
          <div className={`${styles['focus-visible-preview']} ${styles.sform}`}>
            <RadioGroup value="default" onValueChange={() => {}} />
          </div>
        </div>

        {/* Active */}
        <div>
          <div className={styles.slabel}>Active</div>
          <div className={`${styles['active-preview']} ${styles.sform}`}>
            <RadioGroup value="default" onValueChange={() => {}} />
          </div>
        </div>

        {/* Checked */}
        <div>
          <div className={styles.slabel}>Checked</div>
          <RadioGroup value="compact" onValueChange={() => {}} />
        </div>

        {/* Disabled */}
        <div>
          <div className={styles.slabel}>Disabled</div>
          <RadioGroup value="default" onValueChange={() => {}} disabled />
        </div>
      </div>
    )
  },
}
