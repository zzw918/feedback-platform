var webpack = require('webpack');

module.exports = {
    entry: ["./src/index.tsx"],
    output: {
        path: __dirname + "/www/js/",
        filename: "bundle.js",
        publicPath: '/suggestion'
    },
    devtool: 'inline-source-map',
    resolve: {
        // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: [".ts", ".tsx", ".js", '.less'],

        // 这是起的别名， 方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
      },
    watch: true,
    // devServer:{
    //     historyApiFallback:true,
    //     hot:true,
    //     inline:true,
    // },
    module: {
    	loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
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
    //    new webpack.optimize.UglifyJsPlugin({
    //      compress: {
    //        warnings: false
    //      }
    //    }),
       new webpack.DefinePlugin({
       'process.env.NODE.ENV':"development"
       }),
     ]
}