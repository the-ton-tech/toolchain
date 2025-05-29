# toolchain

Toolchain for development

## Usage

```bash
yarn add -D https://github.com/the-ton-tech/toolchain
```

**eslint.config.mjs**
```js
export { default } from '@ton/toolchain';
```

**custom eslint.config.mjs**
```js
import base, { tsEslint } from '@ton/toolchain';

export default [
  ...base,
  {
    plugins: {
      '@typescript-eslint': tsEslint,
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
```

**package.json**
```json
{
  "prettier": "@ton/toolchain/prettier",
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

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

**.github/workflows/reward.yaml**
```yaml
name: Reward

on:
  pull_request:
    types:
      - closed

jobs:
  reward:
    name: Reward
    runs-on: ubuntu-latest
    steps:
      - uses: the-ton-tech/toolchain/reward@v1
        with:
          project: blueprint # or sandbox or tl-b 
          github_token: ${{ secrets.GITHUB_TOKEN }}
          x_api_key:    ${{ secrets.X_API_KEY }}
          x_partner_id: ${{ secrets.X_PARTNER_ID }}
```

> [!IMPORTANT]
> By default, the XPS value is 1000, it must be overridden at the final review stage by adding a comment in the review in the format `XPS=N`, where `N` is a positive integer from 1 to 15000



## Development

```bash
yarn install
yarn test
yarn lint:fix
```
