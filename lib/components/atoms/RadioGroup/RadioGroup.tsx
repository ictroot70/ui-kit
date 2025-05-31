import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import './RadixRadioGroup.module.scss'
import './styles.css'

import './styles.css'

const RadioGroup = () => (
  <form>
    <RadixRadioGroup.Root
      className="RadixRadioGroupRoot"
      defaultValue="default"
      aria-label="View density"
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadixRadioGroup.Item className="RadixRadixRadioGroupItem" value="default" id="r1">
          <RadixRadioGroup.Indicator className="RadixRadixRadioGroupIndicator" />
        </RadixRadioGroup.Item>
        <label className="Label" htmlFor="r1">
          Default
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadixRadioGroup.Item className="RadixRadixRadioGroupItem" value="comfortable" id="r2">
          <RadixRadioGroup.Indicator className="RadixRadixRadioGroupIndicator" />
        </RadixRadioGroup.Item>
        <label className="Label" htmlFor="r2">
          Comfortable
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadixRadioGroup.Item className="RadixRadixRadioGroupItem" value="compact" id="r3">
          <RadixRadioGroup.Indicator className="RadixRadixRadioGroupIndicator" />
        </RadixRadioGroup.Item>
        <label className="Label" htmlFor="r3">
          Compact
        </label>
      </div>
    </RadixRadioGroup.Root>
  </form>
)

export default RadioGroup
