<template>
    <a-modal
        :bodyStyle="{ maxHeight: '500px', overflowY: 'auto' }"
        :title="form.id===''?'新增':'编辑'"
        :visible="visible"
        :width="500"
        @cancel="cancelClick"
        @ok="save"
        destroyOnClose
    >
        <a-form-model :label-col="{ span: 8 }" :model="form" :rules="rules" :wrapper-col="{ span: 12 }" ref="addForm">
            <a-form-model-item label="所属类型" prop="dictTypeId">
                <a-cascader
                    :allowClear="true"
                    :fieldNames="{children:'children', label:'dictName', value: 'id' }"
                    :options="questionTypeList"
                    :placeholder="'请选择题目类型'"
                    change-on-select
                    v-model="form.dictTypeId"
                    @change="dictTypeChange"
                />
            </a-form-model-item>
            <a-form-model-item label="题目来源" prop="dictSourceId">
                <a-cascader
                    :allowClear="true"
                    :fieldNames="{children:'children', label:'dictName', value: 'id' }"
                    :options="questionSourceList"
                    :placeholder="'请选择题目来源'"
                    change-on-select
                    @change="dictSourceChange"
                    v-model="form.dictSourceId"
                />
            </a-form-model-item>
            <a-form-model-item label="类型1" prop="type">
                <a-select :placeholder="'请选择类型'" :style="{width:'220px'}" v-model="form.type">
                    <a-select-option :key="index" :value="item.code" v-for="(item,index) in typeList">{{item.codeName}}</a-select-option>
                </a-select>
            </a-form-model-item>

            <question-one :type="form.type" v-if="form.type==1" />
            
            <a-form-model-item label="问题" prop="question">
                <a-input placeholder="请输入问题" v-model.trim="form.question"></a-input>
            </a-form-model-item>
            <a-form-model-item label="答案" prop="answers">
                <a-input placeholder="请输入答案" v-model.trim="form.answers"></a-input>
            </a-form-model-item>
            <a-form-model-item label="正确答案" prop="answerRight">
                <a-input placeholder="请输入正确答案" v-model.trim="form.answerRight"></a-input>
            </a-form-model-item>

            <a-form-model-item label="备注">
                <a-input placeholder="请输入备注" v-model.trim="form.remarks"></a-input>
            </a-form-model-item>
        </a-form-model>
        <template #footer>
            <a-button @click="cancelClick" key="back">取消</a-button>
            <a-button @click="resetForm" key="reSet" v-if="!form.id">重置</a-button>
            <a-button :loading="isLoading" @click="onSubmit" key="submit" type="primary">提交</a-button>
        </template>
    </a-modal>
</template>
<script>
import { GradeDictControl, GradeQuestionControl } from "@/api";
import Constants from "@/libs/utils/constants";
import QuestionOne from "./type/formQuestion1";
export default {
    name: "grade-question-list-add",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        item: {
            type: Object,
            default: () => {},
        },
    },
    components: { QuestionOne },
    data() {
        return {
            questionTypeList: [],
            questionSourceList: [],

            form: {
                id: "",
                dictTypeId: [],
                dictTypeName: [],
                dictSourceId: [],
                dictSourceName: [],
                type: undefined,
                question: "",
                answers: "",
                answerRight: "",
                remarks: "",
            },
            rules: {
                dictTypeId: [{ required: true, message: "请选择题目类型", trigger: "change" }],
                dictSourceId: [{ required: true, message: "请选择题目来源", trigger: "change" }],
                type: [{ required: true, message: "请选择考题种类", trigger: "change" }],
                question: [{ required: true, message: "问题不可为空", trigger: "blur" }],
                answers: [{ required: true, message: "答案不可为空", trigger: "blur" }],
                answerRight: [{ required: true, message: "正确答案不可为空", trigger: "blur" }],
            },
            isLoading: false,

            typeList: Constants.GRDEQUESTION.KAOTI_QUESTION_TYPE,
        };
    },
    methods: {
        /**
         * 所属类型
         * **/
        dictTypeChange(value,selectedOptions){
            this.form.dictTypeName = [];
            if(null!=selectedOptions && selectedOptions.length>0){
                selectedOptions.map((item)=>{
                    this.form.dictTypeName.push(item.dictName);
                });
            }
        },
        /**
         * 题目来源
         * **/
         dictSourceChange(value,selectedOptions){
            this.form.dictSourceName = [];
            if(null!=selectedOptions && selectedOptions.length>0){
                selectedOptions.map((item)=>{
                    this.form.dictSourceName.push(item.dictName);
                });
            }
        },
        init() {
            this.getTreeData(1);
            this.getTreeData(2);
        },
        /**
         * type 1:获取题目类型 2获取考题来源
         * **/
        getTreeData(type) {
            this.isLoading = true;
            GradeDictControl.listAll({ type: type })
                .then((res) => {
                    if (type == 1) {
                        this.questionTypeList = res.list || [];
                    } else if (type == 2) {
                        this.questionSourceList = res.list || [];
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        selectChange(value, e) {
            for (let i = 0; i < value.length; i++) {
                value[i].label = value[i].value;
            }
            this.form.dictId = value;
        },
        cancelClick() {
            this.resetForm();
            this.$emit("cancel");
        },
        save() {
            this.onSubmit();
        },
        onSubmit() {
            let _slef = this;
            this.$refs.addForm.validate((valid) => {
                if (valid) {
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
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm() {
            // this.$refs.form.resetFields(); //移除校验结果并重置字段值
            // this.$refs.form.clearValidate(); //移除校验结果
            // 二者都能清除验证，但是resetFields（）会重置字段值，而在vue中大量用到的数据的绑定，很可能出现
            // 同一个数据绑定在多处的情况，如果滥用resetFields很可能造成界面上出现莫名的bug
            // this.form = this.$options.data.call(this).form;
            //this.$nextTick(() => {
            this.$refs.addForm.resetFields();
            //});
        },
    },
    watch: {
        visible(newVal, oldVal) {
            if (newVal && !oldVal) {
                Object.assign(this.form, this.$options.data.call(this).form, this.item);
                this.init();
            } else {
                this.resetForm();
            }
        },
    },
};
</script>
<style scoped>
</style>