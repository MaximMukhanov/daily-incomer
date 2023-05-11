import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs'],
  entry: ['./index.ts'],
  splitting: false,
  sourcemap: true,
  dts: {
    resolve: true,
    entry: ['./index.ts'],
    compilerOptions: {
      moduleResolution: 'node',
    },
  },
  clean: true,
  target: 'es6',
});
