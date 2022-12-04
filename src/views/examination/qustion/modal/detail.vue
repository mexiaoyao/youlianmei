<template>
    <a-modal
        :bodyStyle="{ maxHeight: '500px', overflowY: 'auto' }"
        :title="'详情'"
        :visible="visible"
        :width="650"
        @cancel="cancelClick"
        @ok="save"
        destroyOnClose
    >
        <a-form-model :label-col="{ span: 8 }" :model="form" :wrapper-col="{ span: 12 }" ref="addForm">
            <a-form-model-item label="试卷种类">{{form.dictTaskPathName}}</a-form-model-item>
            <a-form-model-item label="所属年级">{{form.dictGradePathName}}</a-form-model-item>
            <a-form-model-item label="题目来源">{{form.dictSourcePathName}}</a-form-model-item>
            <a-form-model-item label="所属类型">{{form.dictTypePathName}}</a-form-model-item>
            <a-form-model-item label="类型">{{ form.type | CusListFind(typeList, 'code', 'codeName') }}</a-form-model-item>
            <question-one :form="form" v-if="form.type==1" />
            <question-two :form="form" v-if="form.type==2" />
            <a-form-model-item label="使用次数">{{form.usedNum}}</a-form-model-item>
            <a-form-model-item label="点赞数"><a-icon type="like" /> {{form.goodNum}}</a-form-model-item>
            <a-form-model-item label="踩数"><a-icon type="like" rotate="180" /> {{form.poorNum}}</a-form-model-item>
            <a-form-model-item label="添加时间">{{form.createTime}}</a-form-model-item>
            <a-form-model-item label="修改时间">{{form.updateTime}}</a-form-model-item>
            <a-form-model-item label="分享次数"><a-icon type="sync" /> {{form.shareNum}}</a-form-model-item>
            <a-form-model-item label="图片">{{form.imgUrl}}</a-form-model-item>
            <a-form-model-item label="创建人">{{form.createName}}</a-form-model-item>
            <a-form-model-item label="备注">{{form.remarks}}</a-form-model-item>
        </a-form-model>
    </a-modal>
</template>
<script>
import Constants from "@/libs/utils/constants";
import QuestionOne from "./type/formQuestion1Detail";
import QuestionTwo from "./type/formQuestion2Detail";
export default {
    name: "grade-question-list-detail",
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
    components: { QuestionOne, QuestionTwo },
    data() {
        return {
            form:{},
            typeList: Constants.GRDEQUESTION.KAOTI_QUESTION_TYPE,
        };
    },
    methods: {
        cancelClick() {
            Object.assign(this.form, this.$options.data.call(this).form);
            this.$emit("cancel");
        },
        save() {
            this.cancelClick();
        },
    },
    watch: {
        visible(newVal, oldVal) {
            if (newVal && !oldVal) {
                Object.assign(this.form, this.$options.data.call(this).form, this.item);
            }
        },
    },
};
</script>
<style scoped>
</style>