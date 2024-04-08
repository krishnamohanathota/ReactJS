const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    index: ["./src/index.tsx"],
    vendor: ["react", "react-dom"],
  },

  output: {
    path: path.resolve(__dirname, "./../dist"),
    publicPath: "/",
    filename: "js/[name].[hash:6].js",
    sourceMapFilename: "js/[name].[hash:6].js.map",
    chunkFilename: "js/[id].chunk.[hash:6].js",
  },

  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader", // Add PostCSS loader
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./../public", "index.html"),
    }),
  ],
};
