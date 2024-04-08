const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval",
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    port: 3300,
    host: "localhost",
    open: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      "process.env": {
        SUPPORT_EMAIL: JSON.stringify("test@gmail.com"),
        APP_ID: JSON.stringify(""),
        SECRET_KEY: JSON.stringify(""),
        BASE: JSON.stringify("https://local.api.com"),
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
});
