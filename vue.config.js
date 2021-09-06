module.exports = {
  lintOnSave: false,//你是否使用eslint规范
  productionSourceMap: false,//打包时去掉map文件
  publicPath:'./',//解决打包时css和js以及静态文件路径不正确问题
  devServer: {
    port: 3033,
    host: "0.0.0.0",
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    //配置多个代理的话，直接在proxy写就可以
    //productionSourceMap: false,//打包时去掉map文件
    // proxy: {
    //   "/api/*": {
    //     target: "http://192.168.2.221:8095",
    //     ws: true,
    //     changeOrigin: true,
    //     timeout: 1920000,
    //     pathRewrite: {
    //       "^/api": ""
    //     }
    //   }
    // },
  }
};
