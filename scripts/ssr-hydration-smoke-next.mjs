import { execFileSync, spawn } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { chromium } from 'playwright'

const ROOT_DIR = process.cwd()
const FIXTURE_DIR = path.resolve(ROOT_DIR, 'fixtures/next-ssr-smoke')
const FIXTURE_TARBALL_PATH = path.resolve(FIXTURE_DIR, 'vendor/ui-kit-smoke.tgz')
const FIXTURE_URL = 'http://127.0.0.1:4010'
const SERVER_BOOT_TIMEOUT_MS = 90_000
const LOCAL_NPM_CACHE = path.resolve(ROOT_DIR, '.npm-cache')
const RESOLVED_NPM_CACHE = process.env.UI_KIT_SSR_NPM_CACHE || LOCAL_NPM_CACHE
const SHARED_ENV = {
  ...process.env,
  npm_config_cache: RESOLVED_NPM_CACHE,
  NPM_CONFIG_CACHE: RESOLVED_NPM_CACHE,
}
const HYDRATION_ERROR_PATTERN =
  /(hydration|did not match|text content does not match|server html|window is not defined|document is not defined)/i

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const runCommand = (command, args, cwd) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: SHARED_ENV,
      shell: process.platform === 'win32',
      stdio: 'inherit',
    })

    child.on('error', reject)
    child.on('exit', code => {
      if (code === 0) {
        resolve()

        return
      }

      reject(new Error(`Command failed: ${command} ${args.join(' ')}`))
    })
  })

const waitForServer = async () => {
  const startedAt = Date.now()

  while (Date.now() - startedAt < SERVER_BOOT_TIMEOUT_MS) {
    try {
      const response = await fetch(`${FIXTURE_URL}/`)

      if (response.ok) {
        return
      }
    } catch (error) {
      void error
    }

    await wait(1_000)
  }

  throw new Error(`Next fixture did not start within ${SERVER_BOOT_TIMEOUT_MS}ms`)
}

const stopServer = async server => {
  if (!server || server.exitCode !== null) {
    return
  }

  await new Promise(resolve => {
    const timeout = setTimeout(() => {
      server.kill('SIGKILL')
    }, 5_000)

    server.once('exit', () => {
      clearTimeout(timeout)
      resolve()
    })

    server.kill('SIGTERM')
  })
}

const prepareFixtureTarball = () => {
  const packOutput = execFileSync('npm', ['pack', '--json'], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    env: SHARED_ENV,
  })
  const packed = JSON.parse(packOutput)?.[0]

  if (!packed?.filename) {
    throw new Error('Unable to resolve tarball filename from `npm pack --json`.')
  }

  const sourceTarballPath = path.resolve(ROOT_DIR, packed.filename)

  mkdirSync(path.dirname(FIXTURE_TARBALL_PATH), { recursive: true })
  rmSync(FIXTURE_TARBALL_PATH, { force: true })
  copyFileSync(sourceTarballPath, FIXTURE_TARBALL_PATH)
  rmSync(sourceTarballPath, { force: true })
}

const main = async () => {
  mkdirSync(SHARED_ENV.npm_config_cache, { recursive: true })

  if (!existsSync(path.resolve(ROOT_DIR, 'dist/ui-kit.es.js'))) {
    throw new Error('Missing dist build. Run `npm run build` before `npm run ssr:smoke`.')
  }

  if (!existsSync(path.resolve(FIXTURE_DIR, 'package.json'))) {
    throw new Error(`Missing Next fixture package at ${FIXTURE_DIR}`)
  }

  console.log('Packing local @ictroot/ui-kit for fixture...')
  prepareFixtureTarball()

  console.log('Installing Next fixture dependencies...')
  await runCommand(
    'npm',
    ['install', '--no-audit', '--no-fund', '--force', '--no-package-lock'],
    FIXTURE_DIR
  )

  console.log('Building Next fixture...')
  await runCommand('npm', ['run', 'build'], FIXTURE_DIR)

  console.log('Starting Next fixture...')
  const server = spawn(
    'npm',
    ['run', 'start', '--', '--hostname', '127.0.0.1', '--port', '4010'],
    {
      cwd: FIXTURE_DIR,
      env: SHARED_ENV,
      shell: process.platform === 'win32',
      stdio: 'inherit',
    }
  )

  const hydrationErrors = []
  const runtimeErrors = []
  let browser

  try {
    await waitForServer()

    const serverRenderedHtml = await fetch(`${FIXTURE_URL}/`).then(response => response.text())

    if (!serverRenderedHtml.includes('data-testid="modal-shell-smoke"')) {
      throw new Error('Modal SSR shell was not present in the server-rendered HTML.')
    }

    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()

    page.on('console', message => {
      const text = message.text()

      if (HYDRATION_ERROR_PATTERN.test(text)) {
        hydrationErrors.push(text)
      }
    })

    page.on('pageerror', error => {
      runtimeErrors.push(error.message)
    })

    await page.goto(`${FIXTURE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 30_000 })

    await page.waitForSelector('[data-testid="datepicker-smoke"]', { timeout: 20_000 })
    await page.waitForSelector('[data-testid="modal-content-smoke"]', { timeout: 20_000 })
    await page.waitForSelector('[data-testid="toast-smoke"]', { timeout: 20_000 })
    await page.waitForSelector('.recaptcha-core', { timeout: 20_000 })
    await page.waitForFunction(
      () => document.querySelector('[data-testid="hydration-state"]')?.textContent === 'hydrated:1',
      { timeout: 20_000 }
    )
    await page.evaluate(() => {
      document.querySelector('[data-testid="hydrate-action"]')?.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      )
    })
    await page.waitForFunction(
      () => document.querySelector('[data-testid="hydration-state"]')?.textContent === 'hydrated:2',
      { timeout: 20_000 }
    )

    if (runtimeErrors.length > 0) {
      throw new Error(`Runtime errors detected:\n- ${runtimeErrors.join('\n- ')}`)
    }

    if (hydrationErrors.length > 0) {
      throw new Error(`Hydration/SSR errors detected:\n- ${hydrationErrors.join('\n- ')}`)
    }

    console.log('SSR/hydration smoke passed.')
  } finally {
    if (browser) {
      await browser.close()
    }
    await stopServer(server)
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
