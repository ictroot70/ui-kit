'use client'

import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import clsx from 'clsx'

import s from './Input.module.scss'

import Eye from 'assets/icons/components/Eye'
import EyeOff from 'assets/icons/components/EyeOff'
import Search from 'assets/icons/components/Search'
import { Typography, ErrorMessage } from 'components/atoms'
import { LabelRadix } from 'components/molecules'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
  error?: string
  placeholder?: string
  inputType: 'text' | 'hide-able' | 'search'
  disabled?: boolean
  required?: boolean
  id?: string
}

/**
 * `Input` is a component that renders an input field with a label, error message, and optional icon.
 *
 * ## Features:
 * - Renders an input field with a label, error message, and optional icon
 * - Supports text, hide-able, and search input types
 * - Supports disabled state
 * - Supports required state
 * - Supports search input type
 *
 * ## Examples:
 * ```tsx
 * <Input label="Email" placeholder="Enter your email" inputType="text" />
 * <Input label="Password" placeholder="Enter your password" inputType="hide-able" />
 * <Input label="Search" placeholder="Search" inputType="search" />
 * ```
 *
 * - @param props - Props for the `Input` component
 * - @param props.id - The id for the input field
 * - @param props.placeholder - The placeholder text for the input field
 * - @param props.label - The label for the input field
 * - @param props.error - The error message to display
 * - @param props.inputType - The type of input field to render
 * - @param props.disabled - Whether the input field is disabled
 * - @param props.required - Whether the input field is required
 * - @param props.className - Optional additional class names
 *
 * InputType:
 * - text: Renders a text input field
 * - hide-able: Renders a password input field that can be toggled to show/hide the password
 * - search: Renders a search input field with a search icon
 *
 * @returns A `ReactElement` displaying a styled input field with a label, error message, and optional icon
 */

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, inputType, className, placeholder, disabled, required, id, ...props }, ref) => {
    const [value, setValue] = useState('')
    const [type, setType] = useState(inputType === 'hide-able' ? 'password' : 'text')

    const handleToggle = () => {
      if (!disabled) {
        if (type === 'password') {
          setType('text')
        } else {
          setType('password')
        }
      }
    }

    return (
      <div className={clsx(s.inputWrapper, disabled && s.disabled)}>
        {label && (
          <LabelRadix
            label={label}
            htmlFor={id}
            typographyVariant={'regular_14'}
            required={required}
            disabled={disabled}
            className={clsx(s.label)}
          />
        )}
        <Typography variant={'regular_16'} asChild>
          <div className={s.inputContainer}>
            {inputType === 'search' && (
              <span className={clsx(s.searchIcon, error && s.error)}>
                <Search />
              </span>
            )}
            <input
              value={value}
              type={type}
              placeholder={placeholder}
              ref={ref}
              id={id}
              className={clsx(s.input, error && s.error, className)}
              disabled={disabled}
              required={required}
              aria-required={required}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
              onChange={e => setValue(e.target.value)}
              {...props}
            />
            {inputType === 'hide-able' && (
              <button type={'button'} className={s.eyeButton} onClick={handleToggle}>
                {type === 'password' ? <EyeOff /> : <Eye />}
              </button>
            )}
          </div>
        </Typography>
        {error && <ErrorMessage message={error} variant={'danger'} />}
      </div>
    )
  }
)

Input.displayName = 'Input'
