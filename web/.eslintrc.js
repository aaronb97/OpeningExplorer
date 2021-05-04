module.exports = {
  globals: {
    CONFIG: true,
    DISPATCH: true,
    NODE_ENV: true,
    PROJECT_NAME: true,
    QINIU_HOST: true,
    REMOTE_HOSTS: true,
    ROOT_NODE: true,
    STATE: true,
    STORE: true,
    WECHAT_ENABLED: true,
    wx: true,
    Raven: true,
    particlesJS: true,
    isDebug: true,
  },
  env: {
    browser: true,
    es6: true,
    commonjs: true,
  },
  plugins: ['react', 'css-modules'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'plugin:css-modules/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      modules: true,
    },
  },
  rules: {
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'tsx'] }],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
