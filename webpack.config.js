const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { DefinePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (_, argv) => {
  const __DEV__ = argv.mode === 'development';

  return {
    entry: {
      index: './src/index',
    },
    output: {
      publicPath: '/',
      filename: __DEV__ ? '[name].js' : '[name].[contenthash].js',
      chunkFilename: __DEV__ ? '[id].js' : '[id].[contenthash].js',
    },
    devtool: __DEV__ ? 'eval-source-map' : false,
    context: __dirname,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          options: {
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: false }],
            ],
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react'],
            ],
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
            'less-loader',
          ],
        },
        {
          test: /\.png$/,
          use: ['url-loader'],
        },
      ],
    },
    plugins: [
      new DefinePlugin({
        __DEV__: JSON.stringify(__DEV__),
        __TEST__: 'false',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
      }),
    ].concat(
      __DEV__
        ? []
        : [
            new CopyPlugin({
              patterns: [
                {
                  from: path.resolve(__dirname, './src/manifest.json'),
                },
                {
                  from: path.resolve(
                    __dirname,
                    './src/assets/logo-192x192.png'
                  ),
                },
                {
                  from: path.resolve(
                    __dirname,
                    './src/assets/apple-touch-icon.png'
                  ),
                },
              ],
            }),

            new WorkboxPlugin.GenerateSW({
              clientsClaim: true,
              skipWaiting: true,
              runtimeCaching: [
                {
                  urlPattern: /\.(?:png|jpg|jpeg|webp|gif|svg|glb|gltf|bin)$/,
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'images',
                  },
                },
                {
                  urlPattern: /\.(?:js|css|html)$/,
                  handler: 'StaleWhileRevalidate',
                  options: {
                    cacheName: 'resources',
                  },
                },
              ],
            }),
          ]
    ),
    devServer: {
      hot: true,
      historyApiFallback: true,
    },
  };
};
