const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LessPluginInlineSvg = require('less-plugin-inline-svg');

const path = require('path');
const config = {
  entry: {
    'wikipedia-preview': './src/index.js',
    'default-link-style': './src/linkStyle.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '(SET AT THE BOTTOM OF THIS FILE)',
    library: 'wikipediaPreview',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    publicPath: '/dist/',
    watchOptions: {
      ignored: ['dist', 'node_modules']
    }
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'wikipediaPreview.css'
  })],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: 'defaults'
                  }
                ]
              ]
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'less-loader', options: { sourceMap: true } },
        ]
      },
      {
        test: /\.css$/i,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            { 
              loader: 'less-loader', options: { 
                sourceMap: true, 
                plugins:
                [ 
                  new LessPluginInlineSvg({
                    base64: true
                  }) 
                ] 
              } 
            },
          ],
      },
    ]
  }
};
module.exports = (env, argv) => {
  config.output.filename = '[name].' + argv.mode + '.js';
  return config;
};