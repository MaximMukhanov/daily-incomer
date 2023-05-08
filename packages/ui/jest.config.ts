import type { Config } from 'jest';
import preset from 'jest-preset';

const config: Config = {
  ...preset,
  displayName: 'UI Package Tests',
  testEnvironment: 'jest-environment-jsdom',
};

export default config;
