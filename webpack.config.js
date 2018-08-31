const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: 'development',
    entry:  path.join(__dirname, 'client/src/index.tsx'),
    output: {
        path: path.join(__dirname, 'client/dist'),
        filename: 'bundle.js'
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
        modules: [
            path.join(__dirname, 'client/src'),
            'node_modules'
        ]
    },
    plugins: [
        // new BundleAnalyzerPlugin(), // Will give a graph of what modules are using what
        new webpack.NoEmitOnErrorsPlugin(),
        // NODE_ENV should be production so that modules do not perform certain development checks
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        }),
        new webpack.LoaderOptionsPlugin({}),
        new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks 
        new HtmlWebpackPlugin({
            title: "Cover This",
            meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
            template: path.join(__dirname, 'client/src/template.html'),
        }),
        // new TsconfigPathsPlugin({ configFile: "../../../tsconfig.json" })
    ],
    module: {
        rules: [
            // TS
            {   
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            // JSON
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            // LESS
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader"},
                    { loader: "css-loader"  },
                    { loader: "less-loader" }
                ]
            },
            // CSS
            {
                test: /\.css$/,
                loaders: [
                    { loader: "style-loader" },
                    { loader: "css-loader"   }
                ]
            },
            // SASS / SCSS
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { 
                        loader: "css-loader", 
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: "[name]__[local]__[hash:base64:5]"
                        }
                    },
                    { loader: "sass-loader" }
                ]
            },
            // WOFF Font
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                    limit: 10000,
                    mimetype: "application/font-woff",
                    }
                },
            },
            // WOFF2 Font
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                    limit: 10000,
                    mimetype: "application/font-woff",
                    }
                }
            },
            // TTF Font
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                    limit: 10000,
                    mimetype: "application/octet-stream"
                    }
                }
            },
            // EOT Font
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: "file-loader",
            },
            // SVG Font
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "image/svg+xml",
                    }
                }
            },
            // Common Image Formats
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
                use: "url-loader",
            }
        ]
    }
};