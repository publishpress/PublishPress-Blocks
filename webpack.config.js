var glob = require("glob");
var path = require("path");

module.exports = {
    entry: glob.sync("./assets/**/*.jsx"),
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, "assets", "blocks"),
        filename: "blocks.js"
    },

    module: {
        rules: [
            {
                test: /\.(jsx)$/, // Identifies which file or files should be transformed.
                use: { loader: "babel-loader" }, // Babel loader to transpile modern JavaScript.
                exclude: /(node_modules|bower_components)/ // JavaScript files to be ignored.
            }
        ]
    }
};
