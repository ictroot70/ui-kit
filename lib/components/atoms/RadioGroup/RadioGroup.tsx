import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import s from './RadioGroup.module.scss'

/**
 * RadioGroup Component
 *
 * This component renders a styled radio group using Radix UI's RadioGroup primitives.
 * It allows users to select a single option from a predefined set.
 *
 * ## Features
 * - Two radio options with visual styling based on state (`default`, `checked`, `hover`, `focus`, `active`, `disabled`)
 * - Keyboard accessible
 * - Fully styled with SCSS modules
 *
 * @component
 * @example
 * ```tsx
 * <RadioGroup />
 * ```
 *
 * @returns {JSX.Element} The rendered radio group component with two options.
 */

const RadioGroup = () => (
  <form>
    <RadixRadioGroup.Root className={s.root} defaultValue="default" aria-label="View density">
      <div className={s.wrapper}>
        <RadixRadioGroup.Item className={s.item} value="default" id="r1">
          <span className={s.circle}>
            <RadixRadioGroup.Indicator className={s.dot} />
          </span>
        </RadixRadioGroup.Item>
        <label className={s.label} htmlFor="r1">
          RadioGroup
        </label>
      </div>

      <div className={s.wrapper}>
        <RadixRadioGroup.Item className={s.item} value="other" id="r2">
          <span className={s.circle}>
            <RadixRadioGroup.Indicator className={s.dot} />
          </span>
        </RadixRadioGroup.Item>
        <label className={s.label} htmlFor="r2">
          RadioGroup
        </label>
      </div>
    </RadixRadioGroup.Root>
  </form>
)

export default RadioGroup
