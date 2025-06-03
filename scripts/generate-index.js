import fs from 'fs'
import path from 'path'

const ROOT_DIR = path.resolve('lib')
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components')

const IGNORED_PATTERNS = [
  /\.stories\.(tsx?|jsx?)$/,
  /\.test\.(tsx?|jsx?)$/,
  /\.spec\.(tsx?|jsx?)$/,
  /\.module\.(s?css|less|styl)$/,
]

function shouldIgnore(file) {
  return IGNORED_PATTERNS.some(pattern => pattern.test(file))
}

function createIndexFileRecursively(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  const files = entries
    .filter(entry => entry.isFile() && entry.name !== 'index.ts')
    .filter(entry => /\.(ts|tsx)$/.test(entry.name))
    .filter(entry => !shouldIgnore(entry.name))
    .map(file => `export * from './${path.basename(file.name, path.extname(file.name))}'`)

  const subdirs = entries
    .filter(entry => entry.isDirectory())
    .filter(subdir => {
      const indexPath = path.join(dir, subdir.name, 'index.ts')
      if (!fs.existsSync(indexPath)) return false
      const content = fs.readFileSync(indexPath, 'utf-8').trim()
      return content.length > 0 && /export\s+/.test(content)
    })
    .map(subdir => `export * from './${subdir.name}'`)

  const content = [...files, ...subdirs].sort().join('\n') + '\n'
  fs.writeFileSync(path.join(dir, 'index.ts'), content)

  for (const entry of entries) {
    if (entry.isDirectory()) {
      createIndexFileRecursively(path.join(dir, entry.name))
    }
  }
}

createIndexFileRecursively(COMPONENTS_DIR)
console.log('✅ All index.ts files in components/* updated')

const libIndexPath = path.join(ROOT_DIR, 'index.ts')
const libExports = fs.existsSync(libIndexPath) ? fs.readFileSync(libIndexPath, 'utf-8') : ''

if (!libExports.includes(`export * from './components'`)) {
  const updated = libExports.trim() + `\nexport * from './components'\n`
  fs.writeFileSync(libIndexPath, updated.trim() + '\n')
  console.log('✅ lib/index.ts updated')
} else {
  console.log('ℹ️ lib/index.ts already contains export for components')
}
