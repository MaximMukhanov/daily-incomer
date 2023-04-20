module.exports = {
  '*.{ts,tsx,js,jsx}': [
    'prettier --write, tsc -p ./tsconfig.json --noEmit',
    'eslint --fix',
  ],
};
