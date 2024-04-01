const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.[name].[contenthash].js",
        // publicPath: "/", // required for font loading on historyApiFallback
    },
    devServer: {
        // contentBase: './dist',
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 3000,
        hot: true,
        historyApiFallback: true, // This option is used to allow react-router-dom to handle routing
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === "production"
                        ? MiniCssExtractPlugin.loader
                        : "style-loader",
                    "css-loader",
                ],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                // use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',   // Keep the original file name
                            // outputPath: 'assets/',  // Place assets in the 'assets' folder inside 'dist'
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {},
                    },
                ]
            }
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //     type: 'asset/resource',
            // },
        ],
    },
    resolve: {
        // modules: ['node_modules', 'src'],
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],   // specifies which file extensions Webpack should resolve.
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({ filename: "styles.css" }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: 'index.html', // Output filename
            debug: true, // Enable debug mode
            // excludeChunks: ['node_modules'], // Exclude node_modules chunk
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public', to: '', globOptions: { ignore: ['**/index.html'] } }, // Exclude index.html
            ],
        }),
        
        // new ESLintPlugin({
        //     extensions: ['js', 'jsx', 'ts', 'tsx'],
        // Other options...
        // }),
    ],
    // externals: [
    //     {
    //       'cross-fetch': 'fetch'
    //     }
    //   ]
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                // terser options
            })
        ]
    },
    performance: {
        maxAssetSize: 244 * 1024,       // 244 KiB
        maxEntrypointSize: 244 * 1024,  // 244 KiB
    },
};
