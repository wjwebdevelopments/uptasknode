const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: `${__dirname}/public/js/app.js`,
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './public/dist')
    },
    mode: 'development',
    watch: true,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}