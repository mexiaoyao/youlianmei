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
            <a-form-model-item label="分类名称" prop="dictName">
                <a-input placeholder="请输入分类名称" v-model="form.dictName"></a-input>
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
import { GradeDictControl } from "@/api";
export default {
    name: "examination-list-add",
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
            form: {
                id: "",
                dictId: "",
                dictName: "",
            },
            rules: {
                dictName: [{ required: true, message: "分类名称不可为空", trigger: "blur" }],
            },
            isLoading: false,
        };
    },
    created() {},
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
                    GradeDictControl.actionDo(_slef.form).then((res) => {
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
            if (newVal) {
                if (null != this.item.id && undefined != this.item.id) {
                    Object.assign(this.form, this.item);
                } else {
                    this.form = this.$options.data.call(this).form;
                }
            } else {
                this.resetForm();
            }
        },
    },
};
</script>
<style scoped>
</style>