const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    
    
    plugins: [
      // Adding Webpack plugin
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE',
      }),
      new MiniCssExtractPlugin(),
      
      // add service worker
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'service-worker.js',
      }), 

       // add manifest.json
      new GenerateSW(),
      new WebpackPwaManifest({
        name: 'JATE',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#272822',
        theme_color: '#272822',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('assets/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],


    module: {
      // Add CSS loaders and babel to webpack
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']

            },
          },
        },
      ],
    },
  }}
