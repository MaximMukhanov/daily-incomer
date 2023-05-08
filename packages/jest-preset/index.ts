import type { Config } from 'jest';

const preset: Config = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testRegex: '.*\\.spec\\.[jt]sx?$',
  transform: {
    '^.+\\.[jt]sx?$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.{ts,tsx,js,jsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  modulePathIgnorePatterns: [
    '<rootDir>/test/__fixtures__',
    '<rootDir>/node_modules',
    '<rootDir>/dist',
  ],
  coverageDirectory: './coverage',
};

export default preset;
