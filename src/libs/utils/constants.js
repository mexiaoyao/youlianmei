export default class Constants {
    /***
     * 股票全局设置
     * **/
    static FINANCE = {
        /**
         * 指数类型
         * **/
        INDEX_TYPE: [
            { code: 0, codeName: "全部" },
            { code: 1, codeName: "沪指" },
            { code: 2, codeName: "深指" }
        ],
        /**
         * 指数类型
         * **/
        INDEX_TYPE_CODE: [
            { code: 1, codeName: ".SH" },
            { code: 2, codeName: ".SZ" }
        ],
        /**
         * 股票状态
         * @parme “正常”表示可以自动获取股票数据了 “待转正”表示当前记录还不完善。
         * **/
        STATUS: [
            { code: 0, codeName: "全部" },
            { code: 1, codeName: "上线" },
            { code: 2, codeName: "下线" }
        ]
    };
}
