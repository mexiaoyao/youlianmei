import HttpClientUtil from "@/libs/utils/http-client.util";

export class GradeDictControl {
    /**
     * @des列表请求
     * params 请求参数
     * **/
    static listAll = params => {
        return HttpClientUtil.postJsonData("gradeDict/listAll", params);
    };

    /**
     * @des列表请求
     * params 请求参数
     * **/
    static list = params => {
        return HttpClientUtil.postJsonData("gradeDict/list", params);
    };

    /**
     * @des信息删除操作
     * params 请求参数
     * **/
    static delete = params => {
        return HttpClientUtil.postJsonData("gradeDict/delete", params);
    };

    /**
     * @des信息新建或者编辑
     * params 请求参数
     * **/
    static actionDo = params => {
        return HttpClientUtil.postJsonData("gradeDict/actionDo", params);
    };
}
