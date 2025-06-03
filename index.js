const eslintConfig = require('./eslint.config.js');
const prettier = require('./prettier.js').default;
const eslintExtras = require('./eslint.js');

module.exports = eslintConfig;
module.exports.prettier = prettier;
Object.assign(module.exports, eslintExtras);
