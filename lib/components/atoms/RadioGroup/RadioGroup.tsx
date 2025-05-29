import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import './RadioGroup.scss'

const RadioGroup = () => (
  <form className="container">
    <RadixRadioGroup.Root className="radio-root" defaultValue="default" aria-label="View density">
      {['default', 'comfortable', 'compact'].map((value, i) => (
        <div className="radio-wrapper" key={value}>
          <RadixRadioGroup.Item className="radio-item" value={value} id={`r${i + 1}`}>
            <div className="circle">
              <div className="dot" />
            </div>
            <RadixRadioGroup.Indicator className="radio-indicator" />
          </RadixRadioGroup.Item>
          <label className="radio-label" htmlFor={`r${i + 1}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </label>
        </div>
      ))}
    </RadixRadioGroup.Root>
  </form>
)

export default RadioGroup
