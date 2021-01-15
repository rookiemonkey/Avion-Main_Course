const common = require("./webpack.config.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {

    mode: 'development',

    devtool: 'eval-source-map',

});