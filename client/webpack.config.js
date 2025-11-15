import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",
    entry: "./src/main.jsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      filename: "bundle.js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
    {
      test: /\.svg$/i,
      type: 'asset/resource',
    },
    {
      test: /\.(png|jpe?g|gif|webp)$/i,
      type: 'asset/resource',
    },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      ...(isProd ? [new BundleAnalyzerPlugin({analyzerPort: 8889,})] : []), 
    ],
    devServer: {
      static: path.join(__dirname, "dist"),
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
    devtool: isProd ? false : "inline-source-map", 
  };
};
