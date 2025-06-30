import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './Tabs.module.scss'

export type TriggerType = {
  title: string
  disabled?: boolean
  value: string
}

export type TabsProps = {
  children?: ReactNode
  triggers: TriggerType[]
  fullWidth?: boolean
} & ComponentPropsWithoutRef<typeof TabsPrimitive.Root>

/**
 * `Tabs` is a customizable and accessible tabs component built with `@radix-ui/react-tabs`.
 * It provides a way to organize content into separate views that can be toggled via tab triggers.
 * This component wraps Radix's primitive with additional features like custom styling, full-width options,
 * and disabled state handling for triggers.
 *
 * ## Features:
 * - Customizable triggers via the triggers prop
 * - Supports full-width layout for triggers with the fullWidth prop
 * - Disabled state for individual triggers
 * - Fully accessible (keyboard navigation, ARIA attributes)
 * - Flexible content organization with TabsContent components
 *
 * ## Examples:
 * ```tsx
 * <Tabs triggers={[
 *   { value: 'tab1', title: 'Tab 1' },
 *   { value: 'tab2', title: 'Tab 2', disabled: true },
 *   { value: 'tab3', title: 'Tab 3' }
 * ]}>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 *   <TabsContent value="tab3">Content 3</TabsContent>
 * </Tabs>
 * ```
 *
 * ### Props
 * - `props` - Props for configuring the tabs component
 * - `props.triggers` - An array of trigger objects defining the tabs (`{ value: string, title: string, disabled?: boolean }`)
 * - `props.fullWidth` - When `true`, triggers will expand to fill available space
 * - `props.className` - Additional class name(s) for the root element
 * - `props.children` - `TabsContent` components to be rendered as tab panels
 *
 * ### Returns
 * - Fully styled and accessible tabs component with trigger navigation and content panels
 */

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
  value: string
}

/**
 * `TabsContent` is a component that renders the content for a specific tab.
 * It should be used as a child of the `Tabs` component and associated with a trigger via the `value` prop.
 *
 * ## Features:
 * - Associates content with a specific tab trigger via the `value` prop
 * - Automatically hides/shows content based on active tab
 * - Supports any React node as children
 *
 * ### Props
 * - `value` - A unique value that associates the content with its trigger
 * - `children` - The content to be rendered when the associated tab is active
 *
 * ### Returns
 * - A content panel that is shown when its associated tab is active
 */

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
