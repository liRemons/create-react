const { Configuration, DefinePlugin, ProgressPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const path = require('path')
const rules = require('./config/rules')
const packageJSON = require('./package.json')
/**
 * @type {Configuration}
 */

module.exports = (env, args) => {
  const mode = args.mode
  const otherParams = {}
  ;(env.otherParams || '').split(',').forEach((item) => {
    otherParams[item.split('=')[0]] = item.split('=')[1]
  })
  const config = {
    entry: path.resolve(__dirname, 'src/main.jsx'),
    mode,
    output: {
      filename: '[name].js',
      publicPath: '/',
      clean: true,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          minify: (file, sourceMap) => {
            const uglifyJsOptions = {
              sourceMap: false,
            }
            return require('uglify-js').minify(file, uglifyJsOptions)
          },
        }),
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    module: {
      rules,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.ts'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@axios': path.resolve(__dirname, 'src/axios'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@pages': path.resolve(__dirname, 'src/pages'),
      },
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      antd: 'antd',
      mobx: 'mobx',
      'mobx-react': 'mobxReact',
      classnames: 'classNames',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/index.html'),
      }),
      new ProgressPlugin({
        activeModules: true,
        modules: true,
      }),
      // 提取单独的CSS
      new MiniCssExtractPlugin({
        filename: '[name]/main.[contenthash:10].css',
      }),
      new DefinePlugin({
        APP_NAME: JSON.stringify(`@${packageJSON.name}`),
      }),
      // 压缩css
      new CssMinimizerPlugin(),
      new BundleAnalyzerPlugin({
        defaultSizes: 'stat',
        analyzerMode:
          mode === 'production' && otherParams.report === 'true'
            ? 'server'
            : 'disabled',
      }),
      mode === 'production' && otherParams.gzip === 'true'
        ? new CompressionPlugin()
        : null,
    ].filter((_) => !!_),
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      compress: true,
      port: 3033,
      host: 'local-ip',
      open: true,
      hot: true,
      client: {
        progress: true,
      },
      historyApiFallback: true
    },
    stats: 'errors-only',
    devtool: mode === 'development' ? 'eval-source-map' : false,
  }
  return config
}
