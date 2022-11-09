import HttpClientUtil from "@/libs/utils/http-client.util";

export class LoginControl {
    /*
    //写法一
    static menu() {
        return HttpClientUtil.postJsonData("/sys/menu");
    }
    //写法二
    static house = {
        housePhotosById: params => {
            return HttpClientUtil.postJsonData("sys/house/housePhotosById", params);
        }
    };
    */

    /**
     * @des获取校验码
     * params 请求参数
     * **/
    static getCode = params => {
        return HttpClientUtil.get("code", params);
    };

    /**
     * @des股票上下架操作
     * params 请求参数
     * **/
    static LoginSubmit = params => {
        return HttpClientUtil.postJsonData("/login", params);
    };
}
