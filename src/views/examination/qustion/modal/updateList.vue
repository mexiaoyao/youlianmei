<template>
    <a-modal
        :bodyStyle="{ maxHeight: '500px', overflowY: 'auto' }"
        :title="getTitle()+':更新记录'"
        :visible="visible"
        :width="800"
        @cancel="cancelClick"
        @ok="save"
        destroyOnClose
    >
        <div>
            <a-row>
                <a-form :form="form" @submit="submitSearch" layout="inline">
                    <a-form-item label="状态">
                        <a-select :style="{width:'100px'}" v-model="form.status">
                            <a-select-option
                                :key="index"
                                :value="item.code"
                                v-for="(item,index) in updateStatus"
                            >{{item.codeName}}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="更新时间">
                        <a-range-picker allowClear format="YYYY-MM-DD" v-model="createTime" />
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
                    :scroll="{ y: 280 }"
                >
                    <a-table-column align="center" key="id" title="序号">
                        <template
                            slot-scope="text, item, index"
                        >{{ (pagination.pageNo - 1)*pagination.pageSize + index+1 }}</template>
                    </a-table-column>
                    <a-table-column align="center" data-index="createTime" key="createTime" title="更新时间" width="240" />
                    <a-table-column align="center" data-index="status" key="status" title="更新状态">
                        <template slot-scope="text, item">
                            <span
                                :style="{color: item.status===1?'#67C23A':'red'}"
                            >{{ item.status | CusListFind(updateStatus, 'code', 'codeName') }}</span>
                        </template>
                    </a-table-column>
                    <a-table-column align="center" data-index="failNum" key="failNum" title="失败次数" />
                    <a-table-column align="center" data-index="remarks" key="remarks" title="备注" />
                    <a-table-column align="center" key="action" title="操作">
                        <template slot-scope="text, item">
                            <a-button
                                @click="getAgain(item.id)"
                                icon="redo"
                                size="small"
                                title="重新获取"
                                type="primary"
                                v-if="item.status==2"
                            />
                        </template>
                    </a-table-column>
                </a-table>
            </a-row>
        </div>
    </a-modal>
</template>
<script>
import { FinanceUpdateControl } from "@/api";
import Constants from "@/libs/utils/constants";
import LangUtil from "@/libs/utils/langUtil";

export default {
    name: "finance-update-list",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        itemProp: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            isLoading: false,
            form: {
                status: 0,
            },
            createTime: [null, null],

            pagination: {
                pageNo: 1,
                pageSize: 10, // 默认每页显示数量
                showSizeChanger: true, // 显示可改变每页数量
                pageSizeOptions: ["10", "20", "50", "100"], // 每页数量选项
                showTotal: (total) => `共 ${total} 条`, // 显示总数
                onShowSizeChange: (current, pageSize) => this.onSizeChange(current, pageSize), // 改变每页数量时更新显示
                onChange: (page, pageSize) => this.onPageChange(page, pageSize), //点击页码事件
                total: 0, //总条数
            },
            list: [],
            locale: { emptyText: <a-empty description="暂无数据" /> },

            indexTypeList: LangUtil.addAll(Constants.FINANCE.INDEX_TYPE),
            indexTypeCodeList: LangUtil.addAll(Constants.FINANCE.INDEX_TYPE_CODE),
            updateStatus: LangUtil.addAll(Constants.FINANCE.UPDATE_STATUS),
        };
    },
    methods: {
        getTitle() {
            let str = this.itemProp.sharesName;
            let list = Constants.FINANCE.INDEX_TYPE_CODE;
            str += "[";
            str += this.itemProp.codeNumber || "";
            for (let i = 0; i < list.length; i++) {
                if (list[i].code == this.itemProp.indexType) {
                    str += list[i].codeName;
                }
            }
            str += "]";
            return str;
        },

        cancelClick() {
            this.$emit("cancel");
        },
        save() {
            this.cancelClick();
        },

        onPageChange(page, pageSize) {
            this.pagination.pageNo = page;
            this.submitSearch();
        },
        onSizeChange(current, pageSize) {
            this.pagination.pageNo = 1;
            this.pagination.pageSize = pageSize;
            this.submitSearch();
        },
        onChange() {},

        init() {
            this.getList({});
        },
        submitSearch() {
            let createTimeStart = "";
            if (null != this.createTime[0]) {
                createTimeStart = this.createTime[0].format("YYYY-MM-DD");
            }
            let createTimeEnd = "";
            if (null != this.createTime[1]) {
                createTimeEnd = this.createTime[1].format("YYYY-MM-DD");
            }
            this.getList({ createTimeStart: createTimeStart, createTimeEnd: createTimeEnd });
        },
        //定义一个请求数据的方法
        getList(timeRange) {
            let parme = Object.assign(this.form, { sharesId: this.itemProp.id }, timeRange, { pageNo: this.pagination.pageNo, pageSize: this.pagination.pageSize });
            FinanceUpdateControl.updateList(parme).then((res) => {
                this.list = res.list || [];
                this.pagination.total = res.total || 0;
            });
        },

        /**
         * 数据再次获取
         * **/
        getAgain(id) {
            let _self = this;
            this.$confirm({
                title: "警告",
                content: "您确定要重新获取数据吗",
                onOk() {
                    FinanceUpdateControl.getAgain({ id: id }).then((res) => {
                        if (res.code == 10000) {
                            _self.$notification.success({
                                message: "提示",
                                description: "操作成功！",
                            });
                            _self.getList({});
                        } else {
                            _self.$notification.error({
                                message: "提示",
                                description: "操作失败！",
                            });
                        }
                    });
                    return;
                },
                onCancel() {},
            });
        },
    },
    watch: {
        visible(newVal, oldVal) {
            if (newVal) {
                this.getList({});
            }
        },
    },
};
</script>