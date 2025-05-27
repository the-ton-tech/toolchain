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
      - uses: the-ton-tech/toolchain/lint@v1.0.0
        with:
          node-version: 22.x

  build:
    name: Test & Build
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: the-ton-tech/toolchain/build@v1.0.0
        with:
          node-version: 22.x
```


## Development

```bash
yarn install
yarn test
yarn lint:fix
```
