import type { Config } from 'jest';
import preset from 'jest-preset';

const config: Config = {
  ...preset,
  displayName: 'API App(e2e) Tests',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
};

export default config;
