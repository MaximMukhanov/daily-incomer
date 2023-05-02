import type { Config } from '@jest/types';
import path from 'path';
const pathToCommon = path.join(process.cwd(), '.');

const commonConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  roots: [pathToCommon],
  setupFiles: ['./setupMock.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': `${pathToCommon}/jest/__mocks__/objectProxy.ts`,
    '^.+\\.(css|sass|scss)$': `${pathToCommon}/__mocks__/styleMock.ts`,
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$': `${pathToCommon}/__mocks__/fileMock.ts`,
    '\\.svg$': `${pathToCommon}/__mocks__/svgMock.ts`,
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
