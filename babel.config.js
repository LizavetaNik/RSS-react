module.exports = async function (api) {
  api.cache(true);
  const presets = [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ];
  const plugins = [
    // Your plugins
  ];

  return {
    presets,
    plugins,
  };
};
