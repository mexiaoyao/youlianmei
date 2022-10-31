/**
 * 菜单数据
 * @author zl
 * @date 2022/08/17
 */
export default [
    {
        key: "index",
        icon: "user",
        meta: {
            title: "首页"
        },
        name: "home",
        path: "/home"
    },
    {
        key: "finance",
        icon: "read",
        meta: {
            title: "金融行业"
        },
        name: "finance",
        path: "/finance",
        children: [
            {
                key: "finance.date",
                meta: {
                    title: "更新日期"
                },
                name: "finance-date",
                path: "/finance/date"
            },
            {
                key: "finance.list",
                meta: {
                    title: "股票列表"
                },
                name: "finance-list",
                path: "/finance/list"
            },
            {
                key: "finance.detail",
                meta: {
                    title: "股票详情页"
                },
                name: "finance-detail",
                path: "/finance/detail/:id"
            }
            // {
            //     key: "finance.update",
            //     meta: {
            //         title: "股票更新"
            //     },
            //     name: "finance-update",
            //     path: "/finance/update"
            // }
        ]
    }
    /*
    {
        key: "health",
        icon: "read",
        meta: {
            title: "健康管理"
        },
        name: "health",
        path: "/health",
        children: [
            {
                key: "health.pulse",
                meta: {
                    title: "脉搏"
                },
                name: "health-list",
                path: "/health/pulse"
            },
            {
                key: "health.import",
                meta: {
                    title: "数据导入"
                },
                name: "health-import",
                path: "/health/import"
            }
        ]
    }*/
];
