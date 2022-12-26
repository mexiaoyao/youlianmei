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

            <question-one :form="form" v-if="form.type==1" />
            <question-two :form="form" v-if="form.type==2" />

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
import { GradeQuestionControl } from "@/api";
import testMixin from "@/views/examination/mixins/testMiXins";

import Constants from "@/libs/utils/constants";
import QuestionOne from "./type/formQuestion1";
import QuestionTwo from "./type/formQuestion2";
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
    mixins: [testMixin],
    components: { QuestionOne, QuestionTwo },
    data() {
        return {
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

                type: "1",

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
            } else {
                this.resetForm();
            }
        },
    },
};
</script>
<style scoped>
</style>