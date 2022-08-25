<template>
    <div>
        <a-row>
            <Breadcrumb />
        </a-row>
        <a-row class="pdlr20 paddtb15">
            <a-form :form="form" @submit="submitSearch" layout="inline">
                <a-form-item label="名称">
                    <a-input placeholder="名称"></a-input>
                </a-form-item>
                <a-form-item label="编码">
                    <a-input placeholder="编号"></a-input>
                </a-form-item>
                <a-form-item>
                    <a-button :disabled="isLoading" html-type="submit" type="primary">查询</a-button>
                </a-form-item>
            </a-form>
        </a-row>
        <a-row>
            <a-table
                :data-source="list"
                :loading="isLoading"
                :locale="locale"
                :pagination="pagination"
                :rowKey="item => item.id"
            >
                <a-table-column align="center" title="序号">
                    <template slot-scope="text, item, index">{{ index+1 }}</template>
                </a-table-column>
                <a-table-column align="center" data-index="indexType" title="指数类型" />
                <a-table-column align="center" data-index="codeNumber" title="股票代码" />
                <a-table-column align="center" data-index="sharesName" title="股票名称" />
                <a-table-column align="center" data-index="sharesAlise" title="股票别名" />
                <a-table-column align="center" data-index="status" title="状态" />
                <a-table-column align="center" data-index="createTime" title="添加时间" />
                <a-table-column align="center" data-index="updateTime" title="修改时间" />
                <a-table-column align="center" data-index="remarks" title="备注" />
            </a-table>
        </a-row>
    </div>
</template>
<script>
import Breadcrumb from "@/components/common/Breadcrumb";
export default {
    name: "finance-list",
    components: { Breadcrumb },
    data() {
        return {
            isLoading: false,
            form: {
                name: "",
                code: "",
                alias: "",
            },
            page: 1,
            taotal: 0,
            list: [],
            pagination: {},
            locale: { emptyText: <a-empty description="暂无数据" /> },
        };
    },
    watch: {},
    created() {
        this.init();
    },
    methods: {
        init() {
            $axios
                .get("https://172.16.8.152:10669/server-enterprise/loginController/getVerCode.vrv?ran=1661417419716")
                .then(function (response) {
                    debugger;
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            //this.getfinanceList();
        },
        submitSearch() {},
        //定义一个请求数据的方法
        async getfinanceList() {
            let res = await FinanceControl.getfinanceList({});
            this.tableData = res;
        },
    },
};
</script>
<style scoped>
</style>