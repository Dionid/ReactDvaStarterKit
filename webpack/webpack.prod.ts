import path from "path"
// @ts-ignore
import MiniCssExtractPlugin from "mini-css-extract-plugin"
// @ts-ignore
import merge from "webpack-merge"
// @ts-ignore
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin"
// @ts-ignore
import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import commonConfig from "./webpack.common"

const config = merge(commonConfig, {
    output: {
        path: path.resolve(__dirname, "../prod"),
        filename: "[name].[chunkhash].js",
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: "[hash:base64:8]",
                        },
                    },
                    {
                        loader: "sass-loader",
                        options:
                            {
                                sourceMap: true,
                                modules: true,
                            },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css",
        }),
        // new WriteFilePlugin(),
        new CopyWebpackPlugin([{
            from: "public",
        }]),
    ],
})

module.exports = config
