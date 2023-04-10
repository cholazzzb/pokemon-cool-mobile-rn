// process.env.TAMAGUI_TARGET = "native";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './src/tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
      [
        'transform-inline-environment-variables',
        {
          include: 'TAMAGUI_TARGET',
        },
      ],
      [
        'babel-plugin-root-import',
        {
          root: __dirname,
          rootPathPrefix: '~',
          // mapping ~ to the .src directory (again, your app structure may differ here)
          rootPathSuffix: 'src',
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
