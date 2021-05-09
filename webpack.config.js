const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const LessPluginInlineSvg = require('less-plugin-inline-svg');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const fs = require('fs');
const path = require('path');
const CryptoJS = require("crypto-js");

// This is a less plugin to build cache-busting wikipedia urls
class WikipediaImage {
    install(less) {
        less.functions.functionRegistry.add(
          'wikipedia-image', function (fileArg) {
                // return new LessPluginInlineSvg
                const { value } = fileArg;
                const baseUrl = 'https://www.wikipedia.org/static/images/wikipedia-preview';
                const fileUrl = `${baseUrl}/${value}`
                const fileContent = '' // TODO: fetch file content
                const hash = CryptoJS.MD5(fileContent).toString().slice(0, 5);
                const fullUrl = `${baseUrl}/${value}?${hash}`;
                return new (less.tree.Quoted)( '"', "url('" + fullUrl + "')" );
            }
        )
    }
}

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
    contentBase: [ path.join(__dirname, 'demo'), path.join(__dirname, 'dist') ],
    watchOptions: {
      ignored: ['dist', 'node_modules']
    }
  },
  plugins: [
      new StylelintPlugin({
        context: './style/',
        files: '*.less',
        fix: true
      }),
      new MiniCssExtractPlugin({
        filename: 'wikipedia-preview.css'
      }),
      new IgnoreEmitPlugin(['default-link-style.production.js', 'default-link-style.development.js']),
      new CompressionPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true
      })
    ],
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
                new WikipediaImage()
              ]
            }
          },
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
                  new WikipediaImage()
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