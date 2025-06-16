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

### SBT Reward

This action extracts the average XPS rating from reviewers comments when a pull request is merged, posts a comment with the reward link, and applies a label to the pull request if specified

> [!IMPORTANT]
> By default, the XPS value is 0, it must be overridden at the final review stage by adding a comment in the review in the format `XPS=N`, where `N` is a positive integer from 0 to `<xps_max>`, if the value is 0, no reward is given
> 
> Example: LGTM XPS=15000

#### XPS Behavior Explanation

##### Reward by Approval (`xps_min = 0`)

* XPS is granted **only** if a reviewer explicitly comments `XPS=N`
* No `XPS` comment → reward = **0**
* Use this mode when **rewards must be manually assigned**

> Example:
> `xps_min: 0`, `xps_max: 15000`
> comment: `XPS=5000` author gets 5000
> comment: No `XPS` author gets 0

##### Grant with Override (`xps_min == xps_max`)

* Reviewer gets **full reward (XPS = xps_max)** automatically — **unless** someone explicitly sets a lower value with `XPS=N`
* Setting `XPS=0` **fully cancels** the reward
* Use this mode when reward is **granted by default**, but reviewers can **downgrade or reject** it

> Example:
> `xps_min: 15000`, `xps_max: 15000`
> comment: `XPS=5000` author gets 5000
> comment: No `XPS` author gets 15000

🔐 Only reviewers with `write`, `maintain`, or `admin` rights can influence scoring

**.github/workflows/reward.yaml**
```yaml
name: Reward

on:
  pull_request:
    types:
      - closed
    paths:
      - 'src/**'

jobs:
  reward:
    name: Reward
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: the-ton-tech/toolchain/reward@v1
        with:
          # GitHub token used to read PR details and post comments/labels
          github_token: ${{ secrets.GITHUB_TOKEN }}
          # Credentials of TON Society Platform
          society_api_key: ${{ secrets.SOCIETY_API_KEY }}
          society_partner_id: ${{ secrets.SOCIETY_PARTNER_ID }}
          # activity identifier or alias: blueprint | sandbox | tl-b | tl-b-tool
          activity_id: <number_id>
          # (optional) minimum allowed XPS amount, default: 0
          xps_min: 0
          # (optional) maximum allowed XPS amount, default: 15000
          xps_max: 15000
          # (optional) label for marking the rewarded PR, default: ''
          on_reward_label: rewarded
```

Where `activity_id` is an identifier of the activity, for which user is rewarded, to create a new activity refer to [TON Society Platform documentation](https://github.com/ton-society/sbt-platform?tab=readme-ov-file#steps-for-integration)

## Development

```bash
yarn install
yarn test
yarn lint:fix
```
