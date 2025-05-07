module.exports = {
  extends: ['@it-incubator/eslint-config', 'plugin:storybook/recommended'],
  plugins: ['import'],
  rules: {
    'no-duplicate-imports': 'off',
    'import/no-duplicates': 'off'
  },
  overrides: [
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
        'no-console': 'off'
      },
    },
  ],
}
