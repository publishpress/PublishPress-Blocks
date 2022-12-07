var glob = require("glob");
var path = require("path");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var minifyJS = new UglifyJSPlugin( {
    sourceMap: true,
    uglifyOptions: {
        output: {
            comments: /@license/i
        }
    }
} );

module.exports = [
    {
        entry: glob.sync(
            "./src/assets/**/*.jsx",
            {ignore: [
                "./src/assets/blocks/customstyles/*.jsx",
                "./src/assets/blocks/block-controls/*.jsx",
                "./src/assets/blocks/pro-ad/*.jsx",
                "./src/assets/blocks/editor-sidebar/*.jsx",
                "./src/assets/blocks/**/*.frontend.jsx",
                "./src/assets/js/editor.jsx"
            ]}
            ),
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, "src", "assets", "blocks"),
            filename: "blocks.min.js"
        },
        plugins: [minifyJS],
        module: {
            rules: [
                {
                    test: /\.(jsx)$/, // Identifies which file or files should be transformed.
                    use: { loader: "babel-loader" }, // Babel loader to transpile modern JavaScript.
                    exclude: [
                        /(node_modules|bower_components)/,
                    ]// JavaScript files to be ignored.
                }
            ]
        }
    },
    {
        entry: glob.sync(
            "./src/assets/blocks/customstyles/custom-styles.jsx",
            ),
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, "src", "assets", "blocks"),
            filename: "custom-styles.min.js"
        },
        plugins: [minifyJS],
        module: {
            rules: [
                {
                    test: /\.(jsx)$/, // Identifies which file or files should be transformed.
                    use: { loader: "babel-loader" }, // Babel loader to transpile modern JavaScript.
                    exclude: [
                        /(node_modules|bower_components)/,
                    ]// JavaScript files to be ignored.
                }
            ]
        }
    },
    {
        entry: glob.sync(
            "./src/assets/blocks/pro-ad/pro-ad.jsx",
            ),
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, "src", "assets", "blocks"),
            filename: "pro-ad.min.js"
        },
        plugins: [minifyJS],
        module: {
            rules: [
                {
                    test: /\.(jsx)$/, // Identifies which file or files should be transformed.
                    use: { loader: "babel-loader" }, // Babel loader to transpile modern JavaScript.
                    exclude: [
                        /(node_modules|bower_components)/,
                    ]// JavaScript files to be ignored.
                }
            ]
        }
    },
    {
        entry: glob.sync(
            "./src/assets/blocks/editor-sidebar/post-sidebar.jsx",
            ),
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, "src", "assets", "blocks"),
            filename: "post-sidebar.min.js"
        },
        plugins: [minifyJS],
        module: {
            rules: [
                {
                    test: /\.(jsx)$/, // Identifies which file or files should be transformed.
                    use: { loader: "babel-loader" }, // Babel loader to transpile modern JavaScript.
                    exclude: [
                        /(node_modules|bower_components)/,
                    ]// JavaScript files to be ignored.
                }
            ]
        }
    },
    {
        entry: glob.sync(
            "./src/assets/blocks/block-controls/block-controls.jsx",
            ),
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, "src", "assets", "blocks"),
            filename: "block-controls.min.js"
        },
        plugins: [minifyJS],
        module: {
            rules: [
                {
                    test: /\.(jsx)$/, // Identifies which file or files should be transformed.
                    use: { loader: "babel-loader" }, // Babel loader to transpile modern JavaScript.
                    exclude: [
                        /(node_modules|bower_components)/,
                    ]// JavaScript files to be ignored.
                }
            ]
        }
    },
    {
        entry: glob.sync("./src/assets/**/*.frontend.jsx"),
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, "src", "assets", "blocks"),
            filename: "frontend.min.js"
        },
        plugins: [minifyJS],
        module: {
            rules: [
                {
                    test: /\.(frontend.jsx)$/, // Identifies which file or files should be transformed.
                    use: { loader: "babel-loader" }, // Babel loader to transpile modern JavaScript.
                    exclude: /(node_modules|bower_components)/ // JavaScript files to be ignored.
                }
            ]
        }
    },
    {
        entry: glob.sync(
            "./src/assets/js/editor.jsx",
            ),
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, "src", "assets", "blocks"),
            filename: "editor.min.js"
        },
        plugins: [minifyJS],
        module: {
            rules: [
                {
                    test: /\.(jsx)$/, // Identifies which file or files should be transformed.
                    use: { loader: "babel-loader" }, // Babel loader to transpile modern JavaScript.
                    exclude: [
                        /(node_modules|bower_components)/,
                    ]// JavaScript files to be ignored.
                }
            ]
        }
    }
];
