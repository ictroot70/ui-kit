import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'
import s from './Input.module.scss'
import clsx from 'clsx'
import { Typography } from '../Typography'
import Search from '../../../assets/icons/components/Search'
import Eye from '../../../assets/icons/components/Eye'
import EyeOff from '../../../assets/icons/components/EyeOff'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
  error?: string
  placeholder?: string
  inputType: 'text' | 'hidden' | 'search'
  disabled?: boolean
}


export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, inputType, className, placeholder, disabled, ...props }, ref) => {
    const [value, setValue] = useState('')
    const [type, setType] = useState(inputType === 'hidden' ? 'password' : 'text')

    const handleToggle = () => {
      if (type === 'password') {
        setType('text')
      } else {
        setType('password')
      }
    }

    return (
      <Typography variant={'regular_14'} asChild>
        <div className={clsx(s.inputWrapper, disabled && s.disabled)}>
          {label && <label className={s.label}>{label}</label>}
          <Typography variant={'regular_16'} asChild>
            <div className={s.inputContainer}>
              {inputType === 'search' && <span className={s.searchIcon}><Search /></span>}
              <input
                value={value}
                type={type}
                placeholder={placeholder}
                ref={ref}
                className={clsx(s.input, error && s.error, className)}
                disabled={disabled}
                onChange={(e) => setValue(e.target.value)}
                {...props}
              />
              {inputType === 'hidden' &&
                (
                  <button className={s.eyeButton} onClick={handleToggle}>
                    {type === 'password' ? (
                      <EyeOff />
                    ) : (
                      <Eye />
                    )}
                  </button>
                )
              }
            </div>
          </Typography>
          {error && <span className={s.errorText}>{error}</span>}
        </div>
      </Typography>
    )
  },
)

Input.displayName = 'Input'
