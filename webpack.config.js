const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const colors = require('colors');
//const HtmlWebPackPlugin = require("html-webpack-plugin");

const isProductionMode = process.env.NODE_ENV === "production";
console.debug('Compiling for: ' + colors.bold.yellow(process.env.NODE_ENV));

const minification = isProductionMode ? {
    minimizer: [
        `...`,
        new CssMinimizerPlugin()
    ]
} : {};

module.exports = {
    mode: process.env.NODE_ENV,
    entry: __dirname + '/src/js/Application.js',
    output: {
        path: path.resolve(__dirname + '/public/', 'assets'),
        filename: 'js/[name]' + (isProductionMode ? '.[contenthash]' : '') + '.bundle.js'
    },
    devtool: isProductionMode ? false : 'inline-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]' + (isProductionMode ? '.[contenthash]' : '') + '.css',
            chunkFilename: "styles.css"
        }),
        /* new HtmlWebPackPlugin({
            template: __dirname + "/src/index.html",
            filename: __dirname + "/public/index.html"
        }), */
    ],
    module: {
        rules: [
            {   /* Javascript */
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {   /* Stylesheets */
                test: /\.css$/,
                use: [
                    {   
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/assets'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {   /* Images */
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img',
                        }
                    }
                ]
            }
        ]
    },
    optimization: minification
};