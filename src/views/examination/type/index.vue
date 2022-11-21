<template>
    <div>
        <a-row class="rowBorder">
            <a-form :form="form" @submit="submitSearch" layout="inline">
                <a-form-item label="类型分类">
                    <a-select :style="{width:'120px'}" placeholder="Select a person" v-model="form.type">
                        <a-select-option
                            :key="index"
                            :placeholder="'请选类型分类'"
                            :value="item.code"
                            v-for="(item,index) in typeList"
                        >{{item.codeName}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="大类名称">
                    <a-input allowClear placeholder="请输入大类名称" v-model="form.dictName"></a-input>
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
                <a-button :disabled="isLoading" @click="addDO()" type="primary">新增</a-button>
            </a-row>
            <a-table
                :data-source="list"
                :loading="isLoading"
                :locale="locale"
                :pagination="false"
                :rowKey="item => item.id"
            >
                <a-table-column align="center" key="id" title="序号/子级数量" width="80">
                    <template slot-scope="text, item, index">{{ index+1 }}/{{ item.children.length }}</template>
                </a-table-column>
                <a-table-column align="center" data-index="type" key="type" title="类型分类">
                    <template slot-scope="text, item">
                        <span>{{ item.type | CusListFind(typeList, 'code', 'codeName') }}</span>
                    </template>
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
import Constants from "@/libs/utils/constants";

import AddModal from "./modal/index";
export default {
    name: "examination-list",
    components: { AddModal },
    data() {
        return {
            typeList: Constants.GRDEQUESTION.KAOTI_TYPE,

            isLoading: false,
            form: {
                type: 1,
                dictName: "",
                createName: "",
            },
            createTime: [null, null],
            updateTime: [null, null],
            list: [],
            locale: { emptyText: <a-empty description="暂无数据" /> },

            endOpenCreateTime: false,

            visible: false, //新增/编辑 弹框
            editObj: {}, //新增/编辑 数据

            updateVisible: false, //更新弹框
            updateItem: {}, //更新数据,
        };
    },
    computed: {},
    watch: {},
    created() {
        this.init();
    },
    methods: {
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
            this.getList({ createTimeStart: createTimeStart, createTimeEnd: createTimeEnd, updateTimeStart: updateTimeStart, updateTimeEnd: updateTimeEnd });
        },
        //定义一个请求数据的方法
        getList(timeRange) {
            let parme = Object.assign(this.form, timeRange);
            GradeDictControl.list(parme).then((res) => {
                this.list = res.list || [];
            });
        },
        addDO() {
            this.visible = true;
            let obj = { type: this.form.type };
            this.editObj = obj;
        },
        /**添加子级**/
        addSon(row) {
            this.visible = true;
            let obj = { type: this.form.type, parentId: row.id };
            this.editObj = obj;
        },

        /**编辑**/
        edit(row) {
            this.visible = true;
            this.editObj = { id: row.id, dictName: row.dictName };
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