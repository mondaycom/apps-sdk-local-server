export default {
  testEnvironment: 'node',
  preset: 'ts-jest',
  coverageProvider: 'v8',
  coverageReporters: ['lcov'],
  workerIdleMemoryLimit: '512MB',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/tests/$1'
  },
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>'],
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/tests/before-tests.ts'],
  // // The glob patterns Jest uses to detect test files
  // testMatch: ['**/tests/**/*.test.ts'],
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/test/tsconfig.tests.json' }]
  }
};
