const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ComponentDirectoryPlugin = require('component-directory-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return ({
    entry: ['./src/index.js', './src/styles/main.styl'],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: {
              minimize: isProduction,
            },
          }],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: isProduction,
                sourceMap: !isProduction,
              },
            },
          ],
        },
        {
          test: /\.styl$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: !isProduction,
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'stylus-loader',
              options: {
                compress: isProduction,
                sourceMap: !isProduction,
                import: path.resolve(__dirname, './src/styles/vars.styl'),
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|ico)$/,
          use: {
            loader: 'svg-react-loader',
          },
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: './src',
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['src', 'node_modules'],
      plugins: [new ComponentDirectoryPlugin()],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new CleanPlugin(['dist/'], {
        verbose: true,
        dry: false,
      }),
    ],
    optimization: {
      minimize: isProduction,
    },
    devServer: {
      host: '0.0.0.0',
      useLocalIp: true,
    },
  });
};
