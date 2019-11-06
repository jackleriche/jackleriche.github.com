var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: path.join(__dirname, "src/index.ts"),
  watch: true,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "DEV MODE: web games base",
      template: path.join(__dirname, "templates/index.ejs")
    }),
    new CopyWebpackPlugin([{ from: "./assets", to: "assets" }])
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
    inline: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
      ignored: /node_modules/
    }
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader", exclude: "/node_modules/" }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
