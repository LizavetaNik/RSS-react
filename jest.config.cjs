module.exports = {
    preset: 'ts-jest',
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
    transform: { // 'transform' was misspelled as 'ransform'
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.jsx?$': 'babel-jest', // This will use Babel for .js and .jsx files
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
    transformIgnorePatterns: [
      "node_modules/(?!(your-es-modules)/)"
    ],
    globals: {
      'ts-jest': {
        useESM: true,
        tsconfig: 'tsconfig.json'
      }
    },
  };
  
