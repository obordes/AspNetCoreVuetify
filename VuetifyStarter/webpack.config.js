var path = require('path')
var webpack = require('webpack')
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const bundleOutputDir = './wwwroot/dist'; // './dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    return [{
    resolve: {
        // For modules referenced with no filename extension, Webpack will consider these extensions
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    entry: {
        // The loader will follow all chains of reference from this entry point...
        main: ['./src/index.ts']
    },
    output: {
        // ... and emit the built result in this location
        path: path.resolve(__dirname, bundleOutputDir),
        filename: '[name].js',

        // Since UseWebpackDevMiddleware needs to know which incoming requests to intercept, make sure you've specified a publicPath value on your output
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                  appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevBuild ? 'development' : 'production')
                }
            }),
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                warnings: false
                }
            }),
            new webpack.LoaderOptionsPlugin({
              minimize: true
            })
        ])
    }];
};

//if (process.env.NODE_ENV === 'production') {
//  module.exports.devtool = '#source-map'
//  // http://vue-loader.vuejs.org/en/workflow/production.html
//  module.exports.plugins = (module.exports.plugins || []).concat([
//    new webpack.DefinePlugin({
//      'process.env': {
//        NODE_ENV: '"production"'
//      }
//    }),
//    new webpack.optimize.UglifyJsPlugin({
//      sourceMap: true,
//      compress: {
//        warnings: false
//      }
//    }),
//    new webpack.LoaderOptionsPlugin({
//      minimize: true
//    })
//  ])
//}