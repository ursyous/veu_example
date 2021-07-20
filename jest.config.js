const { defaults } = require('jest-config')

module.exports = {
  testRegex: '(test|spec)\\.(jsx?|tsx?)$',
  moduleFileExtensions: [ ...defaults.moduleFileExtensions, 'vue', 'ts', 'tsx' ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  transform: {
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '^.+\\.ts$': '<rootDir>/node_modules/ts-jest',
    '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest',
    '^.+\\.(js|ts)$': '<rootDir>/node_modules/babel-jest'
  }
}
