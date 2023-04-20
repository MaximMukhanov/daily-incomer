import { jest } from '@jest/globals';

global.Math.random = jest.fn(() => 1);
global.console.error = jest.fn();
