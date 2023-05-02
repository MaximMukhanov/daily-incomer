import type { Config } from '@jest/types';

const commonConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  setupFiles: ['<rootDir>/setupMock.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$':
      '<rootDir>/jest/__mocks__/objectProxy.ts',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.ts',
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$':
      '<rootDir>/__mocks__/fileMock.ts',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.ts',
  },
  modulePathIgnorePatterns: ['<rootDir>/**/node_modules', '<rootDir>/**/dist'],
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: [
    '!<rootDir>/**/mocks/.{ts,tsx}',
    '!<rootDir>/**/mocks/**/*.{ts,tsx}',
    '!<rootDir>/**/__mocks__/.{ts,tsx}',
    '!<rootDir>/**/__mocks__/**/*.{ts,tsx}',
    '!<rootDir>/**/constants/.{ts,tsx}',
    '!<rootDir>/**/constants/**/*.{ts,tsx}',
    '!<rootDir>/**/*.props.{ts,tsx}',
    '!<rootDir>/**/*.stories.{ts,tsx}',
    '!<rootDir>/**/*.d.ts',
    '!<rootDir>/**/types.ts',
    '!<rootDir>/node_modules/**',
    '!<rootDir>/**/node_modules/**',
    '!<rootDir>/**/*.(spec|test).ts?(x)',
    '!<rootDir>/dist',
  ],
};

export default commonConfig;
