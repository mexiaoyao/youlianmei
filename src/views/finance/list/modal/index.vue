<template>
    <a-modal
        :bodyStyle="{ maxHeight: '500px', overflowY: 'auto' }"
        :title="form.id===''?'新增':'编辑'"
        :visible="visible"
        :width="500"
        @cancel="$emit('cancel')"
        @ok="save"
        destroyOnClose
    >
        <a-form-model :form="form" :label-col="{ span: 8 }" :rules="rules" :wrapper-col="{ span: 12 }" ref="addForm">
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
                <a-input placeholder="请输入股票总数" v-model="form.sharesTotalNumber"></a-input>
            </a-form-model-item>
            <a-form-model-item label="可流动股票总数" prop="sharesAllowTotalNumber">
                <a-input placeholder="请输入可流动股票总数" v-model="form.sharesAllowTotalNumber"></a-input>
            </a-form-model-item>
            <a-form-model-item label="备注">
                <a-input placeholder="请输入备注" v-model="form.remarks"></a-input>
            </a-form-model-item>
        </a-form-model>
    </a-modal>
</template>
<script>
//
import Constants from "@/libs/utils/constants";
export default {
    name: "shares-list-add",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        indexTypeList() {
            return Constants.FINANCE.INDEX_TYPE.splice(1);
        },
    },
    data() {
        return {
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
                    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
                ],
                sharesName: [{ required: true, message: "股票名称不可为空", trigger: "blur" }],
                sharesAlise: [{ required: true, message: "股票别名不可为空", trigger: "blur" }],
                sharesTotalNumber: [{ required: true, message: "股票总数不可为空", trigger: "blur" }],
                sharesAllowTotalNumber: [{ required: true, message: "可流动股票总数不可为空", trigger: "blur" }],
            },
            isLoading: false,
        };
    },
    created() {},
    methods: {
        save() {
            this.onSubmit();
        },
        onSubmit() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    alert("submit!");
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