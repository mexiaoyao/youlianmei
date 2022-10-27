import HttpClientUtil from "@/libs/utils/http-client.util";

export class FinanceUpdateControl {
    /**
     * @des股票更新列表
     * params 请求参数
     * **/
    static updateList = params => {
        return HttpClientUtil.postJsonData("financeUpdate/list", params);
    };

    /**
     * @des股票上下架操作
     * params 请求参数
     * **/
    static   = params => {
        return HttpClientUtil.postJsonData("financeUpdate/getAgain", params);
    };
}
