<template>
    <a-modal
        :bodyStyle="{ maxHeight: '500px', overflowY: 'auto' }"
        :dialogStyle="{ right:'20px', position: 'absolute' }"
        :mask="false"
        :maskClosable="false"
        :visible="test.visible"
        :width="900"
        @cancel="cancelClick"
        @ok="cancelClick"
        destroyOnClose
    >
        <a-steps :current="current" style="margin-top:30px">
            <a-step title="年级" />
            <a-step title="试卷种类" />
            <a-step title="考题来源" />
            <a-step title="题目类型" />
            <a-step title="考题类型" />
            <a-step title="题目列表" />
            <a-step title="制作考题" />
        </a-steps>
        <div style="margin-top:30px">
            <a-form-model :label-col="{ span: 8 }" :model="form" :wrapper-col="{ span: 12 }" ref="menuForm">
                <template v-if="current==0">
                    <a-form-model-item
                        :rules="{ required: true, message: '请选择所属年级', trigger: 'chanage'}"
                        label="所属年级"
                        prop="dictGradeId"
                    >
                        <a-cascader
                            :allowClear="true"
                            :fieldNames="{children:'children', label:'dictName', value: 'id' }"
                            :options="questionGradeList"
                            :placeholder="'请选择所属年级'"
                            @change="dictGradeChange"
                            change-on-select
                            v-model="form.dictGradeId"
                        />
                    </a-form-model-item>
                </template>
                <template v-if="current==1">
                    <a-form-model-item
                        :rules="{ required: true, message: '请选择试卷种类', trigger: 'chanage'}"
                        label="试卷种类"
                        prop="dictTaskId"
                    >
                        <a-cascader
                            :allowClear="true"
                            :fieldNames="{children:'children', label:'dictName', value: 'id' }"
                            :options="questionTaskList"
                            :placeholder="'请选择试卷种类'"
                            @change="dictTaskChange"
                            change-on-select
                            v-model="form.dictTaskId"
                        />
                    </a-form-model-item>
                </template>
                <template v-if="current==2">
                    <a-form-model-item
                        :rules="{ required: true, message: '请选择题目来源', trigger: 'chanage'}"
                        label="题目来源"
                        prop="dictSourceId"
                    >
                        <a-cascader
                            :allowClear="true"
                            :fieldNames="{children:'children', label:'dictName', value: 'id' }"
                            :options="questionSourceList"
                            :placeholder="'请选择题目来源'"
                            @change="dictSourceChange"
                            change-on-select
                            v-model="form.dictSourceId"
                        />
                    </a-form-model-item>
                </template>
                <template v-if="current==3">
                    <a-form-model-item
                        :rules="{ required: true, message: '请选择题目类型', trigger: 'chanage'}"
                        label="所属类型"
                        prop="dictTypeId"
                    >
                        <a-cascader
                            :allowClear="true"
                            :fieldNames="{children:'children', label:'dictName', value: 'id' }"
                            :options="questionTypeList"
                            :placeholder="'请选择题目类型'"
                            @change="dictTypeChange"
                            change-on-select
                            v-model="form.dictTypeId"
                        />
                    </a-form-model-item>
                </template>
                <template v-if="current==4">
                    <a-form-model-item
                        :rules="{ required: true, message: '请选择类型', trigger: 'chanage'}"
                        label="类型"
                        prop="type"
                    >
                        <a-select :placeholder="'请选择类型'" :style="{width:'120px'}" v-model="form.type">
                            <a-select-option
                                :key="index"
                                :value="item.code"
                                v-for="(item,index) in typeList"
                            >{{item.codeName}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </template>
            </a-form-model>
            <template v-if="current==5">
                <a-table
                    :data-source="list"
                    :loading="isLoading"
                    :locale="locale"
                    :pagination="pagination"
                    :rowKey="item => item.id"
                    :scroll="{ x: true }"
                >
                    <a-table-column align="center" key="id" title="序号" width="80">
                        <template
                            slot-scope="text, item, index"
                        >{{ (pagination.pageNo - 1)*pagination.pageSize + index+1 }}</template>
                    </a-table-column>
                    <a-table-column align="center" data-index="question" key="question" title="问题" width="200" />
                    <a-table-column align="center" data-index="answers" key="answers" title="答案" width="200" />
                    <a-table-column align="center" data-index="answerRight" key="answerRight" title="正确答案" width="200" />
                    <a-table-column align="center" data-index="usedNum" key="usedNum" title="使用次数" width="200" />
                    <a-table-column align="center" data-index="goodNum" key="goodNum" title="点赞数" width="200" />
                    <a-table-column align="center" data-index="poorNum" key="poorNum" title="踩数" width="200" />
                    <a-table-column align="center" data-index="shareNum" key="shareNum" title="分享次数" width="200" />
                </a-table>
            </template>
        </div>
        <div class="tc">
            <a-button @click="current--" type="primary" v-if="current > 0">上一步</a-button>
            <a-button @click="current++;" type="primary" v-if="current < 7">下一步</a-button>
            <a-button @click="$message.success('搞定!')" type="primary" v-if="current == 7">完成</a-button>
        </div>
    </a-modal>
</template>
<script>
import { GradeDictControl, GradeQuestionControl } from "@/api";
import Constants from "@/libs/utils/constants";
export default {
    name: "grade-createtest-menu",
    inject: {
        test: {
            default: () => ({}),
        },
        /**
         * {
         * title:"填空题", //题目名称
         * list:[
         *  {
         *      id:"",
         *      intro:"",
         *      question:"",
         *      answers:"",
         *      answerRight:"",
         *      type:""
         *  }
         * ], //题目数据
         * }
         *
         * **/
    },
    components: {},
    data() {
        return {
            current: 0,
            questionTaskList: [], //试卷种类
            questionGradeList: [], //所属年级
            questionSourceList: [], //考题来源
            questionTypeList: [], //考题类型

            form: {
                dictTaskId: [],
                dictTaskName: [],

                dictGradeId: [],
                dictGradeName: [],

                dictSourceId: [],
                dictSourceName: [],

                dictTypeId: [],
                dictTypeName: [],
            },
            isLoading: false,

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

            typeList: Constants.GRDEQUESTION.KAOTI_QUESTION_TYPE,
        };
    },
    created() {
        this.init();
    },
    methods: {
        titleJoin(title) {
            this.test.testTitle = "" === this.test.testTitle ? title : this.test.testTitle + title;
        },

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
            this.titleJoin(this.form.dictTaskName.join("-"));
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
            this.titleJoin(this.form.dictGradeName.join("-"));
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
            this.getTreeData(1);
            this.getTreeData(2);
            this.getTreeData(3);
            this.getTreeData(4);
        },
        /**
         * type 1:获取题目类型 2获取考题来源
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
        onSubmit() {
            let _slef = this;
            this.$refs.menuForm.validate((valid) => {
                if (!valid) {
                    return false;
                } else {
                    GradeQuestionControl.actionDo(_slef.form).then((res) => {
                        if (res.code == 10000) {
                            _slef.$notification.success({
                                message: "提示",
                                description: "操作成功！",
                            });
                            _slef.$emit("ok");
                        } else {
                            _slef.$notification.error({
                                message: "提示",
                                description: "操作失败！",
                            });
                        }
                    });
                }
            });
        },
        cancelClick() {
            this.test.visible = false;
        },
    },
};
</script>
<style scoped>
</style>