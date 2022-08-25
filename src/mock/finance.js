import Mock from "mockjs";

Mock.mock("/finance/list", "post", {
    code: 10000,
    data: {
        total: 100,
        page: 1,
        [`list|10`]: [
            {
                id: "@increment(1)",
                "indexType|1": [0, 1],
                codeNumber: "@cword('0123456789', 6, 6)", //随机生成留个数字
                sharesName: "@cname",
                sharesAlise: "@cname",
                "status|1": [0, 1],
                createTime: "@datetime",
                updateTime: "@datetime",
                remarks: "@csentence(1,5)"
            }
        ]
    }
});
