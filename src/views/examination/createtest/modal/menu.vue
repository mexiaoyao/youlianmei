<template>
    <a-modal
        :bodyStyle="{ maxHeight: '500px', overflowY: 'auto' }"
        :visible="visible"
        :width="300"
        @cancel="cancelClick"
        @ok="cancelClick"
        :mask="false"
        :maskClosable="false"
        :dialogStyle="{ right:'20px', position: 'absolute' }"
        destroyOnClose
    >
        <a-form-model :label-col="{ span: 8 }" :model="form" :wrapper-col="{ span: 12 }" ref="addForm">
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

            <a-form-model-item :rules="{ required: true, message: '请选择类型', trigger: 'chanage'}" label="类型" prop="type">
                <a-select :placeholder="'请选择类型'" :style="{width:'220px'}" v-model="form.type">
                    <a-select-option :key="index" :value="item.code" v-for="(item,index) in typeList">{{item.codeName}}</a-select-option>
                </a-select>
            </a-form-model-item>

            <a-form-model-item label="备注">
                <a-input placeholder="请输入备注" v-model.trim="form.remarks"></a-input>
            </a-form-model-item>
        </a-form-model>
    </a-modal>
</template>
<script>
import { GradeDictControl, GradeQuestionControl } from "@/api";
import Constants from "@/libs/utils/constants";
export default {
    name: "grade-createtest-menu",
    inject: ["testTitle","visible","list"],
    components: {},
    data() {
        return {
            questionTaskList: [], //试卷种类
            questionGradeList: [], //所属年级
            questionSourceList: [], //考题来源
            questionTypeList: [], //考题类型

            form: {
                id: "",

                dictTaskId: [],
                dictTaskName: [],

                dictGradeId: [],
                dictGradeName: [],

                dictSourceId: [],
                dictSourceName: [],

                dictTypeId: [],
                dictTypeName: [],

                type: "",

                intro: "",
                question: "",
                answers: "",
                answerRight: "",

                remarks: "",
            },
            isLoading: false,

            typeList: Constants.GRDEQUESTION.KAOTI_QUESTION_TYPE,
        };
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
        cancelClick() {
            this.visible = false;
        }
    },
};
</script>
<style scoped>
</style>