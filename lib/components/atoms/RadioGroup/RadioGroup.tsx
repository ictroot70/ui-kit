import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'
import s from './RadioGroup.module.scss'

export type Option<T> = {
  value: T
  label: string
}

type Props<T> = {
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
  name?: string
}

export const RadioGroup = <T extends string | number>({
  options,
  value,
  onChange,
  className,
  name,
}: Props<T>) => {
  return (
    <RadixRadioGroup.Root
      className={clsx(s.root, className)}
      value={String(value)}
      onValueChange={(val) => onChange(val as T)}
      name={name}
    >
      {options.map((option) => (
        <RadixRadioGroup.Item
          key={option.value}
          className={clsx(s.item, value === option.value && s.selected)}
          value={String(option.value)}
        >
          <span className={s.circle} />
          {option.label}
        </RadixRadioGroup.Item>
      ))}
    </RadixRadioGroup.Root>
  )
}