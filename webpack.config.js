const buildScript = require('./src/frontend/views/assets/build-script')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const plugins = [
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "css/[name].css"
    })
]

const _module = {
    rules: [{
        test: /\.(sa|sc|c)ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
        ]
    }]
}

module.exports = {
    entry: buildScript.entry,
    output: buildScript.output,
    mode: 'production',
    plugins,
    module: _module
}