import { Indicator, Item, Root } from '@radix-ui/react-radio-group'
import { LabelRadix } from 'components/molecules/LabelRadix'
import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactElement } from 'react'
import styles from './RadioGroupRadix.module.scss'
import clsx from 'clsx'

/**
 * # Describes a single radio option to be rendered inside the `RadioGroupRadix`.
 *
 * - @property {string} value - The value associated with the radio item.
 * - @property {string} label - The text label shown next to the radio item.
 *-  @property {string} [id] - Optional unique ID used for the radio input and its label association.
 */
export interface RadioOption {
  value: string
  label: string
  id?: string
}

/**
 * # Props for the `RadioGroupRadix` component.
 * ## Extends the native props of the `@radix-ui/react-radio-group` Root component.
 *
 * - @property {string} label - An accessible label for the radio group (used as `aria-label`).
 * - @property {RadioOption[]} [options] - An array of options to render as radio buttons.
 */
export interface RadioGroupRadixProps extends ComponentPropsWithoutRef<typeof Root> {
  label: string
  options?: RadioOption[]
}

/**
 * # `RadioGroupRadix` is a styled and accessible wrapper around Radix UI's Radio Group.
 * ### It renders a list of radio buttons based on provided options and supports keyboard navigation
 * ### and accessibility features as defined by the WAI-ARIA specification.
 *
 * ##The component supports horizontal and vertical layouts, and allows control via `value` or `defaultValue`.
 *
 * ## @component
 *
 * ### @example
 * ```tsx
 * <RadioGroupRadix
 *   label="Choose your role"
 *   name="role"
 *   required
 *   orientation="horizontal"
 *   options={[
 *     { value: 'admin', label: 'Admin' },
 *     { value: 'user', label: 'User' }
 *   ]}
 * />
 * ```
 *
 *  - @param {RadioGroupRadixProps} props - Props to configure the radio group behavior and appearance.
 *  - @param {string} props.label - Accessible label for the group (used as `aria-label`).
 *  - @param {RadioOption[]} [props.options] - List of options to display as radio items.
 *  - @param {string} [props.name] - The name attribute for all radio inputs.
 *  - @param {boolean} [props.required] - Whether the selection is required.
 *  - @param {string} [props.value] - Controlled value of the selected radio option.
 *  - @param {string} [props.defaultValue] - Default value for uncontrolled usage.
 *  - @param {string} [props.id] - Optional ID for the root container.
 *  - @param {boolean} [props.disabled] - Whether the radio group and all options are disabled.
 *  - @param {'horizontal' | 'vertical'} [props.orientation='vertical'] - Layout orientation.
 *  - @param {(value: string) => void} [props.onValueChange] - Callback when selected value changes.
 *  - @param {string} [props.className] - Additional classes for custom styling.
 *  - @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the root container.
 *
 *  - @returns {ReactElement} Rendered radio group component.
 */

export const RadioGroupRadix = forwardRef<ElementRef<typeof Root>, RadioGroupRadixProps>(
  (props, ref): ReactElement => {
    const {
      orientation = 'vertical',
      name,
      required,
      label,
      value,
      options = [],
      onValueChange,
      defaultValue,
      id,
      className,
      disabled,
      ...rest
    } = props
    const isDisabled = disabled ? '' : undefined
    return (
      <Root
        name={name}
        required={required}
        disabled={disabled}
        orientation={orientation}
        className={clsx(styles.root, styles[`orientation-${orientation}`], className)}
        data-slot="radio-group"
        value={value}
        id={id}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        aria-label={label}
        ref={ref}
        {...rest}
      >
        {options?.map(option => (
          <div key={option.id || option.value} className={clsx(styles.radioOption)}>
            <Item
              disabled={disabled}
              data-disabled={isDisabled}
              className={styles.item}
              data-slot="radio-item"
              value={option.value}
              id={option.id}
            >
              <Indicator data-slot="radio-indicator" className={styles.indicator} />
            </Item>
            <LabelRadix
              className={styles.label}
              data-disabled={isDisabled}
              required={required}
              htmlFor={option.id}
              label={option.label}
            />
          </div>
        ))}
      </Root>
    )
  }
)

RadioGroupRadix.displayName = 'RadioGroupRadix'
