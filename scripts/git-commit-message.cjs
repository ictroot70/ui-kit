#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getChangedFiles() {
  return execSync('git diff --cached --name-status')
    .toString()
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [status, filePath] = line.split('\t');
      return { status, filePath };
    });
}

function detectCommitType(changes) {
  let detectedType = null;

  for (const { status, filePath } of changes) {
    if (/README|\.md$/i.test(filePath)) return 'docs';
    if (/(\.test\.|\.spec\.)\w+$/i.test(filePath)) return 'test';
    if (/Dockerfile|docker-compose\.yml|\.github\/|\.gitlab-ci\.yml|\.circleci\/|\.jenkinsfile|\.ya?ml$/i.test(filePath)) return 'ci';
    if (/vite\.config|webpack\.config|rollup\.config|package\.json|pnpm-lock|yarn\.lock/i.test(filePath)) return 'build';

    if (status === 'A') detectedType = detectedType || 'feat';
    else if (status === 'D') detectedType = detectedType || 'refactor';
    else if (status === 'M') detectedType = detectedType || 'refactor';
  }

  // Try to detect fix based on diff content
  try {
    const diff = execSync('git diff --cached').toString();
    if (/fix|bug/i.test(diff)) return 'fix';
  } catch (_) {}

  // Check for initial commit
  try {
    const isFirstCommit = execSync('git rev-list --count HEAD').toString().trim() === '1';
    if (isFirstCommit) return 'init';
  } catch (_) {}

  return detectedType || null;
}

function promptCommitType(callback) {
  rl.question(
    '❓ Could not detect change type. Enter type (feat, fix, docs, etc.): ',
    (customType) => {
      callback(customType.trim() || 'chore');
    }
  );
}

function promptCommitMessage(type) {
  console.log(`\n🔍 Detected commit type: "${type}"`);
  console.log(`
🧠 Available commit types:
  - init      — initial project setup
  - feat      — new features
  - fix       — bug fixes
  - refactor  — code cleanup without behavior change
  - test      — adding/correcting tests
  - docs      — documentation only
  - chore     — routine tasks
  - build     — build system or dependencies
  - ci        — CI/CD configs (GitHub Actions, Dockerfile, etc.)
`);

  rl.question('📝 Enter commit message (without prefix): ', (input) => {
    const trimmed = input.trim();
    const message = `${type}: ${trimmed || 'some changes'}`;

    try {
      execSync('git add -u');
      execSync(`git commit -m "${message}"`);
      console.log(`✅ Commit created: ${message}`);
    } catch (err) {
      console.error('❌ Commit failed:\n', err.stderr?.toString() || err.message);
    } finally {
      rl.close();
    }
  });
}

// Main
const changes = getChangedFiles();
const type = detectCommitType(changes);

if (type) {
  promptCommitMessage(type);
} else {
  promptCommitType((manualType) => {
    promptCommitMessage(manualType);
  });
}
