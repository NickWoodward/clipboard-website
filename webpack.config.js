const path = require("path");
const {
    MiniHtmlWebpackPlugin,
    generateAttributes,
    generateCSSReferences,
    generateJSReferences
} = require('mini-html-webpack-plugin');
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const { indexTemplate } = require('./templates')

module.exports = {
    entry: {index: "./src/js/index.ts"},
    mode: "development",
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
          },
        port: 3000,
        open: {
            app: {
              name: 'chrome',
            },
          },
        hot: true,
        compress: true,
        historyApiFallback: true,
        watchFiles: ["src/**/*", "./templates.js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, "src"),
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
              },
              {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: 'svg/spritesheet.svg'
                        },
                    },
                    'svgo-loader',
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        // clean: true,
    },
    plugins: [
        new MiniHtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index'],
            context: {
                title: 'Copy Site',
                htmlAttributes: {
                  lang: 'en'
                },
                cssAttributes: {
                  rel: 'preload',
                  as: 'style'
                },
                jsAttributes: {
                  defer: true
                }
              },
            template: ({
                css,
                js,
                publicPath,
                title,
                htmlAttributes,
                cssAttributes,
                jsAttributes
              }) => {
                const htmlAttrs = generateAttributes(htmlAttributes);
                const cssTags = generateCSSReferences({
                  files: css,
                  attributes: cssAttributes,
                  publicPath
                });
                const jsTags = generateJSReferences({
                  files: js,
                  attributes: jsAttributes,
                  publicPath
                });

                return indexTemplate({ htmlAttrs, cssTags, jsTags, title })
              }
        }),
        new SpriteLoaderPlugin()
    ]
}