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

    static financeList = params => {
        return HttpClientUtil.postJsonData("finance/list", params);
    };
}
