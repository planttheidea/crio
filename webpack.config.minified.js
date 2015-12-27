var path = require("path"),
    webpack = require("webpack"),
    defaultConfig = require("./webpack.config"),
    productionConfig = Object.assign({}, defaultConfig, {
        cache:false,

        debug:false,

        output: Object.assign({}, defaultConfig.output, {
            filename:"dist/crio.min.js"
        }),

        plugins:[
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress:{
                    booleans:true,
                    conditionals:true,
                    drop_console:true,
                    drop_debugger:true,
                    join_vars:true,
                    screw_ie8:true,
                    sequences:true,
                    warnings:false
                },
                mangle:{
                    except:[
                        "CrioDate",
                        "CrioList",
                        "CrioMap"
                    ]
                },
                sourceMap:false
            })
        ]
    });

delete productionConfig.devtool;

module.exports = productionConfig;