import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import clsx from 'clsx'
import styles from './tabs.module.scss'

const Tabs = forwardRef<
  ElementRef<typeof TabsPrimitive.Root>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root className={clsx(styles.tabs, className)} ref={ref} {...props} />
))

const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List className={clsx(styles.list, className)} ref={ref} {...props} />
))

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger className={clsx(styles.trigger, className)} ref={ref} {...props} />
))

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content className={clsx(styles.content, className)} ref={ref} {...props} />
))

export { Tabs, TabsList, TabsTrigger, TabsContent }
