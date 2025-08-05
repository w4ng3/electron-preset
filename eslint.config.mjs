import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['**/node_modules', '**/dist', '**/out'],
  typescript: true,
  unocss: true,
  vue: true,
  lessOpinionated: true,
  // 覆盖规则
  rules: {
    'no-console': 'off',
    'style/no-multiple-empty-lines': ['error', { max: 2 }],
    'unocss/blocklist': 'warn', // 禁止特定的类选择器
    'unocss/enforce-class-compile': 'off', // 强制类编译
    'unocss/order-attributify': 'warn', // 对属性选择器强制执行特定顺序
    'unocss/order': 'warn', // 对类选择器强制执行特定的顺序
    'unused-imports/no-unused-vars': 'warn',
    'symbol-description': 'warn',
    'unused-imports/no-unused-imports': 'error',
    'test/consistent-test-it': ['error', { withinDescribe: 'test' }],
    'ts/no-explicit-any': 'off',
    'jsdoc/sort-tags': ['warn'],
    'ts/ban-ts-comment': 'off',
    'ts/no-unsafe-function-type': 'off',
    'react-dom/no-missing-button-type': 'off',
    'style/jsx-one-expression-per-line': ['warn', { allow: 'non-jsx' }],
  },
  formatters: {
    css: true,
    html: true,
  },
})
