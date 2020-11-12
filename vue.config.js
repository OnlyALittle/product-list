const path = require('path');

module.exports = {
    // 部署应用时的基本 URL
    publicPath: '/',

    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',

    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
    lintOnSave: process.env.NODE_ENV !== 'production',

    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,

    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
    productionSourceMap: true,
    configureWebpack: config => {
        config.resolve = {
            // 配置解析别名
            extensions: [".js", '.json', '.vue'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                components: path.resolve(__dirname, './src/components')
            }
        };
    },

    chainWebpack: () => { },
};