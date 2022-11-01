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
            <a-row class="tc pt15" v-if="null==listData || listData.length==0">
                <a-button @click="add" icon="plus" type="primary" />
            </a-row>
            <a-row :key="index" class="pt15" v-for="(obj,index) in listData">
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
    </a-modal>
</template>
<script>
export default {
    name: "layouts-head-userInfo-modal",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        add() {
            this.listData.push({ type: 1, content: "" });
        },
        reduce(index) {
            this.listData.splice(index, 1);
        },
        cancelClick() {
            this.$emit("cancel");
        },
        save() {
            this.onSubmit();
        },
        onSubmit() {
            axios.post("/ylm/finance/addNotes", this.form).then((res) => {
                if (res.data.code === 10000) {
                    this.$notification.success({
                        message: "提示",
                        description: "操作成功！",
                    });
                    this.$emit("ok", { dateTime: this.item.dateTime, content: this.listData });
                } else {
                    this.$notification.error({
                        message: "提示",
                        description: "操作失败！",
                    });
                }
            });
        },
    },
    watch: {
        visible(newVal) {
            if (newVal && null != this.item.content && this.item.content.length > 0) {
                this.listData = JSON.parse(JSON.stringify(this.item.content));
            } else {
                this.listData = [];
            }
        },
    },
};
</script>
<style scoped>
</style>