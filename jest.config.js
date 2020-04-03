module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^services(.*)$': '<rootDir>/src/services$1',
    '^config(.*)$': '<rootDir>/src/config$1',
    '^bean(.*)$': '<rootDir>/src/bean$1'
  }
}
