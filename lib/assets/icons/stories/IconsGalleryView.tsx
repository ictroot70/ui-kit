import { useEffect, useMemo, useRef, useState, type CSSProperties, type ElementType } from 'react'

import s from './IconsGalleryView.module.scss'

import * as Icons from '..'

type IconComponent = ElementType<{ size?: number }>
type ThemePalette = {
  text: string
  textMuted: string
  border: string
  surface: string
  surfaceAlt: string
  icon: string
}

const CELL_HEIGHT = 156
const CELL_MIN_WIDTH = 220
const LIST_HEIGHT = 680
const OVERSCAN_ROWS = 2
const DARK_THEME: ThemePalette = {
  text: '#fff',
  textMuted: '#8d9094',
  border: '#4c4c4c',
  surface: '#0d0d0d',
  surfaceAlt: '#171717',
  icon: '#fff',
}
const LIGHT_THEME: ThemePalette = {
  text: '#171717',
  textMuted: '#4c4c4c',
  border: '#d5dae0',
  surface: '#fff',
  surfaceAlt: '#f5f7fa',
  icon: '#0d0d0d',
}

const isIconComponent = (value: unknown): value is IconComponent => {
  if (typeof value === 'function') {
    return true
  }

  return Boolean(value && typeof value === 'object' && '$$typeof' in value)
}
const iconEntries = Object.entries(Icons)
  .filter(([, c]) => isIconComponent(c))
  .map(([name, component]) => ({ name, component }))
  .sort((a, b) => a.name.localeCompare(b.name))

const parseRgb = (value: string): [number, number, number] | null => {
  const matches = value.match(/\d+(\.\d+)?/g)

  if (!matches || matches.length < 3) {
    return null
  }
  const red = Number(matches[0])
  const green = Number(matches[1])
  const blue = Number(matches[2])

  if ([red, green, blue].some(Number.isNaN)) {
    return null
  }

  return [red, green, blue]
}

const getClosestBackground = (element: HTMLElement | null): [number, number, number] | null => {
  let current = element

  while (current) {
    const color = window.getComputedStyle(current).backgroundColor

    if (color && color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)') {
      const rgb = parseRgb(color)

      if (rgb) {
        return rgb
      }
    }
    current = current.parentElement
  }

  return parseRgb(window.getComputedStyle(document.body).backgroundColor)
}

const isLightBackground = (rgb: [number, number, number]) => {
  const [red, green, blue] = rgb
  const luma = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255

  return luma > 0.6
}

const copyText = async (value: string) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)

    return
  }
  if (typeof document === 'undefined') {
    return
  }
  const textarea = document.createElement('textarea')

  textarea.value = value
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export const IconsGalleryView = () => {
  const [query, setQuery] = useState('')
  const [scrollTop, setScrollTop] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [useLightTheme, setUseLightTheme] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = viewportRef.current

    if (!node) {
      return
    }
    const updateWidth = () => setViewportWidth(node.clientWidth)

    updateWidth()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateWidth)

      return () => window.removeEventListener('resize', updateWidth)
    }
    const resizeObserver = new ResizeObserver(updateWidth)

    resizeObserver.observe(node)

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const updateTheme = () => {
      if (!rootRef.current) {
        return
      }
      const rgb = getClosestBackground(rootRef.current.parentElement)

      if (!rgb) {
        return
      }
      setUseLightTheme(isLightBackground(rgb))
    }

    updateTheme()
    const observer = new MutationObserver(updateTheme)

    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['class', 'style', 'data-theme'],
    })
    window.addEventListener('resize', updateTheme)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateTheme)
    }
  }, [])

  const filteredIcons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return iconEntries
    }

    return iconEntries.filter(icon => icon.name.toLowerCase().includes(normalizedQuery))
  }, [query])

  const theme = useMemo(() => (useLightTheme ? LIGHT_THEME : DARK_THEME), [useLightTheme])
  const cssVars = useMemo(
    () =>
      ({
        '--gallery-text': theme.text,
        '--gallery-text-muted': theme.textMuted,
        '--gallery-border': theme.border,
        '--gallery-surface': theme.surface,
        '--gallery-surface-alt': theme.surfaceAlt,
        '--gallery-icon': theme.icon,
      }) as CSSProperties,
    [theme]
  )

  const columns = Math.max(1, Math.floor((viewportWidth || CELL_MIN_WIDTH) / CELL_MIN_WIDTH))
  const totalRows = Math.ceil(filteredIcons.length / columns)
  const startRow = Math.max(0, Math.floor(scrollTop / CELL_HEIGHT) - OVERSCAN_ROWS)
  const endRow = Math.min(
    totalRows,
    Math.ceil((scrollTop + LIST_HEIGHT) / CELL_HEIGHT) + OVERSCAN_ROWS
  )
  const visibleRows = Math.max(0, endRow - startRow)
  const startIndex = startRow * columns
  const endIndex = Math.min(filteredIcons.length, startIndex + visibleRows * columns)
  const visibleIcons = filteredIcons.slice(startIndex, endIndex)

  const handleCopy = async (value: string, id: string) => {
    await copyText(value)
    setCopied(id)
    window.setTimeout(() => setCopied(current => (current === id ? null : current)), 1200)
  }

  return (
    <div ref={rootRef} className={s.root} style={cssVars}>
      <div className={s.container}>
        <div className={s.header}>
          <h2 className={s.title}>Icons Gallery</h2>
          <span className={s.count}>
            {filteredIcons.length} of {iconEntries.length}
          </span>
        </div>
        <input
          type={'search'}
          className={s.search}
          value={query}
          placeholder={'Search icon by name'}
          onChange={event => setQuery(event.currentTarget.value)}
        />
        <div
          ref={viewportRef}
          className={s.viewport}
          onScroll={event => setScrollTop(event.currentTarget.scrollTop)}
        >
          <div className={s.canvas} style={{ height: `${totalRows * CELL_HEIGHT}px` }}>
            <div
              className={s.grid}
              style={{
                top: `${startRow * CELL_HEIGHT}px`,
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {visibleIcons.map(icon => {
                const Icon = icon.component
                const importValue = `import { ${icon.name} } from '@ictroot/ui-kit/icons'`
                const jsxValue = `<${icon.name} size={24} />`
                const importId = `${icon.name}:import`
                const jsxId = `${icon.name}:jsx`
                const importClassName =
                  copied === importId ? `${s.button} ${s.buttonCopied}` : s.button
                const jsxClassName = copied === jsxId ? `${s.button} ${s.buttonCopied}` : s.button

                return (
                  <div key={icon.name} className={s.card}>
                    <div className={s.preview}>
                      <Icon size={24} />
                    </div>
                    <code className={s.name}>{icon.name}</code>
                    <div className={s.actions}>
                      <button
                        type={'button'}
                        className={importClassName}
                        onClick={() => handleCopy(importValue, importId)}
                      >
                        {copied === importId ? 'Copied' : 'Copy import'}
                      </button>
                      <button
                        type={'button'}
                        className={jsxClassName}
                        onClick={() => handleCopy(jsxValue, jsxId)}
                      >
                        {copied === jsxId ? 'Copied' : 'Copy JSX'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
