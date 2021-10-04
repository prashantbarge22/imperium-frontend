const isProd                  = process.env.NODE_ENV === 'production';
const devMode                 = !isProd;
const vueConfig               = require('./vue-loader.config');
const vueContext              = require('./vue-context.js');
const path                    = require('path');
const webpack                 = require('webpack');
const MiniCssExtractPlugin    = require("mini-css-extract-plugin");
const PreloadWebpackPlugin    = require('@vue/preload-webpack-plugin');
const VueSSRClientPlugin      = require('vue-server-renderer/client-plugin');
const SWPrecachePlugin        = require('sw-precache-webpack-plugin');
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const CopyWebpackPlugin       = require('copy-webpack-plugin');
const VueLoaderPlugin         = require('vue-loader/lib/plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin      = require('clean-webpack-plugin');
const TerserPlugin            = require('terser-webpack-plugin');

const webpackConfig = {
    mode: isProd ? 'production' : 'development',
    entry: {
        app: './src/entry-client.js'
    },
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
        path      : path.resolve(__dirname, '..', 'dist'),
        publicPath: '/',
        filename  : '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            'root'    : path.resolve(__dirname, '..'),
            'public'  : path.resolve(__dirname, '..', 'public'),
            'src'     : path.resolve(__dirname, '..', 'src'),
            'consts'  : path.resolve(__dirname, '..', 'src', 'consts'),
            'models'  : path.resolve(__dirname, '..', 'src', 'models'),
            'client'  : path.resolve(__dirname, '..', 'src', 'client'),
            'store'   : path.resolve(__dirname, '..', 'src', 'store'),
            'modules' : path.resolve(__dirname, '..', 'src', 'modules'),
            'services': path.resolve(__dirname, '..', 'src', 'services'),
        }
    },
    performance: {
        maxEntrypointSize: 300000,
        hints            : isProd ? 'warning' : false
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                manifest: {
                    test: /manifest/
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,
                sourceMap: devMode,
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.EnvironmentPlugin({
            'NODE_ENV': devMode ? '"development"' : '"production"',
            'VUE_ENV' : '"client"'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : 'common.[chunkhash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new VueSSRClientPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.hbs',
            templateParameters: vueContext
        }),
        new PreloadWebpackPlugin(),
        new webpack.ProvidePlugin({}),
        new CopyWebpackPlugin([
            { from: 'public', to: 'public'},
            { from: 'manifest.json'}
        ]),
        new VueLoaderPlugin()
    ],
    module: {
        noParse: [
            /es6-promise\.js$/
        ],
        rules: [
            {
                test   : /\.vue$/,
                loader : 'vue-loader',
                options: vueConfig
            },
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-regenerator', '@babel/plugin-transform-runtime']
                }
            },
            {
                test   : /\.(png|jpg|gif|svg)$/,
                loader : 'url-loader',
                options: {
                    limit: 10000,
                    name : '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }
        ]
    }
};

if (isProd)
{
    webpackConfig.plugins.push(new SWPrecachePlugin({
        cacheId: 'WebDollar-PWA',
        filename: 'service-worker.js',
        minify: true,
        dontCacheBustUrlsMatching: /./,
        staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
        runtimeCaching: [
            {
                urlPattern: '/',
                handler: 'networkFirst'
            },
            {
                urlPattern: /\/(top|new|show|ask|jobs)/,
                handler: 'networkFirst'
            },
            {
                urlPattern: '/item/:id',
                handler: 'networkFirst'
            },
            {
                urlPattern: '/user/:id',
                handler: 'networkFirst'
            }
        ]
    }));
}

module.exports = webpackConfig;
