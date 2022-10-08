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
            <a-form-model-item label="指数类型" prop="indexType">
                <a-select placeholder="请选择指数类型" v-model="form.indexType">
                    <a-select-option
                        :key="index"
                        :value="item.code"
                        v-for="(item,index) in indexTypeList"
                    >{{item.codeName}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="股票代码" prop="codeNumber">
                <a-input placeholder="请输入股票代码" v-model="form.codeNumber"></a-input>
            </a-form-model-item>
            <a-form-model-item label="股票名称" prop="sharesName">
                <a-input placeholder="请输入股票名称" v-model="form.sharesName"></a-input>
            </a-form-model-item>
            <a-form-model-item label="股票别名" prop="sharesAlise">
                <a-input placeholder="请输入股票别名" v-model="form.sharesAlise"></a-input>
            </a-form-model-item>
            <a-form-model-item label="股票总数" prop="sharesTotalNumber">
                <a-input-number placeholder="请输入股票总数" style="width:100%;" v-model="form.sharesTotalNumber"></a-input-number>
            </a-form-model-item>
            <a-form-model-item label="可流动股票总数" prop="sharesAllowTotalNumber">
                <a-input-number placeholder="请输入可流动股票总数" style="width:100%;" v-model="form.sharesAllowTotalNumber"></a-input-number>
            </a-form-model-item>
            <a-form-model-item label="备注">
                <a-input placeholder="请输入备注" v-model="form.remarks"></a-input>
            </a-form-model-item>
        </a-form-model>
        <template #footer>
            <a-button @click="cancelClick" key="back">取消</a-button>
            <a-button @click="resetForm" key="reSet">重置</a-button>
            <a-button :loading="isLoading" @click="onSubmit" key="submit" type="primary">提交</a-button>
        </template>
    </a-modal>
</template>
<script>
import axios from "axios";
import Constants from "@/libs/utils/constants";
import { gpCodeCheck, zhengshuCheck } from "@/libs/utils/decorator";
export default {
    name: "shares-list-add",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            indexTypeList: Constants.FINANCE.INDEX_TYPE,
            form: {
                id: "",
                indexType: undefined,
                codeNumber: "",
                sharesName: "",
                sharesAlise: "",
                sharesTotalNumber: null,
                sharesAllowTotalNumber: null,
                remarks: "",
            },
            rules: {
                indexType: [{ required: true, message: "指数类型不可为空", trigger: "change" }],
                codeNumber: [
                    { required: true, message: "股票代码不可为空", trigger: "blur" },
                    {
                        validator: gpCodeCheck.bind(this),
                        message: "请输入正确的股票代码",
                        trigger: "blur",
                    },
                ],
                sharesName: [{ required: true, message: "股票名称不可为空", trigger: "blur" }],
                sharesAlise: [{ required: true, message: "股票别名不可为空", trigger: "blur" }],
                sharesTotalNumber: [
                    { required: true, message: "股票总数不可为空", trigger: "blur" },
                    {
                        validator: zhengshuCheck.bind(this),
                        message: "请输入正确的股票总数",
                        trigger: "blur",
                    },
                ],
                sharesAllowTotalNumber: [
                    { required: true, message: "可流动股票总数不可为空", trigger: "blur" },
                    {
                        validator: zhengshuCheck.bind(this),
                        message: "请输入正确的可流动股票总数",
                        trigger: "blur",
                    },
                ],
            },
            isLoading: false,
        };
    },
    created() {},
    methods: {
        checkPrice(rule, value, callback) {
            if (value.number > 0) {
                callback();
                return;
            }
            callback("请输入正整数!");
        },
        cancelClick() {
            this.resetForm();
            this.$emit("cancel");
        },
        save() {
            this.onSubmit();
        },
        onSubmit() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    axios.post("/ylm/finance/actionFinance", this.form).then((res) => {
                        if (res.data.code === 10000) {
                            this.$notification.success({
                                message: "提示",
                                description: "操作成功！",
                            });
                            this.cancelClick();
                        } else {
                            this.$notification.error({
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
            this.$refs.addForm.resetFields();
        },
    },
};
</script>
<style scoped>
</style>