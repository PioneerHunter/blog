module.exports = {
  devServer: {
    // 代理，解决跨域
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000/api",
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      },
    },
  },
};
