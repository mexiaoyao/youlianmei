import Mock from "mockjs";
//@increment(1) 自增主键
//@uuid 获取uuid

// Mock.mock("/ylm/finance/list", "post", {
//     code: 10000,
//     data: {
//         total: 100,
//         page: 1,
//         [`list|10`]: [
//             {
//                 id: "@uuid",
//                 "indexType|1": [1, 2],
//                 codeNumber: "@cword('0123456789', 6, 6)", //随机生成留个数字
//                 sharesName: "@cname",
//                 sharesAlise: "@cname",
//                 "sharesTotalNumber|10000-100000": 1, //股票总数
//                 "sharesAllowTotalNumber|10000-100000": 1, //可流动股票总数
//                 "status|1": [1, 2],
//                 loadTime: "@datetime", //最后获取日期
//                 createTime: "@datetime",
//                 updateTime: "@datetime",
//                 remarks: "@csentence(1,5)"
//             }
//         ]
//     }
// });
Mock.mock("/ylm/finance/detail", "post", {
    code: 10000,
    data: {
        total: 100,
        page: 1,
        [`list|100`]: [
            {
                id: "@increment(1)",
                sharesId: "@uuid", //股票id
                sharesName: "@cname", //股票名字
                codeNumber: "@cword('0123456789', 6, 6)", //股票编码
                "todayOpenPrice|1-100.1-10": 1, //今日开盘价
                "yesterdayClosePrice|1-100.1-10": 1, //昨日收盘价
                "todayMaxPrice|1-100.1-10": 1, //今日最高价
                "todayMinPrice|1-100.1-10": 1, //今日最低价
                "todayAveragePrice|1-100.1-10": 1, //今日平均价
                "dealSharesNumber|1000-10000": 1, //成交的股票数
                "dealAmount|1000-10000": 1, //成交金额
                "source|1": [1, 2, 3], //1定时器 2导入 3手动添加
                "sharesTotalNumber|10000-100000": 1, //股票总数
                "sharesAllowTotalNumber|10000-100000": 1, //可流动股票总数
                sharesDate: "@date", //记录时间
                createTime: "@datetime",
                updateTime: "@datetime",
                remarks: "@csentence(1,5)"
            }
        ]
    }
});
Mock.mock("/ylm/finance/deleteById", "post", {
    code: 10000
});

// Mock.mock("/ylm/finance/actionFinance", "post", {
//     code: 10000
// });

//上架下架
// Mock.mock("/ylm/finance/status", "post", {
//     code: 10000
// });
// //删除
// Mock.mock("/ylm/finance/delete", "post", {
//     code: 10000
// });

//更新记录
// Mock.mock("/ylm/financeUpdate/list", "post", {
//     code: 10000,
//     data: {
//         total: 100,
//         page: 1,
//         [`list|100`]: [
//             {
//                 id: "@uuid",
//                 sharesId: "@uuid", //股票id
//                 "status|1": [1, 2],
//                 "failNum|1": [0, 1, 2],
//                 createTime: "@datetime",
//                 remarks: "@csentence(1,5)"
//             }
//         ]
//     }
// });

//股票记录重新获取
// Mock.mock("/ylm/financeUpdate/getAgain", "post", {
//     code: 10000
// });

//日历添加注释
Mock.mock("/ylm/finance/addNotes", "post", {
    code: 10000
});
