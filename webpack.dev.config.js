const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 8080,
    open: ["/index.html"],
    host: "localhost",
    compress: true,
    hot: true,
  },
};
