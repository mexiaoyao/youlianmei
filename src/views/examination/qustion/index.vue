<template>
    <div>
        <a-row class="rowBorder">
            <a-form :form="form" @submit="submitSearch" layout="inline">
                <a-form-item label="试卷种类">
                    <a-cascader
                        :allowClear="true"
                        :fieldNames="{children:'children', label:'dictName', value: 'id' }"
                        :options="questionTaskList"
                        :placeholder="'请选择试卷种类'"
                        @change="dictTaskChange"
                        change-on-select
                        v-model="form.dictTaskId"
                    />
                </a-form-item>
                <a-form-item label="所属年级">
                    <a-cascader
                        :allowClear="true"
                        :fieldNames="{children:'children', label:'dictName', value: 'id' }"
                        :options="questionGradeList"
                        :placeholder="'请选择所属年级'"
                        @change="dictGradeChange"
                        change-on-select
                        v-model="form.dictGradeId"
                    />
                </a-form-item>
                <a-form-item label="题目来源">
                    <a-cascader
                        :allowClear="true"
                        :fieldNames="{children:'children', label:'dictName', value: 'id' }"
                        :options="questionSourceList"
                        :placeholder="'请选择题目来源'"
                        @change="dictSourceChange"
                        change-on-select
                        v-model="form.dictSourceId"
                    />
                </a-form-item>
                <a-form-item label="题目类型">
                    <a-cascader
                        :allowClear="true"
                        :fieldNames="{children:'children', label:'dictName', value: 'id' }"
                        :options="questionTypeList"
                        :placeholder="'请选择题目类型'"
                        @change="dictTypeChange"
                        change-on-select
                        v-model="form.dictTypeId"
                    />
                </a-form-item>

                <a-form-item label="考题种类">
                    <a-select :style="{width:'160px'}" v-model.trim="form.type">
                        <a-select-option
                            :key="index"
                            :value="item.code"
                            v-for="(item,index) in typeList"
                        >{{item.codeName}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="问题">
                    <a-input allowClear placeholder="请输入问题" v-model.trim="form.question"></a-input>
                </a-form-item>
                <a-form-item label="创建人">
                    <a-input allowClear placeholder="请输入创建人" v-model.trim="form.createName"></a-input>
                </a-form-item>
                <a-form-item label="添加时间">
                    <a-range-picker allowClear format="YYYY-MM-DD" v-model.trim="createTime" />
                </a-form-item>
                <a-form-item label="修改时间">
                    <a-range-picker allowClear format="YYYY-MM-DD" v-model.trim="updateTime" />
                </a-form-item>
                <a-form-item>
                    <a-button :disabled="isLoading" html-type="submit" type="primary">查询</a-button>
                </a-form-item>
            </a-form>
        </a-row>
        <a-row class="rowBorder">
            <a-row class="tr pt15">
                <a-button :disabled="isLoading" @click="visible=true;" type="primary">新增</a-button>
                <a-upload
                    :action="actionUrl"
                    :beforeUpload="beforeUpload"
                    :data="form"
                    :disabled="isLoading"
                    :headers="headers"
                    :method="'post'"
                    :multiple="false"
                    :showUploadList="false"
                    @change="handleChange"
                    accept=".xlsx, .xls"
                    name="fileName"
                >
                    <a-button :disabled="isLoading" type="primary">批量导入</a-button>
                </a-upload>
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
                <a-table-column
                    align="center"
                    data-index="dictTaskPathName"
                    key="dictTaskPathName"
                    title="试卷种类"
                    width="200"
                />
                <a-table-column
                    align="center"
                    data-index="dictGradePathName"
                    key="dictGradePathName"
                    title="所属年级"
                    width="200"
                />
                <a-table-column
                    align="center"
                    data-index="dictSourcePathName"
                    key="dictSourcePathName"
                    title="题目来源"
                    width="200"
                />
                <a-table-column
                    align="center"
                    data-index="dictTypePathName"
                    key="dictTypePathName"
                    title="题目类型"
                    width="200"
                />
                <a-table-column align="center" data-index="type" key="type" title="类型" width="240">
                    <template slot-scope="text, item">
                        <span>{{ item.type | CusListFind(typeList, 'code', 'codeName') }}</span>
                    </template>
                </a-table-column>
                <a-table-column align="center" data-index="question" key="question" title="问题" width="200" />
                <a-table-column align="center" data-index="answers" key="answers" title="答案" width="200" />
                <a-table-column align="center" data-index="answerRight" key="answerRight" title="正确答案" width="200" />
                <a-table-column align="center" data-index="usedNum" key="usedNum" title="使用次数" width="200" />
                <a-table-column align="center" data-index="goodNum" key="goodNum" title="点赞数" width="200" />
                <a-table-column align="center" data-index="poorNum" key="poorNum" title="踩数" width="200" />
                <a-table-column align="center" data-index="createTime" key="createTime" title="添加时间" width="240" />
                <a-table-column align="center" data-index="updateTime" key="updateTime" title="修改时间" width="240" />
                <a-table-column align="center" data-index="shareNum" key="shareNum" title="分享次数" width="200" />
                <a-table-column align="center" data-index="imgUrl" key="imgUrl" title="图片" width="200" />
                <a-table-column align="center" data-index="createName" key="createName" title="创建人" width="200" />
                <a-table-column align="center" data-index="remarks" key="remarks" title="备注" />
                <a-table-column align="center" fixed="right" key="action" title="操作" width="180px">
                    <template slot-scope="text, item">
                        <div style="text-align:right;">
                            <a-button @click="goToDetail(item)" icon="eye" size="small" title="详情" type="primary" />
                            <a-button @click="edit(item)" icon="edit" size="small" title="编辑" type="primary" />
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
        <detail-modal
            :item="editObj"
            :visible="visibleDetail"
            @cancel="visibleDetail=false;editObj={}"
            @ok="visibleDetail=false;editObj={};"
        />
    </div>
</template>
<script>
import { GradeDictControl, GradeQuestionControl } from "@/api";
import Constants from "@/libs/utils/constants";
import LangUtil from "@/libs/utils/langUtil";

import AddModal from "./modal/add";
import DetailModal from "./modal/detail";
export default {
    name: "grade-question-list",
    components: { AddModal, DetailModal },
    computed: {
        headers() {
            return {};
        },
    },
    data() {
        return {
            questionTaskList: [], //试卷种类
            questionGradeList: [], //所属年级
            questionSourceList: [], //考题来源
            questionTypeList: [], //考题类型

            isLoading: false,
            form: {
                dictTaskId: [],
                dictTaskName: [],

                dictGradeId: [],
                dictGradeName: [],

                dictSourceId: [],
                dictSourceName: [],

                dictTypeId: [],
                dictTypeName: [],

                type: 0,
                intro: "",
                question: "",
                answers: "",
                answerRight: "",
                createName: "",
                remarks: "",
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

            typeList: LangUtil.addAll(Constants.GRDEQUESTION.KAOTI_QUESTION_TYPE),

            endOpenCreateTime: false,

            visible: false, //新增/编辑 弹框
            editObj: {}, //新增/编辑 数据
            visibleDetail: false, //新增/编辑 弹框

            //考题导入参数
            actionUrl: process.env.VUE_APP_API_FIEX + "ylm/gradeQuestion/upload",
        };
    },
    watch: {},
    created() {
        this.init();
    },
    methods: {
        /**
         * 试卷种类
         * **/
        dictTaskChange(value, selectedOptions) {
            this.form.dictTaskName = [];
            if (null != selectedOptions && selectedOptions.length > 0) {
                selectedOptions.map((item) => {
                    this.form.dictTaskName.push(item.dictName);
                });
            }
        },
        /**
         * 所属年级
         * **/
        dictGradeChange(value, selectedOptions) {
            this.form.dictGradeName = [];
            if (null != selectedOptions && selectedOptions.length > 0) {
                selectedOptions.map((item) => {
                    this.form.dictGradeName.push(item.dictName);
                });
            }
        },
        /**
         * 题目来源
         * **/
        dictSourceChange(value, selectedOptions) {
            this.form.dictSourceName = [];
            if (null != selectedOptions && selectedOptions.length > 0) {
                selectedOptions.map((item) => {
                    this.form.dictSourceName.push(item.dictName);
                });
            }
        },
        /**
         * 所属类型
         * **/
        dictTypeChange(value, selectedOptions) {
            this.form.dictTypeName = [];
            if (null != selectedOptions && selectedOptions.length > 0) {
                selectedOptions.map((item) => {
                    this.form.dictTypeName.push(item.dictName);
                });
            }
        },

        init() {
            this.getList({});
            this.getTreeData(1);
            this.getTreeData(2);
            this.getTreeData(3);
            this.getTreeData(4);
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
        /**
         * type 1:试卷种类 2:所属年级 3:考题来源 4:考题类型
         * **/
        getTreeData(type) {
            this.isLoading = true;
            GradeDictControl.listAll({ type: type })
                .then((res) => {
                    if (type == 1) {
                        this.questionTaskList = res.list || [];
                    } else if (type == 2) {
                        this.questionGradeList = res.list || [];
                    } else if (type == 3) {
                        this.questionSourceList = res.list || [];
                    } else if (type == 4) {
                        this.questionTypeList = res.list || [];
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                });
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
        goToDetail(item) {
            this.visibleDetail = true;
            this.editObj = item;
        },

        handleChange(info) {
            if (info.file.status === "done") {
                if (info.file.response.code == "10000") {
                    this.$notification.success({
                        message: "提示",
                        description: "考题批量导入成功",
                    });
                    this.getList({});
                } else {
                    this.$notification.warning({
                        message: "提示",
                        description: info.file.response.msg,
                    });
                }
                this.isLoading = false;
            } else if (info.file.status === "error") {
                this.$notification.warning({
                    message: "提示",
                    description: "考题批量导失败",
                });
                this.isLoading = false;
            }
        },
        beforeUpload(e) {
            if (e.type !== "application/vnd.ms-excel") {
                this.$notification.warning({
                    message: "提示",
                    description: "请上传Excel文件！",
                });
                return false;
            }
            this.isLoading = true;
        },
    },
};
</script>