module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['wip', 'feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert', 'chore']]
  }
}
