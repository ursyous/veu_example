module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  plugins: ['prettier'],
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue-i18n/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/camelcase': [
      'error',
      { properties: 'always', ignoreDestructuring: false }
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': ['error'],
    'nuxt/no-cjs-in-config': 'off',
    'no-console': 'off',
    semi: ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never'],
    indent: ['error', 2],
    'keyword-spacing': ['error'],
    'space-before-function-paren': ['error', 'always'],
    'space-infix-ops': ['error'],
    'comma-spacing': ['error', { before: false, after: true }],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    eqeqeq: ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'comma-style': ['error', 'last'],
    'func-call-spacing': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'no-array-constructor': 'error',
    'space-before-blocks': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'always'],
    'computed-property-spacing': ['error', 'never'],
    'accessor-pairs': 'error',
    'no-ex-assign': 'error',
    'no-extra-boolean-cast': 'error',
    'no-floating-decimal': 'error',
    'no-lone-blocks': 'error',
    'no-multi-str': 'error',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'padded-blocks': ['error', 'never'],
    'template-curly-spacing': ['error', 'never'],
    'wrap-iife': ['error', 'inside'],
    yoda: 'error',
    'yield-star-spacing': ['error', 'both'],
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true }
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+']
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true
        }
      }
    ],

    'vue-i18n/no-unused-keys': [
      'error',
      {
        src: './src',
        extensions: ['.js', '.ts', '.vue']
      }
    ],
    'vue-i18n/no-raw-text': ['off']
  },
  settings: {
    'vue-i18n': {
      localeDir: './src/assets/locales/*.json'
    }
  }
}
