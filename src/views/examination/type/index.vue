<template>
    <div>
        <a-row class="rowBorder">
            <a-form :form="form" @submit="submitSearch" layout="inline">
                <a-form-item label="类型名称">
                    <a-input allowClear placeholder="请输入类型名称" v-model="form.dictName"></a-input>
                </a-form-item>
                <a-form-item label="创建人">
                    <a-input allowClear placeholder="请输入创建人" v-model="form.createName"></a-input>
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
                :expanded-row-keys.sync="expandedRowKeys"
                :loading="isLoading"
                :locale="locale"
                :pagination="false"
                :rowKey="item => item.id"
            >
                <a-table-column align="center" key="id" title="序号" width="80">
                    <template slot-scope="text, item, index">{{ (pagination.pageNo - 1)*pagination.pageSize + index+1 }}</template>
                </a-table-column>
                <a-table-column align="center" data-index="dictName" key="dictName" title="类型名称" />
                <a-table-column align="center" data-index="createTime" key="createTime" title="添加时间" />
                <a-table-column align="center" data-index="updateTime" key="updateTime" title="修改时间" />
                <a-table-column align="center" data-index="createName" key="createName" title="创建人" />
                <a-table-column align="center" fixed="right" key="action" title="操作" width="180px">
                    <template slot-scope="text, item">
                        <div style="text-align:right;">
                            <a-button @click="edit(item)" icon="edit" size="small" title="编辑" type="primary" />
                            <a-button @click="addSon(item)" icon="plus" size="small" title="添加子级" type="primary" />
                            <a-button
                                @click="deleteAction(item.id)"
                                icon="delete"
                                size="small"
                                title="删除"
                                type="danger"
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
            @ok="visible=false;editObj={};getList()"
        />
    </div>
</template>
<script>
import { GradeDictControl } from "@/api";

import AddModal from "./modal/index";
export default {
    name: "examination-list",
    components: { AddModal },
    data() {
        return {
            isLoading: false,
            form: {
                dictName: "",
                createName: "",
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
        getList(timeRange) {
            let parme = Object.assign(this.form, timeRange, { pageNo: this.pagination.pageNo, pageSize: this.pagination.pageSize });
            GradeDictControl.list(parme).then((res) => {
                this.list = res.list || [];
                this.pagination.total = res.total || 0;
            });
        },

        /**添加子级**/
        addSon(row) {
            this.visible = true;
            let obj = { parentId: row.id };
            this.editObj = obj;
        },

        /**编辑**/
        edit(row) {
            this.visible = true;
            this.editObj = row;
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
                    GradeDictControl.delete({ id: id }).then((res) => {
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