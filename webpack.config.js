var config = {
    entry: {
        'my.app': __dirname + '/src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|eot|woff2)$/,
                loader: "file-loader",
                options: {
                    name: 'static/[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/'
    },
    devServer: {
        contentBase: __dirname + '/dist',
        compress: true,
        port: 8080
    }
};

module.exports = config;
