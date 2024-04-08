const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      "process.env": {
        SUPPORT_EMAIL: JSON.stringify("test@gmail.com"),
        APP_ID: JSON.stringify(""),
        SECRET_KEY: JSON.stringify(""),
        BASE: JSON.stringify("https://prod.api.com"),
      },
    }),
    new webpack.ids.HashedModuleIdsPlugin({
      context: __dirname,
      hashFunction: "sha256",
      hashDigest: "hex",
      hashDigestLength: 20,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      maxAsyncRequests: 5,
    },
    minimize: true,
    mangleWasmImports: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true,
            evaluate: true,
          },
          mangle: true,
          module: false,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
          output: {
            comments: false,
            beautify: false,
          },
        },
        extractComments: false,
        exclude: [/\.min\.js$/gi],
      }),
    ],
  },
});
