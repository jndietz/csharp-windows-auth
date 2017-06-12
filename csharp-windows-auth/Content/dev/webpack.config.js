/* eslint-disable */

const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// DEVELOPMENT SPECIFIC CONFIGURATION
module.exports = {
    output: {
        filename: 'assets/[name].bundle.js',
        publicPath: '/',
        path: resolve(__dirname, '../dist'),
    },
    entry: {
        app: ['./index.js']
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] } }
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        template: './index.template.html',
        inject: 'body',
    })]
};
