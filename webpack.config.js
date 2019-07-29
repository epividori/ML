const path = require('path');

// Manejo del archivo html
const htmlPlugin = require('html-webpack-plugin');

// Manejo archivos css
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, './app/index.js'),
    output: {
        path: path.resolve(__dirname,'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Regex. toma todo los archivos js
                use: 'babel-loader', // comunicar webpack con babel, para js y jsx
                exclude: /node_modules/ // Excepto node_modules
            },
            {
                test: /\.css$/, 
                use: extractTextPlugin.extract(
                  {
                    fallback: 'style-loader',
                    use: 'css-loader' //  Loader para archivos css
                  }),
                exclude: /node_modules/
              },
              {
                test: /\.(png|svg)$/,
                use: 'file-loader'
              }
        ]
    },
    plugins: [
      new htmlPlugin({
        template: "./index.html",
        filename: "./index.html"
      }),
      new extractTextPlugin({filename: 'style.css'})
    ]
};