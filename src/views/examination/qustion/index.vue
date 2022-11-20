<template>
    <div>
        <a-row class="rowBorder">
            <a-form :form="form" @submit="submitSearch" layout="inline">
                <a-form-item label="所属类型">
                    <a-tree-select
                        :style="{width:'100px'}"
                        :allowClear="true"
                        show-search
                        label-in-value
                        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                        v-model="form.dictId"
                        :tree-data="treeData"
                        :placeholder="'请选择所属类型'"
                        tree-default-expand-all
                        :search-placeholder="'请搜索所属类型'"
                        :replaceFields="{children:'children', title:'dictName', key:'id', value: 'dictName' }"
                    />
                </a-form-item>
                <a-form-item label="类型">
                    <a-select :style="{width:'100px'}" v-model="form.type">
                        <a-select-option
                            :key="index"
                            :value="item.code"
                            v-for="(item,index) in typeList"
                        >{{item.codeName}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="问题">
                    <a-input allowClear placeholder="请输入问题" v-model="form.question"></a-input>
                </a-form-item>
                <a-form-item label="答案">
                    <a-input allowClear placeholder="请输入答案" v-model="form.answers"></a-input>
                </a-form-item>
                <a-form-item label="正确答案">
                    <a-input allowClear placeholder="请输入正确答案" v-model="form.answerRight"></a-input>
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
                <a-form-item label="创建人">
                    <a-input allowClear placeholder="请输入创建人" v-model="form.createName"></a-input>
                </a-form-item>
                <a-form-item label="描述">
                    <a-input allowClear placeholder="请输入描述" v-model="form.remarks"></a-input>
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
                <a-table-column align="center" data-index="dictId" key="dictId" title="类型路径" width="200" />
                <a-table-column align="center" data-index="question" key="question" title="问题" width="200" />
                <a-table-column align="center" data-index="answers" key="answers" title="答案" width="200" />
                <a-table-column align="center" data-index="answerRight" key="answerRight" title="正确答案" width="200" />
                <a-table-column align="center" data-index="usedNum" key="usedNum" title="使用次数" width="200" />
                <a-table-column align="center" data-index="goodNum" key="goodNum" title="点赞数" width="200" />
                <a-table-column align="center" data-index="poorNum" key="poorNum" title="踩数" width="200" />
                <a-table-column align="center" data-index="status" key="status" title="状态" width="240">
                    <template slot-scope="text, item">
                        <span
                            :style="{color: item.status===1?'#67C23A':'red'}"
                        >{{ item.status | CusListFind(statusList, 'code', 'codeName') }}</span>
                    </template>
                </a-table-column>
                <a-table-column align="center" data-index="type" key="type" title="类型" width="240">
                    <template slot-scope="text, item">
                        <span>{{ item.type | CusListFind(typeList, 'code', 'codeName') }}</span>
                    </template>
                </a-table-column>
                <a-table-column align="center" data-index="createTime" key="createTime" title="添加时间" width="240" />
                <a-table-column align="center" data-index="updateTime" key="updateTime" title="修改时间" width="240" />
                <a-table-column align="center" data-index="shareNum" key="shareNum" title="分享次数" width="200" />
                <a-table-column align="center" data-index="imgUrl" key="imgUrl" title="图片" width="200" />
                <a-table-column align="center" data-index="createName" key="createName" title="创建人" width="200" />
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
            @ok="visible=false;editObj={};getList()"
        />
    </div>
</template>
<script>
import { TreeSelect } from 'ant-design-vue';
import { GradeDictControl, GradeQuestionControl } from "@/api";
import Constants from "@/libs/utils/constants";
import LangUtil from "@/libs/utils/langUtil";

import AddModal from "./modal/index";
export default {
    name: "grade-question-list",
    components: { AddModal },
    data() {
        return {
            SHOW_ALL : TreeSelect.SHOW_ALL,
            treeData:[],

            isLoading: false,
            form: {
                dictId: "",
                type: 0,
                question: "",
                answers: "",
                answerRight:"",
                status: 0,
                createName:"",
                remarks:""
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

            typeList: LangUtil.addAll(Constants.GRDEQUESTION.TYPE),
            statusList: LangUtil.addAll(Constants.PUBLICCOMMON_STATUS),
            dictList:[],

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
            this.getTreeData();
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
            let parme = Object.assign(this.form, timeRange, { pageNo: this.pagination.pageNo, pageSize: this.pagination.pageSize });
            GradeQuestionControl.list(parme).then((res) => {
                this.list = res.list || [];
                this.pagination.total = res.total || 0;
            });
        },
        getTreeData(){
            this.isLoading = true;
            GradeDictControl.listAll({}).then((res) => {
                this.treeData = res.list || [];
            }).finally(()=>{
                this.isLoading = false;
            });
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
                        GradeQuestionControl.status({ id: id, status: status }).then((res) => {
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
            } else {
                GradeQuestionControl.status({ id: id, status: status }).then((res) => {
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
                    GradeQuestionControl.delete({ id: id }).then((res) => {
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