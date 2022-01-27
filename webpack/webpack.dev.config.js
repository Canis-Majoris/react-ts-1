const webpack = require("webpack");
const dotenv = require("dotenv");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  const env = dotenv.config().parsed;

  let envKeys = {};
  if (typeof env !== "undefined" && env !== null) {
    envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});
  }

  return {
    entry: "./src/index.tsx",
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      plugins: [new TsconfigPathsPlugin()],
      alias: {
        process: "process/browser",
        "@Components": path.resolve(__dirname, "../src/components/"),
        "@Constants": path.resolve(__dirname, "../src/constants/"),
        "@Types": path.resolve(__dirname, "../src/types/"),
        "@Hooks": path.resolve(__dirname, "../src/hooks/"),
        "@Modules": path.resolve(__dirname, "../src/modules/"),
        "@Redux": path.resolve(__dirname, "../src/redux/"),
        "@Styles": path.resolve(__dirname, "../src/styles/"),
        "@Config": path.resolve(__dirname, "../src/config/"),
        "@Assets": path.resolve(__dirname, "../src/assets/"),
        "@Utils": path.resolve(__dirname, "../src/utils/"),
        "@Providers": path.resolve(__dirname, "../src/providers/"),
        "@Routes": path.resolve(__dirname, "../src/routes/"),
        "@Queries": path.resolve(__dirname, "../src/queries/"),
        "@Features": path.resolve(__dirname, "../src/features/"),
        "@State": path.resolve(__dirname, "../src/state/"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(css)$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          type: "asset/resource",
        },
        {
          test: /\.less$/i,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                  paths: [path.resolve(__dirname, "../src")],
                },
              },
            },
          ],
        },
      ],
    },
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      port: 8081,
      contentBase: path.join(__dirname, "../dist"),
      hot: true,
      historyApiFallback: true,
      host: "0.0.0.0",
      public: "local.agora",
      https: false,
      proxy: {
        "/api": {
          target: "http://localhost:3000",
        },
        "/document-api": {
          target: "http://localhost:3001",
          pathRewrite: { "^/document-api": "/api" },
        },
      },
    },
    output: {
      publicPath: "/",
      filename: "[name].js?v=[contenthash]",
      path: path.resolve(__dirname, "../dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Investor Portal",
        template: path.resolve(__dirname, "../public", "index.html"),
      }),
      new webpack.DefinePlugin({
        ...envKeys,
        "process.env": JSON.stringify(dotenv.config().parsed),
      }),
      new AssetsPlugin({
        prettyPrint: true,
        filename: "assets.json",
        path: path.resolve(__dirname, "../dist"),
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        linkType: "text/css",
      }),
    ],
  };
};
