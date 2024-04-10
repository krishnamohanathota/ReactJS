const webpack = require("webpack");
//const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    //new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      __DEV__: false,
      "process.env": {
        SUPPORT_EMAIL: JSON.stringify("dev@gmail.com"),
        APP_ID: JSON.stringify(""),
        SECRET_KEY: JSON.stringify(""),
        BASE: JSON.stringify("https://dev.api.com"),
      },
    }),
  ],
};
