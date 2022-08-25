//通常会在API中 将所有的请求封装成方法
//先引入封装个好的axios
import axios from "@/axios/axios";
/*
三同协议：同协议 同域名 同端口
三同协议 但凡有一个不同 都会产生跨域的问题
后端api:http://127.0.0.1:/api/admin/c_getAllUsers
前段服务器://http://localhost:8080/test

对比 以后就会发现  很明显 端口号不同  所以跨域  无法进行数据交互

解决方法 : 在vue.config.js中 设置跨域处理
*/
export default {
    //封装查询用户的方法
    async getAllUsers() {
        let res = await axios.post("/vueapi/api/admin/getAllUsers");
        return res;
    }
};
