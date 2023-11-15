module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript', // Если вы используете TypeScript
  ],
  plugins: [
    // Ваши плагины
  ],
};
