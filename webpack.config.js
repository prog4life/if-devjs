const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DuplPkgCheckrPlugin = require('duplicate-package-checker-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
// const BabelPluginTransformImports = require('babel-plugin-transform-imports');
// const CompressionPlugin = require('compression-webpack-plugin');
// const VisualizerPlugin = require('webpack-visualizer-plugin');
const autoprefixer = require('autoprefixer');
// const cssnano = require('cssnano');
// const scssSyntax = require('postcss-scss');

process.traceDeprecation = true; // or run process with --trace-deprecation flag

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

console.log('env: ', env);
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

module.exports = {
  entry: {
    // polyfills: './src/config/polyfills.js',
    bundle: [
      './src/config/polyfills.js',
      // 'normalize.css/normalize.css',
      'sanitize.css/sanitize.css',
      './src/styles/index.scss',
      './src/index.jsx',
    ],
  },
  output: {
    filename: isProduction ? 'js/[name].[chunkhash:4].js' : '[name].[id].js',
    chunkFilename: isProduction ? 'js/[name].[chunkhash:4].js' : '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/styles.[contenthash:4].css',
      allChunks: true,
      disable: env === 'development', // OR: !isProduction
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
    }),
    new CleanWebpackPlugin(
      ['build'], // removes folder
      { exclude: ['index.html'] }, // TEMP
    ),
    new HTMLWebpackPlugin({
      title: 'Ifinum - Invoices App',
      favicon: path.resolve(__dirname, 'src/assets/favicon.png'),
      // meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      inject: false,
      template: path.resolve(__dirname, 'src/assets/template.html'),
      // chunksSortMode(a, b) {
      //   const order = ['helpers', 'antd', 'rc', 'vendors', 'bundle'];
      //   return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
      // },
      appMountId: 'app',
      mobile: true,
    }),
    // new CompressionPlugin({
    //   cache: true, // default: false, enable file caching
    //   deleteOriginalAssets: true,
    //   test: /\.js/
    // }),
    ...isProduction
      ? [
        new webpack.HashedModuleIdsPlugin(),
        new UglifyJSPlugin({
          cache: true,
          parallel: 2, // OR true, default === os.cpus().length - 1
          sourceMap: true, // cheap-source-map don't work with this plugin
          uglifyOptions: {
            ecma: 8,
          },
        }),
      ]
      : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        // new webpack.NamedChunksPlugin(), // TODO: try this                    !!!
      ],
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      chunks: ['bundle'],
      minChunks(module) { // 1st arg: 'module', 2nd: count
        // This prevents stylesheet resources with the .css or .scss extension
        // from being moved from their original chunk to the vendor chunk
        if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
          return false;
        } // eslint-disable-next-line
        return module.context && module.context.includes('node_modules');
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'mixed', // OR 'secondary' OR 'env' OR 'base'
      chunks: ['vendors'],
      minChunks({ resource }) {
        const re = /(core-js|whatwg-fetch|regenerator-runtime|lodash|moment|history|create-react-class)/;
        return resource && re.test(resource);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'antd',
      chunks: ['vendors'],
      minChunks({ resource }) {
        const re = /(antd|async-validator|dom-align|add-dom-event-listener|dom-scroll-into-view|css-animation|mini-store)/;
        return resource && re.test(resource);
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'rc',
      chunks: ['vendors'],
      minChunks: ({ resource }) => resource && /rc-.*/.test(resource),
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   minChunks: 2
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest'
    //   // minChunks: Infinity
    // }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      // reportFilename: '../temp', // relative to output.path
      openAnalyzer: false,
    }),
    new CircularDependencyPlugin({
      exclude: /temp|node_modules/i, // exclude detection of files
      failOnError: true, // add errors to webpack instead of warnings
      // allow import cycles that include an asyncronous import, e.g. via
      allowAsyncCycles: false, // import(/* webpackMode: "weak" */ './file.js')
      cwd: process.cwd(), // for displaying module paths
    }),
    new DuplPkgCheckrPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new VisualizerPlugin(),
  ],
  // =============================== RESOLVE ==================================
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      actions: path.resolve(__dirname, 'src/actions'),
      constants: path.resolve(__dirname, 'src/constants'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
    modules: [
      // path.resolve(__dirname, 'src/components'),
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.json', '.jsx', '.less', '*'],
  },
  // ============================ MODULE (lOADERS) ============================
  module: {
    rules: [
      // -------------------- JS/JSX BABEL-LOADER -----------------------------
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        options: {
          babelrc: false, // default: true
          // TODO: try "transform-imports" (babel-plugin-transform-imports)
          cacheDirectory: true,
          // ------------------------ BABEL PLUGINS ---------------------------
          plugins: [
            'react-hot-loader/babel', // consider replacing if not in dev mode
            // 'syntax-dynamic-import',
            'transform-class-properties',
            // babel-plugin-import will not work properly if library is added
            // to the webpack config vendor (probably separate "vendor" entry)
            ['import', {
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: true, // true OR 'css'(without optimization)
            }],
            // TODO: replace next concat by .filter(Boolean)
          ].concat(isProduction ? [] : ['transform-react-jsx-source']),
          // ------------------------ BABEL PRESETS ---------------------------
          presets: [
            ['env', {
              modules: false,
              useBuiltIns: 'usage', // or 'entry' or false
              debug: true,
              targets: {
                browsers:
                  [
                    'defaults', // > 0.5%, last 2 versions, Firefox ESR, not dead
                    // "not Firefox ESR", // requires few polyfills
                    `not ie ${isProduction ? '<' : '<='} 11`,
                    `not android <= ${isProduction ? '62' : '66'}`,
                    'not chrome <= 49',
                  ],
              },
              exclude: [
                'web.timers', // needed only for IE9-
                // 'transform-regenerator',
                // 'transform-async-to-generator',
              ],
            }],
            'react',
            'stage-3',
          ],
        },
      },
      // --------------------- CSS/SCSS LOADERS -------------------------------
      {
        test: /\.(scss|css)$/, // OR /\.s?[ac]ss$/, OR /\.(sa|sc|c)ss$/,
        include: [
          path.resolve(__dirname, 'src/styles'),
          path.resolve(__dirname, 'src/components'),
          path.resolve(__dirname, 'node_modules'),
        ],
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 3, minimize: true, sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                // syntax: scssSyntax,
                plugins: [
                  autoprefixer,
                ],
                sourceMap: true,
              },
            },
            // 'resolve-url-loader',
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
          fallback: 'style-loader',
        }),
      },
      // --------------------- CSS/LESS LOADERS -------------------------------
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 2, minimize: true, sourceMap: true },
            },
            // {
            //   loader: 'postcss-loader',
            //   options: {
            //     ident: 'postcss',
            //     plugins: [autoprefixer],
            //     sourceMap: true
            //   }
            // },
            {
              loader: 'less-loader',
              options: { javascriptEnabled: true, sourceMap: true },
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        // TODO: consider to remove include or change 'src'
        include: path.resolve(__dirname, 'src'),
        use: [
          // --------------------- FILE-LOADER --------------------------------
          {
            loader: 'file-loader',
            options: {
              name(file) {
                if (env === 'development') {
                  return '[path][name].[ext]';
                }
                return '[name].[hash:5].[ext]';
              },
              // name: isProduction ? '[name].[hash:4].[ext]' : '[name].[ext]',
              // outputPath: 'assets/', // custom output path
              // useRelativePath: true, // isProd
            },
          },
          // --------------------- IMAGE-WEBPACK-LOADER -----------------------
          // {
          //   loader: 'image-webpack-loader',
          //   query: {
          //     progressive: true,
          //     optimizationLevel: 7,
          //     interlaced: false,
          //     pngquant: {
          //       quality: '65-90',
          //       speed: 4,
          //     },
          //   },
          // },
        ],
      },
      // --------------------------- URL-LOADER -------------------------------
      {
        // TEMP: png removed, due to problem with extra emitted png file
        // caused by not working limit option
        test: /\.(jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192, // 10000
        },
      },
    ],
  },
  // ============================= DEV-SERVER =================================
  devServer: {
    progress: true,
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    // port: 9000,
  },
  devtool: isProduction ? 'source-map' : 'eval-source-map',
};
