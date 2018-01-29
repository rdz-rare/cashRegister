const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './scripts/main.js',
    output: {
        path: __dirname,
        filename: './scripts/main.min.js'
    },
    watch: true,
    plugins: [
        new UglifyJsPlugin({
            test: /\.js($|\?)/i
        })
    ]
}