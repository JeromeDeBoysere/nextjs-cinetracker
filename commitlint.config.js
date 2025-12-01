/**
 * Commitlint Configuration
 *
 * This file validates commit messages to follow the Conventional Commits format.
 * It runs automatically via Husky's commit-msg hook before each commit.
 *
 * Commit format: type(scope): description
 * Examples:
 *   - feat: add user login
 *   - fix(api): handle null response
 *   - docs: update README
 *
 * @see https://commitlint.js.org
 * @see https://www.conventionalcommits.org
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allowed commit types
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only
        'style', // Formatting, no code change
        'refactor', // Code refactoring
        'perf', // Performance improvement
        'test', // Adding or updating tests
        'chore', // Maintenance tasks
        'ci', // CI/CD configuration
        'build', // Build system changes
        'revert', // Revert a previous commit
      ],
    ],
    // Max length for commit subject line
    'subject-max-length': [2, 'always', 100],
  },
};
