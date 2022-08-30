const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

module.exports = {
    entry: {index: "./src/index.ts"},
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
        watchFiles: ["src/**/*"]
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
                test: /\.(png|jpg|jpeg|gif)$/i,
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
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index'],
            // publicPath: true
        }),
        new SpriteLoaderPlugin()
    ]
}