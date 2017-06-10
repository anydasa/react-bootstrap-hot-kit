const { resolve, join } = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index.js'
  ],
  resolve: {
    modules: [
      join(__dirname, 'src'),
      join(__dirname, 'node_modules'),
    ]
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/'
  },

  devServer: {
    hot: true,
    inline: true,
    contentBase: resolve(__dirname, 'public'),
    publicPath: '/',
    historyApiFallback: {
      index: 'index.html'
    },
    proxy: [
      {
        context: ['/api', '/oauth/v2'],
        target: 'http://localhost/app_dev.php',
        secure: false,
        changeOrigin: true,
      }
    ]
  },

  module: {

    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: resolve(__dirname, 'src'),
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.scss$/
        ],
        loader: 'url-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader',],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      REST_CLIENT_ID: JSON.stringify('4_501956s0t6w408k0ss0s4ww08ooos8kk4o000wocoskk4csgow'),
      REST_CLIENT_SECRET: JSON.stringify('tm4z64oz1r4g4gcggk44k8s8c0c80k488ss8okk4ogkkk480k'),
    }),
  ],
};