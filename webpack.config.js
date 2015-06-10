module.exports = {
    context: __dirname + "/spec",
    entry: "./test.cjsx",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.cjsx$/, loader: "coffee-jsx-loader" }
        ]
    }
};
