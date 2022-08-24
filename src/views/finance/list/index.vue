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
                :data-source="tableData"
                :loading="isLoading"
                :locale="locale"
                :pagination="pagination"
                :rowKey="item => item.id"
            >
                <a-table-column align="center" title="序号">
                    <template slot-scope="text, item, index">{{ index+1 }}</template>
                </a-table-column>
                <a-table-column align="center" data-index="date" title="日期" />
                <a-table-column align="center" data-index="feild1" title="新增好友数" />
                <a-table-column align="center" data-index="feild2" title="活跃好友数" />
                <a-table-column align="center" data-index="feild3" title="解除好友数" />
                <a-table-column align="center" data-index="feild4" title="拉黑好友数" />
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
            tableData: [],
            pagination: {},
            locale: { emptyText: <a-empty description="暂无数据" /> },
        };
    },
    watch: {},
    created() {
        this.init();
    },
    methods: {
        init() {},
        submitSearch() {},
    },
};
</script>
<style scoped>
</style>