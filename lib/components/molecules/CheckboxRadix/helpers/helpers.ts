import clsx from 'clsx'

import s from 'components/molecules/CheckboxRadix/CheckboxRadix.module.scss'

export const getCheckboxClassNames = (disabled?: boolean, className?: string) => ({
  container: clsx(s.container, className, disabled && s.disabled),
  btnWrapper: clsx(s.btnWrapper, disabled && s.disabled),
  indicator: s.indicator,
  label: clsx(s.label, disabled && s.disabled),
})
