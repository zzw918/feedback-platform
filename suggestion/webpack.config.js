var webpack = require('webpack');

module.exports = {
    entry: ["./src/index.tsx"],
    output: {
        path: __dirname + "/www/js/",
        filename: "bundle.js",
        publicPath: '/suggestion'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", '.less']
      },
    watch: true,
    module: {
    	loaders: [
            {
            test: /\.tsx?$/,
            loader: 'ts-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader'
            }
    	]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
                'NODE_ENV': JSON.stringify("develop")
        }
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ]
}