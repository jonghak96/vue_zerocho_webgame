const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");

module.exports = {
    mode: "development",
    devtool: "eval",
    resolve: {
        extensions: [".js", ".vue"]
    },
    entry: {
        app: path.join(__dirname, "main.js")
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: "vue-loader",
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: "[name].js",
        // path: "/Users/jellyforest/Documents/VueJS/ZeroCho/vue-webgame/3.숫자야구/dist",
        path: path.join(__dirname, "dist"),
    },
};