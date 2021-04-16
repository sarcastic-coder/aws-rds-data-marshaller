module.exports = {
  plugins: [
    '@typescript-eslint',
    'jest',
  ],

  settings: {
    jest: {
      version: 26,
    },
  },

  parserOptions: {
    createDefaultProgram: false,
    ecmaVersion: 2018,
    sourceType: 'module',

    project: './tsconfig.eslint.json',
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],

  env: {
    'commonjs': true,
    'node': true,
    'es6': true,

    'jest/globals': true,
  },

  rules: {
    // ---
    // --- TypeScript
    // ---
    // '@typescript-eslint/await-thenable': ['error'], @tsconfig-required

    /**
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
     */
    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error', '1tbs'],

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
      */
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['error', { before: false, after: true }],

    '@typescript-eslint/consistent-type-assertions': ['error'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/default-param-last': ['error'],

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
      */
    // 'dot-notation': 'off',
    // '@typescript-eslint/dot-notation': ['error'], @tsconfig-required

    '@typescript-eslint/explicit-member-accessibility': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
      */
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error', 'never'],

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
      */
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
      */
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['error', {
      before: true,
      after: true,
    }],

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
      */
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md
      */
    '@typescript-eslint/member-delimiter-style': ['error'],
    '@typescript-eslint/member-ordering': ['error', {
      default: [
        'public-static-field',
        'protected-static-field',
        'private-static-field',

        'public-instance-field',
        'protected-instance-field',
        'private-instance-field',

        'public-field',
        'protected-field',
        'private-field',

        'static-field',
        'instance-field',

        'field',

        'public-static-method',
        'protected-static-method',
        'private-static-method',

        'constructor',

        'public-instance-method',
        'protected-instance-method',
        'private-instance-method',

        'public-method',
        'protected-method',
        'private-method',

        'static-method',
        'instance-method',

        'method',
      ],
    }],

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
      */
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': ['error'],

    // '@typescript-eslint/no-base-to-string': ['error'], @tsconfig-required
    '@typescript-eslint/no-confusing-non-null-assertion': ['error'],

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
      */
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': ['error'],

    '@typescript-eslint/no-dynamic-delete': ['error'],

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
      */
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error'],

    '@typescript-eslint/no-empty-interface': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/no-extra-non-null-assertion': ['error'],

    /**
      * This can be managed through PR reviews and use case.
      * Parenthesis usage might be required for cleaner code.
      *
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
      */
    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': 'off',

    // '@typescript-eslint/no-floating-promises': ['error'], @tsconfig-required
    //  '@typescript-eslint/no-for-in-array': ['error'],
    // '@typescript-eslint/no-implied-eval': ['error'], @tsconfig-required
    '@typescript-eslint/no-inferrable-types': ['error'],

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-this.md
      */
    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': ['error'],

    '@typescript-eslint/no-invalid-void-type': ['error'],
    '@typescript-eslint/no-misused-new': ['error'],
    // '@typescript-eslint/no-misused-promises': ['error'], @tsconfig-required

    /**
      * Although not recommended they allow for a cleaner series of imports for modules.
      * Namespaces are used to group types by logic instead of prefixing their names.
      *
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md
      */
    '@typescript-eslint/no-namespace': 'off',

    '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
    '@typescript-eslint/no-non-null-assertion': ['error'],
    '@typescript-eslint/no-parameter-properties': ['error'],
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-this-alias': ['error'],
    // '@typescript-eslint/no-throw-literal': ['error'], @tsconfig-required
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
    // '@typescript-eslint/no-unnecessary-condition': ['error'], @tsconfig-required
    // '@typescript-eslint/no-unnecessary-qualifier': ['error'], @tsconfig-required
    // '@typescript-eslint/no-unnecessary-type-arguments': ['error'], @tsconfig-required
    // '@typescript-eslint/no-unnecessary-type-assertion': ['error'], @tsconfig-required
    // '@typescript-eslint/no-unsafe-assignment': ['error'], @tsconfig-required
    // '@typescript-eslint/no-unsafe-call': ['error'], @tsconfig-required
    // '@typescript-eslint/no-unsafe-member-access': ['error'], @tsconfig-required
    // '@typescript-eslint/no-unsafe-return': ['error'], @tsconfig-required

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
      */
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
      */
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
      */
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
      */
    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],

    '@typescript-eslint/prefer-as-const': ['error'],
    '@typescript-eslint/prefer-for-of': ['error'],
    // '@typescript-eslint/prefer-includes': ['error'], @tsconfig-required
    '@typescript-eslint/prefer-namespace-keyword': ['error'],
    // '@typescript-eslint/prefer-nullish-coalescing': ['error'], @tsconfig-required
    // '@typescript-eslint/prefer-reduce-type-parameter': ['error'], @tsconfig-required
    // '@typescript-eslint/prefer-regexp-exec': ['error'], @tsconfig-required
    // '@typescript-eslint/prefer-string-starts-ends-with': ['error'], @tsconfig-required
    '@typescript-eslint/prefer-ts-expect-error': ['error'],
    // '@typescript-eslint/promise-function-async': ['error'], @tsconfig-required
    // '@typescript-eslint/require-array-sort-compare': ['error'], @tsconfig-required
    // '@typescript-eslint/require-await': ['error'], @tsconfig-required
    // '@typescript-eslint/restrict-plus-operands': ['error'], @tsconfig-required

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
      */
    // 'no-return-await': 'off',
    // '@typescript-eslint/return-await': ['error'], @tsconfig-required

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
      */
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': ['error', 'never'],

    // '@typescript-eslint/strict-boolean-expressions': ['error'], @tsconfig-required
    '@typescript-eslint/triple-slash-reference': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['error'],
    '@typescript-eslint/unified-signatures': ['error'],

    /**
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
      * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
      */
    'semi': 'off',
    'no-extra-semi': 'off',
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/no-extra-semi': ['error'],
  },
};
