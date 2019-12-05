const path = require('path');
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'wikipedia-preview.js',
    library: 'wikipediaPreview',
    libraryTarget: 'umd',
  },
  devServer: {
    publicPath: '/dist/',
    watchOptions: {
      ignored: ['dist', 'node_modules']
    }
  },
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
                    targets: 'defaults',
                    useBuiltIns: 'usage',
                    corejs: 3
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
      }
    ]
  }
};
module.exports = (env, argv) => {
  config.output.filename = 'wikipedia-preview.' + argv.mode + '.js';
  return config;
};