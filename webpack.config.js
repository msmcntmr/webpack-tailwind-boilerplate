const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
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
    module: {
        rules: [
            {   // Javascript
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {   // Stylesheet
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
            {   // Images
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]' + (isProductionMode ? '.[contenthash]' : '') + '.css',
            chunkFilename: "styles.css"
        }),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                // Lossless optimization with custom option
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    [
                        'svgo',
                        {
                            plugins: [
                                {
                                    removeViewBox: false,
                                }
                            ]
                        }
                    ]
                ]
            }
        })
        /* new HtmlWebPackPlugin({
            template: __dirname + "/src/index.html",
            filename: __dirname + "/public/index.html"
        }), */
    ],
    optimization: minification
};