module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
        commonjs: true,
        amd: true
    },
    settings: {
        polyfills: ['Promise', 'URL'],
        'import/extensions': ['.js', '.ts'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts']
        }
    },
    globals: {
        Babel: true
    },
    plugins: [
        'babel', '@typescript-eslint'
    ],
    extends: [
        // 'airbnb',
        'eslint:recommended',
        'plugin:import/typescript'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    rules: {
        'import/no-dynamic-require': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-named-as-default': 0,
        'import/prefer-default-export': 0,
        'arrow-body-style': [2, 'as-needed'], // 箭头函数
        'class-methods-use-this': 0, // 强制类方法使用 this
        semi: 2,
        // 缩进Indent with 4 spaces
        indent: [2, 4],
        'no-console': 0, // 不禁用console
        'no-debugger': 2, // 禁用debugger
        'no-shadow': 0,
        'comma-dangle': [2, 'never'],
        'no-use-before-define': 'off',
        quotes: [1, 'single'],
        'eol-last': 2,
        'no-else-return': 2,
        'no-empty': 2,
        eqeqeq: 2,
        'no-multiple-empty-lines': [1, { max: 2 }],
        'no-trailing-spaces': 1,
        'key-spacing': [0, { beforeColon: false, afterColon: true }],
        'padded-blocks': 0,
        'no-unused-vars': 0,
        'no-dupe-else-if': 0,
        'no-control-regex': 0,
        'no-nested-ternary': 0,
        'no-plusplus': 0,
        'no-param-reassign': 1
    }
};
