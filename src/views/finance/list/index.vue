<template>
    <div>
        <a-row class="rowBorder">
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
                    <a-input allowClear placeholder="请输入股票代码" v-model="form.codeNumber"></a-input>
                </a-form-item>
                <a-form-item label="股票名称">
                    <a-input allowClear placeholder="请输入股票名称" v-model="form.sharesName"></a-input>
                </a-form-item>
                <a-form-item label="股票别名">
                    <a-input allowClear placeholder="请输入股票别名" v-model="form.sharesAlise"></a-input>
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
                    <a-range-picker allowClear format="YYYY-MM-DD" v-model="createTime" />
                </a-form-item>
                <a-form-item label="修改时间">
                    <a-range-picker allowClear format="YYYY-MM-DD" v-model="updateTime" />
                </a-form-item>
                <a-form-item>
                    <a-button :disabled="isLoading" html-type="submit" type="primary">查询</a-button>
                </a-form-item>
            </a-form>
        </a-row>
        <a-row class="rowBorder">
            <a-row class="tr pt15">
                <a-button :disabled="isLoading" @click="visible=true;" type="primary">新增</a-button>
            </a-row>
            <a-table
                :data-source="list"
                :loading="isLoading"
                :locale="locale"
                :pagination="pagination"
                :rowKey="item => item.id"
                :scroll="{ x: true }"
            >
                <a-table-column align="center" key="id" title="序号" width="80">
                    <template slot-scope="text, item, index">{{ (pagination.pageNo - 1)*pagination.pageSize + index+1 }}</template>
                </a-table-column>
                <a-table-column align="center" title="股票编码">
                    <template slot-scope="text, item">
                        <span>{{item.codeNumber}}{{ item.indexType | CusListFind(indexTypeCodeList, 'code', 'codeName') }}</span>
                    </template>
                </a-table-column>
                <a-table-column align="center" data-index="indexType" key="indexType" title="指数类型" width="160">
                    <template slot-scope="text, item">
                        <span>{{ item.indexType | CusListFind(indexTypeList, 'code', 'codeName') }}({{ item.indexType | CusListFind(indexTypeCodeList, 'code', 'codeName') }})</span>
                    </template>
                </a-table-column>
                <a-table-column align="center" data-index="codeNumber" key="codeNumber" title="股票代码" width="200" />
                <a-table-column align="center" data-index="sharesName" key="sharesName" title="股票名称" width="160" />
                <a-table-column align="center" data-index="sharesAlise" key="sharesAlise" title="股票别名" width="300" />
                <a-table-column
                    align="center"
                    data-index="sharesTotalNumber"
                    key="sharesTotalNumber"
                    title="股票总股数"
                    width="300"
                >
                    <template slot-scope="text, item">
                        <span>{{ item.sharesTotalNumber }}</span>
                        <br />
                        <span>{{ item.sharesTotalNumber | TableMoneyChanageChinese(item.sharesTotalNumber) }}</span>
                    </template>
                </a-table-column>
                <a-table-column
                    align="center"
                    data-index="sharesAllowTotalNumber"
                    key="sharesAllowTotalNumber"
                    title="可流动股票股数"
                    width="360"
                >
                    <template slot-scope="text, item">
                        <span>{{ item.sharesAllowTotalNumber }}</span>
                        <br />
                        <span>{{ item.sharesAllowTotalNumber | TableMoneyChanageChinese(item.sharesAllowTotalNumber) }}</span>
                    </template>
                </a-table-column>
                <a-table-column align="center" data-index="loadTime" key="loadTime" title="最后更新" width="240" />
                <a-table-column align="center" data-index="status" key="status" title="状态" width="240">
                    <template slot-scope="text, item">
                        <span
                            :style="{color: item.status===1?'#67C23A':'red'}"
                        >{{ item.status | CusListFind(statusList, 'code', 'codeName') }}</span>
                    </template>
                </a-table-column>
                <a-table-column align="center" data-index="createTime" key="createTime" title="添加时间" width="240" />
                <a-table-column align="center" data-index="updateTime" key="updateTime" title="修改时间" width="240" />
                <a-table-column align="center" data-index="remarks" key="remarks" title="备注" />
                <a-table-column align="center" fixed="right" key="action" title="操作" width="180px">
                    <template slot-scope="text, item">
                        <div style="text-align:right;">
                            <a-button
                                @click="goToUpdate(item)"
                                icon="unordered-list"
                                size="small"
                                title="更新记录"
                                type="primary"
                                v-if="item.status===1"
                            />
                            <a-button
                                @click="goToDetail(item)"
                                icon="eye"
                                size="small"
                                title="详情"
                                type="primary"
                                v-if="item.status===1"
                            />
                            <a-button
                                @click="edit(item)"
                                icon="edit"
                                size="small"
                                title="编辑"
                                type="primary"
                                v-if="item.status===2"
                            />
                            <a-button
                                @click="statusAction(item.id,1)"
                                icon="check"
                                size="small"
                                title="上线"
                                type="primary"
                                v-if="item.status===2"
                            />
                            <a-button
                                @click="statusAction(item.id,2)"
                                icon="close"
                                size="small"
                                title="下线"
                                type="primary"
                                v-if="item.status===1"
                            />
                            <a-button
                                @click="deleteAction(item.id)"
                                icon="delete"
                                size="small"
                                title="删除"
                                type="danger"
                                v-if="item.status===2"
                            />
                            <a-upload
                                :action="url"
                                :before-upload="beforeUpload"
                                :data="item"
                                :file-list="[]"
                                :headers="headers"
                                :multiple="false"
                                @change="handleChange"
                                name="fileName"
                                v-if="item.status===1"
                            >
                                <a-button size="small" type="primary">
                                    <a-icon :type="importIng?'loading':'upload'" />
                                </a-button>
                            </a-upload>
                        </div>
                    </template>
                </a-table-column>
            </a-table>
        </a-row>
        <add-modal
            :item="editObj"
            :visible="visible"
            @cancel="visible=false;editObj={}"
            @ok="visible=false;editObj={};getfinanceList()"
        />
        <update-list-modal
            :itemProp="updateItem"
            :visible="updateVisible"
            @cancel="updateVisible=false;updateItem={}"
            @ok="updateVisible=false;updateItem={};"
        />
    </div>
</template>
<script>
import { FinanceControl } from "@/api";
import Constants from "@/libs/utils/constants";
import LangUtil from "@/libs/utils/langUtil";

import AddModal from "./modal/index";
import UpdateListModal from "./modal/updateList";
export default {
    name: "finance-list",
    components: { AddModal, UpdateListModal },
    data() {
        return {
            isLoading: false,
            form: {
                indexType: 0,
                codeNumber: "",
                sharesName: "",
                sharesAlise: "",
                status: 0,
            },
            createTime: [null, null],
            updateTime: [null, null],

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
            statusList: LangUtil.addAll(Constants.FINANCE.STATUS),

            endOpenCreateTime: false,

            visible: false, //新增/编辑 弹框
            editObj: {}, //新增/编辑 数据

            updateVisible: false, //更新弹框
            updateItem: {}, //更新数据,

            headers: {
                authorization: "authorization-text",
            },
            url: process.env.VUE_APP_API_FIEX + "/shares/upload",
            importIng: false,
        };
    },
    computed: {},
    watch: {},
    created() {
        this.init();
    },
    methods: {
        beforeUpload(file) {
            const isExcel = file.type === "application/vnd.ms-excel";
            if (isExcel) {
                this.importIng = true;
                return true;
            } else {
                this.$notification.error({
                    message: "提示",
                    description: "请上传excel文件",
                });
                return false;
            }
        },
        /*
         *导入
         */
        handleChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                this.$notification.success({
                    message: "提示",
                    description: "提交成功",
                });
            } else if (info.file.status === "error") {
                this.$notification.error({
                    message: "提示",
                    description: "提交失败",
                });
            }
            this.importIng = false;
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
            this.getfinanceList({});
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
            let updateTimeStart = "";
            if (null != this.updateTime[0]) {
                updateTimeStart = this.updateTime[0].format("YYYY-MM-DD");
            }
            let updateTimeEnd = "";
            if (null != this.updateTime[1]) {
                updateTimeEnd = this.updateTime[1].format("YYYY-MM-DD");
            }
            this.getfinanceList({ createTimeStart: createTimeStart, createTimeEnd: createTimeEnd, updateTimeStart: updateTimeStart, updateTimeEnd: updateTimeEnd });
        },
        //定义一个请求数据的方法
        getfinanceList(timeRange) {
            let parme = Object.assign(this.form, timeRange, { pageNo: this.pagination.pageNo, pageSize: this.pagination.pageSize });
            FinanceControl.financeList(parme).then((res) => {
                this.list = res.list || [];
                this.pagination.total = res.total || 0;
            });
        },
        goToDetail(row) {
            //this.$router.push("/finance/detail");
            console.log("row:" + row.id);
            let push = { path: "/finance/detail", name: "finance-detail", params: { id: row.id } };
            this.$router.push(push);
            //this.$router.push({ path: "/finance/detail", name: "finance.detail", params: { id: row.id } });
        },

        /**编辑**/
        edit(row) {
            this.visible = true;
            this.editObj = row;
        },

        /**
         * 上架：1，下架：2操作
         * **/
        statusAction(id, status) {
            let _self = this;
            if (status === 2) {
                this.$confirm({
                    title: "警告",
                    content: "您确定要下架这条数据吗,此举将删除股票记录表，且不可逆！",
                    onOk() {
                        FinanceControl.financeStatus({ id: id, status: status }).then((res) => {
                            if (res.code === 10000) {
                                _self.$notification.success({
                                    message: "提示",
                                    description: "操作成功！",
                                });
                                _self.getfinanceList({});
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
            } else {
                FinanceControl.financeStatus({ id: id, status: status }).then((res) => {
                    if (res.code === 10000) {
                        _self.$notification.success({
                            message: "提示",
                            description: "操作成功！",
                        });
                        _self.getfinanceList({});
                    } else {
                        _self.$notification.error({
                            message: "提示",
                            description: "操作失败！",
                        });
                    }
                });
            }
        },
        /**
         * 删除
         * **/
        deleteAction(id) {
            let _self = this;
            this.$confirm({
                title: "警告",
                content: "您确定要删除这条数据吗",
                onOk() {
                    FinanceControl.financeDelete({ id: id }).then((res) => {
                        if (res.code === 10000) {
                            _self.$notification.success({
                                message: "提示",
                                description: "操作成功！",
                            });
                            _self.getfinanceList({});
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

        /**
         * 弹出更新记录列表
         * **/
        goToUpdate(item) {
            this.updateVisible = true;
            this.updateItem = item;
        },
    },
};
</script>