const {series} = require('nps-utils');

module.exports = {
    scripts: {
        start: {
            script: 'vite',
            description: '🚀 Launch of the Vite DEV server',
        },
        dev: {
            script: 'storybook dev -p 6006',
            description: '📘 Storybook launch on port 6006',
        },
        prebuild: {
            script: 'rm -rf dist',
            description: '🧨 Dist cleaning before assembly',
        },
        generateIndex: {
            script: 'node lib/scripts/generate-index.js',
            description: '📄 Generation of a common index file for components',
        },
        build: {
            script: series(
                'nps generateIndex',
                'vite build',
                'tsc'
            ),
            description: '📦 Project assembly (Index, Vite, TSC)',
        },
        preview: {
            script: 'vite preview',
            description: '👀 View the collected project',
        },
        lint: {
            script: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
            description: '🔍 Project Linting',
        },
        lintFix: {
            script: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0 --fix',
            description: '🧹 Lint with auto-fix',
        },
        buildStorybook: {
            script: 'storybook build',
            description: '📘 Assembly Storybook',
        },
        addChangeset: {
            script: 'git add . && read -p "Enter a comment on the Commit" msg && git commit -m "$msg"',
            description: '📦 Adding changes with manual commentary',
        },
        versionUpdate: {
            script: `
    determine_commit_type() {
      changes=$(git diff --name-only --cached)
      if echo "$changes" | grep -q "src/"; then
        echo "feat: New functions or changes in the source files"
      elif echo "$changes" | grep -q "test/"; then
        echo "test: Changes in tests"
      elif echo "$changes" | grep -q "fix"; then
        echo "fix: Corrections of bugs"
      else
        echo "chore: Committing changes"
      fi
    }

    commit_type=$(determine_commit_type)
    echo "The proposed comment: $commit_type"
    read -p "If you want to change the comment, enter a new one, otherwise click Enter to use the proposed: " user_commit_message
    commit_message="\${user_commit_message:-$commit_type}"

    git add .
    git commit -m "$commit_message"
    pnpm version $1
    git push git@github.com:SemAntony/design-system.git
    git push git@github.com:SemAntony/design-system.git --tags
  `.trim().replace(/\n\s+/g, ' && '),
            description: 'Updating the version with Commit and Put into the remote repository',
        },

        version: {
            patch: {
                script: 'nps versionUpdate -- patch',
                description: '🔖 Improving PATCH version',
            },
            minor: {
                script: 'nps versionUpdate -- minor',
                description: '🆙 Improving minor version',
            },
            major: {
                script: 'nps versionUpdate -- major',
                description: '🚀 Improving the Major version',
            },
            beta: {
                script: 'nps versionUpdate -- prerelease --preid=beta',
                description: '🧪 Issue beta version',
            },
            alpha: {
                script: 'nps versionUpdate -- prerelease --preid=alpha',
                description: '🧬 Issue Alpha version',
            },
            rc: {
                script: 'nps versionUpdate -- prerelease --preid=rc',
                description: '🚀 Issue RC version',
            },
        },
    },
};
