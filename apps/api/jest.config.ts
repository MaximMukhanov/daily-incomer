import type { Config } from 'jest';
import preset from 'jest-preset';

const config: Config = {
  ...preset,
  displayName: 'API App(unit) Tests',
  testEnvironment: 'node',
};

export default config;
