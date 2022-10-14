// 6.封装接口
import api from "@/libs/utils/request";

//下面是简写的形式
// getXXX 自定义的接口名字
//export const getXXX = params => api.get(`/mortgage/cal/debx`, { params });
//export const postXXX = params => api.post(`/mortgage/cal/debx`, params);

// 下面是详细的写法
/**
 * url 请求路径
 * type post get
 * **/
export const httpAjax = (url, type, params) =>
    api({
        url: url, // 请求地址
        method: type, // 请求方式
        data: params // (一般post请求，我们习惯使用 data属性来传参)
        //params: params //(一般get请求，我们习惯使用params属性来传参）
        // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
    });
