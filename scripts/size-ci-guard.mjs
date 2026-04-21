import { execSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const BASELINE_PATH = process.env.SIZE_CI_BASELINE || 'size-ci-baseline.json'

const sumBytes = (files, pattern) =>
  files.filter(file => pattern.test(file.path)).reduce((total, file) => total + (file.size || 0), 0)

const collectPackMetrics = () => {
  const output = execSync('npm pack --dry-run --json', {
    encoding: 'utf8',
    env: {
      ...process.env,
      npm_config_cache: process.env.SIZE_CI_NPM_CACHE || '.npm-cache',
    },
  })

  const pack = JSON.parse(output)?.[0]

  if (!pack || !Array.isArray(pack.files)) {
    throw new Error('Unable to parse `npm pack --dry-run --json` output.')
  }

  const files = pack.files

  return {
    filesCount: files.length,
    unpackedBytes: pack.unpackedSize || 0,
    cssBytes: sumBytes(files, /\.css$/),
    jsBytes: sumBytes(files, /\.js$/),
    dtsBytes: sumBytes(files, /\.d\.ts$/),
    mapBytes: sumBytes(files, /\.map$/),
    imageBytes: sumBytes(files, /\.(png|jpe?g|webp|svg)$/i),
  }
}

const loadBaseline = async baselinePath => {
  const absolutePath = path.resolve(process.cwd(), baselinePath)
  const content = await readFile(absolutePath, 'utf8')
  const parsed = JSON.parse(content)

  if (!parsed?.max || typeof parsed.max !== 'object') {
    throw new Error(`Invalid baseline format in ${baselinePath}. Expected { "max": { ... } }.`)
  }

  return parsed.max
}

const formatDiff = (actual, max) => {
  const delta = actual - max
  return `${actual} > ${max} (+${delta})`
}

const main = async () => {
  const max = await loadBaseline(BASELINE_PATH)
  const actual = collectPackMetrics()

  console.log('Size CI metrics:', JSON.stringify(actual, null, 2))

  const failures = Object.entries(max).flatMap(([metric, limit]) => {
    const actualValue = actual[metric]

    if (typeof actualValue !== 'number') {
      return [`${metric}: metric is missing in actual measurements`]
    }

    if (actualValue > limit) {
      return [`${metric}: ${formatDiff(actualValue, limit)}`]
    }

    return []
  })

  if (failures.length > 0) {
    console.error('\nSize CI regression detected:')
    failures.forEach(failure => console.error(`- ${failure}`))
    process.exit(1)
  }

  console.log('\nSize CI guard passed.')
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
