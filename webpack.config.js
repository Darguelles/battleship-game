const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssRules = [
    { loader: 'css-loader' },
];

module.exports = {
    entry: ["./src/js/app.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js"
    },
    devServer: {
        contentBase: "./dist",
        historyApiFallback: true,
        host: '0.0.0.0',
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                issuer: [{ not: [{ test: /\.html$/i }] }],
                use:ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssRules
                }),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['eslint-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                issuer: /\.[tj]s$/i
            },
            {
                test: /\.scss$/,
                use: ['css-loader', 'sass-loader'],
                issuer: /\.html?$/i
            }
        ]

    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new ExtractTextPlugin('public/style.css', {
            allChunks: true
        })
    ]
};