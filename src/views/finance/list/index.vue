<template>
    <div>
        <a-row>
            <Breadcrumb />
        </a-row>
        <a-row class="rowPdMar">
            <a-form :form="form" @submit="submitSearch" layout="inline">
                <a-form-item label="指数类型">
                    <a-select :style="{width:'100px'}" v-model="form.indexType">
                        <a-select-option
                            :key="index"
                            :value="item.code"
                            v-for="(item,index) in indexTypeList"
                        >{{item.codeName}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="股票代码">
                    <a-input placeholder="请输入股票代码" v-model="form.codeNumber"></a-input>
                </a-form-item>
                <a-form-item label="股票名称">
                    <a-input placeholder="请输入股票名称" v-model="form.sharesName"></a-input>
                </a-form-item>
                <a-form-item label="股票别名">
                    <a-input placeholder="请输入股票别名" v-model="form.sharesAlise"></a-input>
                </a-form-item>
                <a-form-item label="状态">
                    <a-select :style="{width:'100px'}" v-model="form.status">
                        <a-select-option
                            :key="index"
                            :value="item.code"
                            v-for="(item,index) in statusList"
                        >{{item.codeName}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="添加时间">
                    <a-date-picker
                        :disabled-date="disabledStartDateCreateTime"
                        @openChange="handleStartOpenChange"
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请输入开始时间"
                        show-time
                        v-model="createTimeStart"
                    />
                    <a-date-picker
                        :disabled-date="disabledEndDateCreateTime"
                        :open="endOpen"
                        @openChange="handleEndOpenChange"
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请输入结束时间"
                        show-time
                        v-model="createTimeStartEnd"
                    />
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
                <a-table-column align="center" title="股票编码">
                    <template slot-scope="text, item">
                        <span>{{item.codeNumber}}{{ item.indexType | CusListFind(indexTypeCodeList, 'code', 'codeName') }}</span>
                    </template>
                </a-table-column>
                <a-table-column align="center" data-index="indexType" key="indexType" title="指数类型">
                    <template slot-scope="text, item">
                        <span>{{ item.indexType | CusListFind(indexTypeList, 'code', 'codeName') }}({{ item.indexType | CusListFind(indexTypeCodeList, 'code', 'codeName') }})</span>
                    </template>
                </a-table-column>
                <a-table-column align="center" data-index="codeNumber" key="codeNumber" title="股票代码" />
                <a-table-column align="center" data-index="sharesName" key="sharesName" title="股票名称" />
                <a-table-column align="center" data-index="sharesAlise" key="sharesAlise" title="股票别名" />
                <a-table-column align="center" data-index="status" key="status" title="状态">
                    <template slot-scope="text, item">
                        <span
                            :style="{color: item.status===1?'#67C23A':'#303133'}"
                        >{{ item.status | CusListFind(statusList, 'code', 'codeName') }}</span>
                    </template>
                </a-table-column>
                <a-table-column align="center" data-index="createTime" key="createTime" title="添加时间" />
                <a-table-column align="center" data-index="updateTime" key="updateTime" title="修改时间" />
                <a-table-column align="center" data-index="remarks" key="remarks" title="备注" />
                <a-table-column align="center" key="action" title="操作" width="180px">
                    <template slot-scope="text, item">
                        <div style="text-align:right;">
                            <a-button
                                @click="showModal(item)"
                                icon="edit"
                                size="small"
                                title="编辑"
                                type="primary"
                                v-if="item.status===2"
                            />
                            <a-button
                                @click="deletes(item)"
                                icon="check"
                                size="small"
                                title="上线"
                                type="primary"
                                v-if="item.status===2"
                            />
                            <a-button
                                @click="deletes(item)"
                                icon="close"
                                size="small"
                                title="下线"
                                type="primary"
                                v-if="item.status===1"
                            />
                            <a-button
                                @click="deletes(item)"
                                icon="delete"
                                size="small"
                                title="删除"
                                type="danger"
                                v-if="item.status===2"
                            />
                        </div>
                    </template>
                </a-table-column>
            </a-table>
        </a-row>
    </div>
</template>
<script>
import axios from "axios";
import Constants from "@/libs/utils/constants";
import Breadcrumb from "@/components/common/Breadcrumb";
export default {
    name: "finance-list",
    components: { Breadcrumb },
    data() {
        return {
            isLoading: false,
            form: {
                indexType: 0,
                codeNumber: "",
                sharesName: "",
                sharesAlise: "",
                status: 0,
                createTimeStart: undefined,
                createTimeStartEnd: undefined,
            },
            page: 1,
            taotal: 0,
            list: [],
            pagination: {},
            locale: { emptyText: <a-empty description="暂无数据" /> },

            indexTypeList: Constants.FINANCE.INDEX_TYPE,
            indexTypeCodeList: Constants.FINANCE.INDEX_TYPE_CODE,
            statusList: Constants.FINANCE.STATUS,

            endOpenCreateTime: false,
        };
    },
    watch: {},
    created() {
        this.init();
    },
    methods: {
        disabledStartDateCreateTime(startValue) {
            const endValue = this.form.createTimeStartEnd;
            if (!startValue || !endValue) {
                return false;
            }
            return startValue.valueOf() > endValue.valueOf();
        },
        disabledEndDateCreateTime(endValue) {
            const startValue = this.form.createTimeStart;
            if (!endValue || !startValue) {
                return false;
            }
            return startValue.valueOf() >= endValue.valueOf();
        },
        handleStartOpenChange(open) {
            if (!open) {
                this.endOpenCreateTime = true;
            }
        },
        handleEndOpenChange(open) {
            this.endOpenCreateTime = open;
        },

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