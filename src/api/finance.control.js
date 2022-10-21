import HttpClientUtil from "@/libs/utils/http-client.util";

export class FinanceControl {
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
     * @des股票列表请求
     * params 请求参数
     * **/
    static financeList = params => {
        return HttpClientUtil.postJsonData("finance/list", params);
    };

    /**
     * @des股票上下架操作
     * params 请求参数
     * **/
    static financeStatus = params => {
        return HttpClientUtil.postJsonData("finance/status", params);
    };

    /**
     * @des股票信息删除操作
     * params 请求参数
     * **/
    static financeDelete = params => {
        return HttpClientUtil.postJsonData("finance/delete", params);
    };

    /**
     * @des股票信息新建或者编辑
     * params 请求参数
     * **/
    static actionFinance = params => {
        return HttpClientUtil.postJsonData("finance/actionFinance", params);
    };
}
