module.exports = {
  clearMocks: true,
  coverageReporters: ['lcov', 'text'],
  testMatch: ['**/__tests__/**/*.test.(tsx|ts)'],
  coverageDirectory: 'coverage',

  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**', '!src/styles/**'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};
