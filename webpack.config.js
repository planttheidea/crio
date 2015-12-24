var path = require("path"),
    webpack = require("webpack");

module.exports = {
    cache:true,

    debug:true,

    devServer : {
        contentBase: "./dist",
        host:"localhost",
        inline: true,
        lazy:false,
        noInfo:false,
        quiet:false,
        port: 4000,
        stats:{
            colors:true,
            progress:true
        }
    },

    devtool:"source-map",

    entry: [
        path.resolve(__dirname, "src/index")
    ],

    eslint:{
        configFile:"./.eslintrc",
        emitError:true,
        failOnError:true,
        failOnWarning:false,
        formatter:require("eslint-friendly-formatter")
    },

    module: {
        preLoaders: [
            {
                exclude: /.idea|dist|node_modules/,
                loader: "eslint-loader",
                test: /\.js$/
            }
        ],

        loaders: [
            {
                exclude: /node_modules/,
                loader: "babel",
                test: /\.(js|jsx)?$/
            }

        ]
    },

    output: {
        filename:"dist/crio.js",
        library:"crio",
        libraryTarget:"var"
    },

    plugins:[
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify("development")
            }
        })
    ],

    resolve:{
        extensions: [
            "",
            ".js",
            ".jsx"
        ],

        /* Allows you to require("models/myModel") instead of needing relative paths */
        fallback : [
            path.join(__dirname, "src")
        ],

        root : __dirname
    }
};