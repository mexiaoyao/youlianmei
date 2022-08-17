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
        path: "/home"
    },
    {
        key: "finance",
        icon: "read",
        meta: {
            title: "金融行业"
        },
        path: "/finance",
        children: [
            {
                key: "finance.list",
                meta: {
                    title: "股票列表"
                },
                path: "/finance/list"
            },
            {
                key: "finance.update",
                meta: {
                    title: "股票更新"
                },
                path: "/finance/update"
            }
        ]
    },
    {
        key: "health",
        icon: "read",
        meta: {
            title: "健康管理"
        },
        path: "/health",
        children: [
            {
                key: "health.pulse",
                meta: {
                    title: "脉搏"
                },
                path: "/health/pulse"
            },
            {
                key: "health.import",
                meta: {
                    title: "数据导入"
                },
                path: "/health/import"
            }
        ]
    }
];
