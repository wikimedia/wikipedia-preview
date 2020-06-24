const path = require('path');
const LessPluginInlineSvg = require('less-plugin-inline-svg');
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '(SET AT THE BOTTOM OF THIS FILE)',
    library: 'wikipediaPreviews',
    libraryTarget: 'umd',
    umdNamedDefine: true
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
        ]
      }
    ]
  }
};
module.exports = (env, argv) => {
  config.output.filename = 'wikipedia-previews.' + argv.mode + '.js';
  return config;
};