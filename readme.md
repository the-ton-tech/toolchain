# toolchain

Toolchain for development

## Usage

```bash
yarn add -D @ton/toolchain@the-ton-tech/toolchain#v1
# or
npm install -D @ton/toolchain@the-ton-tech/toolchain#v1
```

**eslint.config.js**
```js
module.exports = require('@ton/toolchain');
```

**custom eslint.config.js**
```js
const base = require('@ton/toolchain');
const tsEslint = require('@ton/toolchain').tsEslint;

module.exports = [
  ...base,
  { ignores: ['example/**'] },
  {
    plugins: {
      '@typescript-eslint': tsEslint,
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['src/example1.ts'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
```

**package.json**
```json
{
  "prettier": "@ton/toolchain/prettier",
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "lint:fix": "eslint . --max-warnings 0 --fix"
  }
}
```

## GitHub Actions

### QA

**.github/workflows/qa.yaml**
```yaml
name: QA

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: the-ton-tech/toolchain/lint@v1
        with:
          node-version: 22.x

  build:
    name: Test & Build
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: the-ton-tech/toolchain/build@v1
        with:
          node-version: 22.x
```

## Development

```bash
yarn install
yarn test
yarn lint:fix
```
