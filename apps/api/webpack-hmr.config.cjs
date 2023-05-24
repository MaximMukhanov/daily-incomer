/* eslint-disable @typescript-eslint/no-var-requires */
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    module: {
      rules: [
        ...options.module.rules,
        {
          test: /\.node$/,
          loader: 'node-loader',
        },
      ],
    },
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      // Нужен для корректного разрешения пути к swagger-ui-dist, без этого плагина Swagger не сможет найти нужный путь к js и css файлам
      new CopyWebpackPlugin({
        patterns: [
          '../../node_modules/swagger-ui-dist/swagger-ui.css',
          '../../node_modules/swagger-ui-dist/swagger-ui-bundle.js',
          '../../node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',
          '../../node_modules/swagger-ui-dist/favicon-16x16.png',
          '../../node_modules/swagger-ui-dist/favicon-32x32.png',
        ],
      }),
      new webpack.IgnorePlugin({
        checkResource(resource) {
          const lazyImports = [
            '@nestjs/microservices/microservices-module',
            '@nestjs/websockets/socket-module',
            'class-transformer/storage',
          ];
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource);
          } catch (err) {
            return true;
          }
          return false;
        },
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({
        name: options.output.filename,
        autoRestart: false,
      }),
    ],
  };
};
