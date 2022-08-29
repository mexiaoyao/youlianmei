<template>
    <div>
        <a-row>
            <Breadcrumb />
        </a-row>
        <a-row class="rowPdMar">
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
        <a-row class="rowPdMar">
            <a-table
                :data-source="list"
                :loading="isLoading"
                :locale="locale"
                :pagination="pagination"
                :rowKey="item => item.id"
            >
                <a-table-column align="center" key="id" title="序号">
                    <template slot-scope="text, item, index">{{ index+1 }}</template>
                </a-table-column>
                <a-table-column align="center" data-index="indexType" key="indexType" title="指数类型" />
                <a-table-column align="center" data-index="codeNumber" key="codeNumber" title="股票代码" />
                <a-table-column align="center" data-index="sharesName" key="sharesName" title="股票名称" />
                <a-table-column align="center" data-index="sharesAlise" key="sharesAlise" title="股票别名" />
                <a-table-column align="center" data-index="status" key="status" title="状态" />
                <a-table-column align="center" data-index="createTime" key="createTime" title="添加时间" />
                <a-table-column align="center" data-index="updateTime" key="updateTime" title="修改时间" />
                <a-table-column align="center" data-index="remarks" key="remarks" title="备注" />
                <a-table-column key="action" title="操作" width="180px">
                    <template slot-scope="text, item">
                        <div>
                            <a-button @click="showModal(item)" icon="edit" size="small" title="编辑" type="primary">编辑</a-button>
                            <a-button @click="deletes(item)" icon="delete" size="small" title="删除" type="danger">删除</a-button>
                        </div>
                    </template>
                </a-table-column>
            </a-table>
        </a-row>
    </div>
</template>
<script>
import axios from "axios";
import { constants } from "@/lib/constants";
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
            // axios.get("/ylm/indexCode").then((res) => {
            //     this.verCode = res;
            // });
            this.getfinanceList();
        },
        submitSearch() {},
        //定义一个请求数据的方法
        getfinanceList() {
            axios.post("/ylm/finance/list").then((res) => {
                this.list = res.data.data.list || [];
            });
        },
    },
};
</script>
<style scoped>
</style>