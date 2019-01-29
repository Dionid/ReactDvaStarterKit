import path from "path"
import {env} from "process"
// @ts-ignore
import HtmlWebpackPlugin from "html-webpack-plugin"
// @ts-ignore
import WriteFilePlugin from "write-file-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"

const commonConfig = {
    context: path.resolve(__dirname, "../"),
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                    },
                }],
            },
            {
                test: /\.(eot|ttf|woff2?|otf)$/,
                use: "file-loader",
            },

            {
                test: /\.svg$/,
                exclude: /(node_modules|colored)/,
                use: [
                    "svg-sprite-loader",
                    {
                        loader: "svgo-loader",
                        options: {
                            plugins: [
                                {removeTitle: true},
                                {
                                    removeAttrs: {attrs: ["fill", "fill-rule"]},
                                },
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                include: /colored/,
                use: [
                    "svg-sprite-loader",
                ],
            },
            {
                test: /\.(tsx|ts)$/,
                enforce: "pre",
                use: [
                    {
                        loader: "tslint-loader",
                        options: { /* Loader options go here */},
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: true,
            hash: true,
            compile: true,
            favicon: false,
            cache: true,
            showErrors: true,
            chunks: "all",
            excludeChunks: [],
            title: "Webpack App",
            xhtml: false,
        }),
    ],
    optimization: {
        namedModules: true,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".scss"],
        alias: {
            src: path.resolve(__dirname, "../src/"),
            dvaApp: path.resolve(__dirname, "../src/dvaApp/index.ts"),
            models: path.resolve(__dirname, "../src/models/"),
            components: path.resolve(__dirname, "../src/components/"),
            styles: path.resolve(__dirname, "../src/styles/"),
            variables: path.resolve(__dirname, "../src/styles/variables.scss"),
            assets: path.resolve(__dirname, "../public/assets"),
        },
    },
    externals: {},
}

export default commonConfig
// module.exports = commonConfig
