import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import clsx from 'clsx'
import s from './tabs.module.scss'

export type TriggerType = {
  title: string
  disabled?: boolean
  /** A unique value that associates the trigger with a content. */
  value: string
}

type TabsProps = {
  /** Use TabsContent components as children. */
  children?: ReactNode
  /** An array of objects with the value and title of the trigger.
   *  {value: string, title: string}
   * */
  triggers: TriggerType[]
  fullWidth?: boolean
} & ComponentPropsWithoutRef<typeof TabsPrimitive.Root>

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, className, fullWidth, triggers, ...rest }, ref) => {
    const classNames = {
      root: clsx(s.root, className),
      trigger: clsx(s.trigger, fullWidth && s.fullWidth),
    }

    return (
      <TabsPrimitive.Root ref={ref} className={classNames.root} {...rest}>
        <TabsPrimitive.List className={s.list}>
          {triggers.map(trigger => (
            <TabsPrimitive.Trigger
              className={classNames.trigger}
              disabled={trigger.disabled}
              key={trigger.value}
              value={trigger.value}
            >
              {trigger.title}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
        {children}
      </TabsPrimitive.Root>
    )
  }
)

export type TabsContentProps = {
  children: ReactNode
  /** A unique value that associates the trigger with a content. */
  value: string
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ children, value, ...rest }, ref) => {
    return (
      <TabsPrimitive.Content ref={ref} className={s.content} value={value} {...rest}>
        {children}
      </TabsPrimitive.Content>
    )
  }
)

export { Tabs, TabsContent }
