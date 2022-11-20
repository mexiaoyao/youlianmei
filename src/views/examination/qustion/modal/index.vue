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
            <a-form-model-item label="所属类型" prop="indexType">
                <a-tree-select
                    :allowClear="true"
                    show-search
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    v-model="form.dictId"
                    :tree-data="treeData"
                    :placeholder="'请选择所属类型'"
                    tree-default-expand-all
                    :search-placeholder="'请搜索所属类型'"
                    :replaceFields="{children:'children', title:'dictName', key:'id', value: 'dictName' }"
                />
            </a-form-model-item>
            <a-form-model-item label="类型" prop="type">
                <a-select :style="{width:'100px'}" v-model="form.type" placeholder="Select a person">
                    <a-select-option
                        :key="index"
                        :value="item.code"
                        v-for="(item,index) in typeList"
                    >{{item.codeName}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="问题" prop="question">
                <a-input placeholder="请输入问题" v-model="form.question"></a-input>
            </a-form-model-item>
            <a-form-model-item label="答案" prop="answers">
                <a-input placeholder="请输入答案" v-model="form.answers"></a-input>
            </a-form-model-item>
            <a-form-model-item label="正确答案" prop="answerRight">
                <a-input placeholder="请输入正确答案" v-model="form.answerRight"></a-input>
            </a-form-model-item>
            <a-form-model-item label="备注">
                <a-input placeholder="请输入备注" v-model="form.remarks"></a-input>
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
import { TreeSelect } from 'ant-design-vue';
import { GradeDictControl, GradeQuestionControl } from "@/api";
import Constants from "@/libs/utils/constants";
import LangUtil from "@/libs/utils/langUtil";
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
    data() {
        return {
            SHOW_ALL : TreeSelect.SHOW_ALL,
            treeData:[],
            form: {
                id: "",
                dictId: "",
                type:"",
                question: "",
                answers: "",
                answerRight: "",
                remarks: "",
            },
            rules: {
                dictId: [{ required: true, message: "请选择所属类型", trigger: "change" }],
                type: [{ required: true, message: "请选择开题类型", trigger: "change" }],
                question: [{ required: true, message: "问题不可为空", trigger: "blur" }],
                answers: [{ required: true, message: "答案不可为空", trigger: "blur" }],
                answerRight: [{ required: true, message: "正确答案不可为空", trigger: "blur" }],
            },
            isLoading: false,

            typeList: Constants.GRDEQUESTION.TYPE,
        };
    },
    methods: {
        init(){
            this.isLoading = true;
            GradeDictControl.list({}).then((res) => {
                this.treeData = res.list || [];
            }).finally(()=>{
                this.isLoading = false;
            });
        },
        selectChange(value, e){
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
            if (newVal && !oldVal)  {
                if (null != this.item.id && undefined != this.item.id) {
                    Object.assign(this.form, this.item);
                } else {
                    Object.assign(this.$data, this.$options.data.call(this));
                }
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