import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import s from './RadioGroup.module.scss'

const RadioGroup = () => (
  <form>
    <RadixRadioGroup.Root className={s.root} defaultValue="default" aria-label="View density">
      <div className={s.wrapper}>
        <RadixRadioGroup.Item className={s.item} value="default" id="r1">
          <RadixRadioGroup.Indicator className={s.indicator} />
        </RadixRadioGroup.Item>
        <label className={s.label} htmlFor="r1">
          RadioGroup
        </label>
      </div>

      <div className={s.wrapper}>
        <RadixRadioGroup.Item className={s.item} value="other" id="r2">
          <RadixRadioGroup.Indicator className={s.indicator} />
        </RadixRadioGroup.Item>
        <label className={s.label} htmlFor="r2">
          RadioGroup
        </label>
      </div>
    </RadixRadioGroup.Root>
  </form>
)

export default RadioGroup
