import type { Config } from 'jest';
import preset from 'jest-preset';

const config: Config = {
  ...preset,
  displayName: 'API App Tests',
  testEnvironment: 'node',
};

export default config;
