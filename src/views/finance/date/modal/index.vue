<template>
    <a-modal
        :bodyStyle="{ maxHeight: '500px', overflowY: 'auto' }"
        :title="'操作'"
        :visible="visible"
        :width="600"
        @cancel="cancelClick"
        @ok="save"
        destroyOnClose
    >
        <a-form-model :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" ref="addForm">
            <a-row class="tc pt15" v-if="null==item.content || item.content.length==0">
                <a-button @click="add" icon="plus" type="primary" />
            </a-row>
            <a-row :key="index" class="pt15" v-for="(obj,index) in item.content">
                <a-col :span="8">
                    <a-select :style="{width:'170px'}" placeholder="请选择指数类型" v-model="obj.type">
                        <a-select-option :key="index" :value="arr.code" v-for="(arr,index) in typeList">{{arr.codeName}}</a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="12">
                    <a-input :style="{width:'260px'}" placeholder="请输入内容" v-model="obj.content"></a-input>
                </a-col>
                <a-col :span="4">
                    <a-button @click="reduce(index)" icon="minus" type="danger" />
                    <a-button @click="add" icon="plus" type="primary" />
                </a-col>
            </a-row>
        </a-form-model>
        <template #footer>
            <a-button @click="cancelClick" key="back">取消</a-button>
            <a-button @click="onSubmit" key="submit" type="primary">提交</a-button>
        </template>
    </a-modal>
</template>
<script>
import axios from "axios";
import Constants from "@/libs/utils/constants";
export default {
    name: "shares-date-add",
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
            typeList: Constants.PUBLICCOMMON_FESTIVAL,
        };
    },
    created() {},
    methods: {
        add() {
            this.item.content.push({ type: 1, content: "" });
        },
        reduce(index) {
            this.item.content.splice(index, 1);
        },
        cancelClick() {
            this.$emit("cancel");
        },
        save() {
            this.onSubmit();
        },
        onSubmit() {
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
        },
    },
};
</script>
<style scoped>
</style>