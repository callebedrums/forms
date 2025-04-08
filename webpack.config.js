//webpack.config.js
import path from "path";
import url from "url";
import common from "./webpack.common.js";
import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import webpack from "webpack";
import packageJson from "./package.json" with { type: "json" };
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const { ModuleFederationPlugin } = webpack.container;
const deps = packageJson.dependencies;

const name = packageJson.name;
const Name = `${name[0].toUpperCase()}${name.substring(1)}`;
const MFName = `./${Name}`;

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default function (env, args) {
  console.log(
    args.mode === "production" ? "Production build" : "Development build"
  );

  return merge(common, {
    entry: {
      main: path.resolve(__dirname, "src/index.ts"),
    },
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "auto",
    },
    resolve: {
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, "./tsconfig.json"),
        }),
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: Name,
        filename: "remoteEntry.js",
        exposes: {
          [MFName]: "./src/mfe.ts"
          // "./Home": "./src/home/home.mfe.ts",
          // "./HomeSingleSpa": "./src/home/home.mfe.single-spa.ts",
        },
      }),
      new HtmlWebpackPlugin({
        title: `${Name} App`,
        template: path.resolve(__dirname, "./index.html"),
      }),

      new CopyPlugin({
        patterns: [
          {
            from: "public",
            to: ".",
          },
        ],
      }),
    ],
  });
}
