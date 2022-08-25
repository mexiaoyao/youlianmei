import axios from "axios";

//在jq中 我们向后端发送请求 使用的是$.ajax
//在原生中 我们使用的是Xml 来发送请求
//在vue中 同创使用axios来发送请求
//axios起始就是一个对象 他讲所有的请求 封装成了对象中的属性
//比如 post=>axios.post()
// get=>axios.get()
//通常 我们不直接 使用axios
//axios 中  没有做同步异步的处理 多以 同步异步 需要我们手动封装
//封装时  采用 es6中的promise对象
/*
Promise对象 (是一个构造函数)
es6中异步编程的一种解决方案
(目前最先进的解决方案  就是  async 和await的搭配)
async和await的实现  是通过Promise来实现的

好处:
 防止回调地狱
 提高代码可读性
 向同步一样去执行异步操作
*/

export default {
    //使用promise 来封装 axios中的post请求
    //自己定义一个post方法
    post(url, data_ = {}) {
        //在自己定义的post方法中  将promise的实例化返回
        return new Promise((resolve, reject) => {
            //resolve 请求成功后  数据正常 使用此方法返回数据
            //reject请求成功后  数据异常  使用此方法 返回异常数据
            //在ptomise中 使用axios中的请求 发送请求
            axios
                .post(url, {
                    params: data_
                })
                .then(res => {
                    //.then 是Promise中请求成功是执行的方法
                    //类似于 ajax中的success
                    return resolve(res.data);
                })
                .catch(err => {
                    //.catch是Promise中请求失败时 执行的方法
                    //类似于ajax中的error
                    return reject(err);
                });
        });
    },
    //定义一个get方法
    get(url, data_) {
        return new Promise((resolve, reject) => {
            axios
                .get(url, {
                    params: data_
                })
                .then(res => {
                    return resolve(res.data);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }
};
