const path = require("path");
const {
    MiniHtmlWebpackPlugin,
    generateAttributes,
    generateCSSReferences,
    generateJSReferences
} = require('mini-html-webpack-plugin');
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

                // TODO: You could push this to a separate file if you prefer
                return `<!DOCTYPE html>
                <html${htmlAttrs}>
                  <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;600&display=swap" rel="stylesheet">
                    <title>${title}</title>
                    ${cssTags}
                  </head>
                  <body>
                    <!-- Hero Section -->
                    <section id="hero">
                        <div class="max-w-6xl mx-auto text-center mb-40 px-10 pt-16">
                        <!-- <img src="images/logo.svg" alt="" class="mx-auto my-16"> -->
                        <svg class="mx-auto my-16"><use xlink:href="svg/spritesheet.svg#logo" /></svg>
                        </div>
                    </section>
                    ${jsTags}
                  </body>
                </html>`;
              }
        }),
        new SpriteLoaderPlugin()
    ]
}