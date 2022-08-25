const API_FIEX = process.env.VUE_APP_API_FIEX;
console.log("API_FIEX", API_FIEX);
module.exports = {
    devServer: {
        port: 8888,
        // 是否在浏览器打开
        open: false,
        proxy: {
            "/api": {
                target: API_FIEX,
                // 获取cookie
                changeOrigin: true,
                secure: false,
                disableHostCheck: true
            }
        }
    }
};
