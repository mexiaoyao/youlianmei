<template>
    <div>
        <a-row class="rowPdMar">
            <a-form labelAlign="right" layout="inline">
                <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" class="formItem" label="今日开盘价">
                    <a-input-number :step="0.01" v-model="form.todayOpenPrice_1" />~
                    <a-input-number :step="0.01" v-model="form.todayOpenPrice_2" />
                </a-form-item>
                <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" class="formItem" label="昨日收盘价">
                    <a-input-number :step="0.01" v-model="form.yesterdayClosePrice_1" />~
                    <a-input-number :step="0.01" v-model="form.yesterdayClosePrice_2" />
                </a-form-item>
                <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" class="formItem" label="今日最高价">
                    <a-input-number :step="0.01" v-model="form.todayMaxPrice_1" />~
                    <a-input-number :step="0.01" v-model="form.todayMaxPrice_2" />
                </a-form-item>
                <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" class="formItem" label="今日最低价">
                    <a-input-number :step="0.01" v-model="form.todayMinPrice_1" />~
                    <a-input-number :step="0.01" v-model="form.todayMinPrice_2" />
                </a-form-item>
                <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" class="formItem" label="今日平均价">
                    <a-input-number :step="0.01" v-model="form.todayAveragePrice_1" />~
                    <a-input-number :step="0.01" v-model="form.todayAveragePrice_2" />
                </a-form-item>
                <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" class="formItem" label="成交的股票数">
                    <a-input-number v-model="form.dealSharesNumber_1" />~
                    <a-input-number v-model="form.dealSharesNumber_2" />
                </a-form-item>
                <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" class="formItem" label="成交金额">
                    <a-input-number v-model="form.dealAmount_1" />~
                    <a-input-number v-model="form.dealAmount_2" />
                </a-form-item>
                <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" class="formItem" label="来源">
                    <a-select style="width: 120px" v-model="form.source">
                        <a-select-option
                            :key="'source_'+index"
                            :value="item.code"
                            v-for="(item,index) in sourceList"
                        >{{item.codeName}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" class="formItem" label="股票总数">
                    <a-input-number v-model="form.sharesTotalNumber_1" />~
                    <a-input-number v-model="form.sharesTotalNumber_2" />
                </a-form-item>
                <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" class="formItem" label="可流动股票总数">
                    <a-input-number v-model="form.sharesAllowTotalNumber_1" />~
                    <a-input-number v-model="form.sharesAllowTotalNumber_2" />
                </a-form-item>
                <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" class="formItem" label="记录时间">
                    <a-date-picker class="range" format="YYYY-MM-DD" v-model="timeData.sharesDate[0]" />~
                    <a-date-picker class="range" format="YYYY-MM-DD" v-model="timeData.sharesDate[1]" />
                </a-form-item>
                <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" class="formItem" label="注入时间">
                    <a-date-picker class="range" format="YYYY-MM-DD" v-model="timeData.createTime[0]" />~
                    <a-date-picker class="range" format="YYYY-MM-DD" v-model="timeData.createTime[1]" />
                </a-form-item>
                <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" class="formItem" label="更新时间">
                    <a-date-picker class="range" format="YYYY-MM-DD" v-model="timeData.updateTime[0]" />~
                    <a-date-picker class="range" format="YYYY-MM-DD" v-model="timeData.updateTime[1]" />
                </a-form-item>
                <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" class="formItem" label="备注">
                    <a-input v-model="form.remarks" />
                </a-form-item>
                <a-form-item>
                    <a-button :disabled="isLoading" @click="getfinanceDetail" type="primary">查询</a-button>
                    <a-button :disabled="isLoading" @click="resetForm" type="primary">重置</a-button>
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
                :scroll="{ x: 2640, y: 500 }"
            >
                <a-table-column align="center" key="id" title="序号" width="100">
                    <template slot-scope="text, item, index">{{ index+1 }}</template>
                </a-table-column>
                <a-table-column align="center" title="股票编码" width="100">
                    <template slot-scope="text, item">
                        <span>{{item.codeNumber}}</span>
                    </template>
                </a-table-column>
                <a-table-column align="center" data-index="sharesName" key="sharesName" title="股票名称" width="120" />
                <a-table-column
                    align="center"
                    data-index="todayOpenPrice"
                    key="todayOpenPrice"
                    title="今日开盘价"
                    width="130"
                />
                <a-table-column
                    align="center"
                    data-index="yesterdayClosePrice"
                    key="yesterdayClosePrice"
                    title="昨日收盘价"
                    width="130"
                />
                <a-table-column
                    align="center"
                    data-index="todayMaxPrice"
                    key="todayMaxPrice"
                    title="今日最高价"
                    width="130"
                />
                <a-table-column
                    align="center"
                    data-index="todayMinPrice"
                    key="todayMinPrice"
                    title="今日最低价"
                    width="130"
                />
                <a-table-column
                    align="center"
                    data-index="todayAveragePrice"
                    key="todayAveragePrice"
                    title="今日平均价"
                    width="130"
                />
                <a-table-column
                    align="center"
                    data-index="dealSharesNumber"
                    key="dealSharesNumber"
                    title="成交的股票数"
                    width="160"
                />
                <a-table-column align="center" data-index="dealAmount" key="dealAmount" title="成交金额" width="160" />
                <a-table-column align="center" data-index="source" key="source" title="来源">
                    <template slot-scope="text, item">
                        <span>{{ item.source | CusListFind(sourceList, 'code', 'codeName') }}</span>
                    </template>
                </a-table-column>
                <a-table-column
                    align="center"
                    data-index="sharesTotalNumber"
                    key="sharesTotalNumber"
                    title="股票总数"
                    width="160"
                />
                <a-table-column
                    align="center"
                    data-index="sharesAllowTotalNumber"
                    key="sharesAllowTotalNumber"
                    title="可流动股票总数"
                    width="190"
                />
                <a-table-column align="center" data-index="createTime" key="sharesDate" title="记录时间" width="260" />
                <a-table-column align="center" data-index="createTime" key="createTime" title="注入时间" width="260" />
                <a-table-column align="center" data-index="updateTime" key="updateTime" title="修改时间" width="260" />
                <a-table-column align="center" data-index="remarks" key="remarks" title="备注" />
                <a-table-column align="center" key="action" title="操作">
                    <template slot-scope="text, item">
                        <a-button @click="deleteId(item.id)" icon="delete" size="small" title="删除" type="danger" />
                    </template>
                </a-table-column>
            </a-table>
        </a-row>
    </div>
</template>
<script>
import axios from "axios";
import Constants from "@/libs/utils/constants";
export default {
    name: "finance-detail-tables",
    data() {
        return {
            labelCol: {},
            wrapperCol: {},
            form: {
                sharesId: "",
                sharesName: "",
                codeNumber: "",
                todayOpenPrice_1: null,
                todayOpenPrice_2: null,
                yesterdayClosePrice_1: null,
                yesterdayClosePrice_2: null,
                todayMaxPrice_1: null,
                todayMaxPrice_2: null,
                todayMinPrice_1: null,
                todayMinPrice_2: null,
                todayAveragePrice_1: null,
                todayAveragePrice_2: null,
                dealSharesNumber_1: null,
                dealSharesNumber_2: null,
                dealAmount_1: null,
                dealAmount_2: null,
                source: 0,
                sharesTotalNumber_1: null,
                sharesTotalNumber_2: null,
                sharesAllowTotalNumber_1: null,
                sharesAllowTotalNumber_2: null,
                remarks: "",
            },
            timeData: {
                sharesDate: [null, null],
                createTime: [null, null],
                updateTime: [null, null],
            },

            page: 1,
            taotal: 0,
            isLoading: false,
            list: [],
            pagination: {},
            locale: { emptyText: <a-empty description="暂无数据" /> },

            sourceList: Constants.FINANCE.ADDSOURCE,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getfinanceDetail();
        },
        resetForm() {
            this.form = this.$options.data.call(this).form;
            this.timeData = this.$options.data.call(this).timeData;
        },
        getfinanceDetail() {
            this.isLoading = true;
            let dateRange = { sharesDate_1: "", sharesDate_2: "", createTime_1: "", createTime_2: "", updateTime_1: "", updateTime_2: "" };
            if (null != this.timeData.sharesDate[0]) {
                dateRange["sharesDate_1"] = this.timeData.sharesDate[0].format("YYYY-MM-DD");
            }
            if (null != this.timeData.sharesDate[1]) {
                dateRange["sharesDate_2"] = this.timeData.sharesDate[1].format("YYYY-MM-DD");
            }
            if (null != this.timeData.createTime[0]) {
                dateRange["createTime_1"] = this.timeData.createTime[0].format("YYYY-MM-DD");
            }
            if (null != this.timeData.createTime[1]) {
                dateRange["createTime_2"] = this.timeData.createTime[1].format("YYYY-MM-DD");
            }
            if (null != this.timeData.updateTime[0]) {
                dateRange["updateTime_1"] = this.timeData.updateTime[0].format("YYYY-MM-DD");
            }
            if (null != this.timeData.updateTime[1]) {
                dateRange["updateTime_2"] = this.timeData.updateTime[1].format("YYYY-MM-DD");
            }
            let parmes = Object.assign(this.form, dateRange);
            console.log("parmes:" + parmes);
            axios.post("/ylm/finance/detail", parmes).then((res) => {
                this.isLoading = false;
                this.list = res.data.data.list || [];
            });
        },
        deleteId(id) {
            axios.post("/ylm/finance/deleteById", { id: id }).then((res) => {
                if (res.data.code === 10000) {
                    this.$notification.success({
                        message: "提示",
                        description: "操作成功！",
                    });
                } else {
                    this.$notification.error({
                        message: "提示",
                        description: "操作失败！",
                    });
                }
            });
        },
    },
};
</script>
<style scoped>
.formItem {
    width: 340px;
}
.range {
    width: 120px;
}
</style>