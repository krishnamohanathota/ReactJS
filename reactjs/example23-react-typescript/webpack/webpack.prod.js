const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      "process.env": {
        SUPPORT_EMAIL: JSON.stringify("prod@gmail.com"),
        APP_ID: JSON.stringify(""),
        SECRET_KEY: JSON.stringify(""),
        BASE: JSON.stringify("https://prod.api.com"),
      },
    }),
  ],
};
