const path = require('path');

const config = {
    entry: ['./app/Main.js'],

    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: 'build.js',
    },
    // mode: 'development',
    // devServer: {
    //     inline: true,
    //     port: 3000,
    //     hot: true,
    //     contentBase: './app',
    // },
    resolve: {
        modules: [__dirname, 'app/components', 'node_modules'],
        alias: {
            applicationStyles: 'app/styles/app.scss',
        },
        extensions: ['*', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader',
            }, {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                },
            },
        ],
    },
};

module.exports = config;
