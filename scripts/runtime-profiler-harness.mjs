import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { chromium } from 'playwright'

const OUTPUT_ARG_PREFIX = '--output='

const toPosixPath = filePath => filePath.replaceAll(path.sep, '/')

const getOutputPath = () => {
  const outputArg = process.argv.find(arg => arg.startsWith(OUTPUT_ARG_PREFIX))

  if (!outputArg) {
    return path.resolve(process.cwd(), 'runtime-perf-metrics.json')
  }

  return path.resolve(process.cwd(), outputArg.slice(OUTPUT_ARG_PREFIX.length))
}

const assertDistEntry = filePath => {
  if (!existsSync(filePath)) {
    throw new Error(
      `Missing build artifact: ${filePath}. Run \`npm run build\` before profiling runtime performance.`
    )
  }
}

const buildHarnessBundle = (entryFile, bundleFile) => {
  execFileSync(
    'npm',
    [
      'exec',
      '--',
      'esbuild',
      entryFile,
      '--bundle',
      '--format=iife',
      '--platform=browser',
      '--target=es2019',
      '--outfile=' + bundleFile,
    ],
    {
      stdio: 'inherit',
      cwd: process.cwd(),
    }
  )
}

const createHarnessEntry = ({ distUiKitPath, distDatepickerPath, distToastPath }) => `
import React, { Profiler } from 'react'
import { createRoot } from 'react-dom/client'

import { DatePickerSingle } from '${toPosixPath(distDatepickerPath)}'
import { ToastContainer } from '${toPosixPath(distToastPath)}'
import { Input } from '${toPosixPath(distUiKitPath)}'

const waitForFrame = () => new Promise(resolve => requestAnimationFrame(() => resolve()))
const noop = () => {}
const noopById = () => {}

const buildToasts = count =>
  Array.from({ length: count }, (_, index) => ({
    id: 'toast-' + index,
    type: index % 2 === 0 ? 'success' : 'error',
    title: 'Toast ' + index,
    message: 'Message ' + index,
    duration: 4000,
    closeable: true,
    createdAt: Date.now(),
    pauseStart: undefined,
    remaining: 4000,
    timeoutId: undefined,
  }))

const runScenario = async ({ id, updates, createElement }) => {
  const mountNode = document.getElementById('runtime-profiler-root')

  if (!mountNode) {
    throw new Error('runtime-profiler-root not found')
  }

  const root = createRoot(mountNode)
  let commitCount = 0
  let totalActualDuration = 0
  const profileSamples = []

  const onRender = (_id, _phase, actualDuration) => {
    commitCount += 1
    totalActualDuration += actualDuration
    profileSamples.push(actualDuration)
  }

  for (let iteration = 0; iteration < updates; iteration++) {
    root.render(
      React.createElement(
        Profiler,
        { id, onRender },
        createElement(iteration)
      )
    )
    await waitForFrame()
  }

  root.unmount()
  await waitForFrame()

  const averageActualDuration = commitCount > 0 ? totalActualDuration / commitCount : 0

  return {
    commits: commitCount,
    totalActualDuration: Number(totalActualDuration.toFixed(3)),
    avgActualDuration: Number(averageActualDuration.toFixed(3)),
    maxActualDuration: Number((Math.max(0, ...profileSamples)).toFixed(3)),
  }
}

window.__runRuntimePerfHarness = async () => {
  const inputMetrics = await runScenario({
    id: 'Input',
    updates: 120,
    createElement: iteration =>
      React.createElement(Input, {
        label: 'Input',
        placeholder: 'Type something',
        value: 'value-' + (iteration % 30),
        inputType: iteration % 2 === 0 ? 'search' : 'hide-able',
        error: iteration % 6 === 0 ? 'Validation error' : undefined,
        onChange: noop,
      }),
  })

  const toastMetrics = await runScenario({
    id: 'ToastContainer',
    updates: 120,
    createElement: iteration =>
      React.createElement(ToastContainer, {
        toasts: buildToasts(6 + (iteration % 3)),
        position: iteration % 2 === 0 ? 'top-right' : 'bottom-right',
        onRemove: noopById,
        onPause: noop,
        onResume: noop,
        enableHoverPause: true,
        enableProgressBar: true,
      }),
  })

  const datepickerMetrics = await runScenario({
    id: 'DatePickerSingle',
    updates: 120,
    createElement: iteration =>
      React.createElement(DatePickerSingle, {
        label: 'Date',
        value: new Date(2026, 0, 1 + (iteration % 28)),
        onDateChange: noop,
      }),
  })

  const scenarios = {
    input: inputMetrics,
    toast: toastMetrics,
    datepicker: datepickerMetrics,
  }

  const totals = Object.values(scenarios).reduce(
    (acc, metrics) => {
      acc.commits += metrics.commits
      acc.totalActualDuration += metrics.totalActualDuration
      return acc
    },
    { commits: 0, totalActualDuration: 0 }
  )

  return {
    measuredAt: new Date().toISOString(),
    scenarios,
    totals: {
      commits: totals.commits,
      totalActualDuration: Number(totals.totalActualDuration.toFixed(3)),
    },
  }
}
`

const main = async () => {
  const outputPath = getOutputPath()
  const distUiKitPath = path.resolve(process.cwd(), 'dist/ui-kit.es.js')
  const distDatepickerPath = path.resolve(process.cwd(), 'dist/datepicker.es.js')
  const distToastPath = path.resolve(process.cwd(), 'dist/toast.es.js')

  assertDistEntry(distUiKitPath)
  assertDistEntry(distDatepickerPath)
  assertDistEntry(distToastPath)

  const tempRoot = path.join(process.cwd(), '.utils')
  mkdirSync(tempRoot, { recursive: true })
  const tempDir = mkdtempSync(path.join(tempRoot, 'runtime-profiler-'))
  const entryFile = path.join(tempDir, 'runtime-profiler-entry.tsx')
  const bundleFile = path.join(tempDir, 'runtime-profiler-bundle.js')

  writeFileSync(
    entryFile,
    createHarnessEntry({
      distUiKitPath,
      distDatepickerPath,
      distToastPath,
    }),
    'utf8'
  )

  buildHarnessBundle(entryFile, bundleFile)

  const browser = await chromium.launch({ headless: true })

  try {
    const page = await browser.newPage()
    await page.setContent('<!doctype html><html><body><div id="runtime-profiler-root"></div></body></html>')
    await page.addScriptTag({ path: bundleFile })

    const metrics = await page.evaluate(async () => {
      if (typeof window.__runRuntimePerfHarness !== 'function') {
        throw new Error('window.__runRuntimePerfHarness is not available')
      }

      return window.__runRuntimePerfHarness()
    })

    writeFileSync(outputPath, JSON.stringify(metrics, null, 2) + '\n', 'utf8')
    console.log(`Runtime profiler metrics saved to ${outputPath}`)
  } finally {
    await browser.close()
    rmSync(tempDir, { recursive: true, force: true })
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
