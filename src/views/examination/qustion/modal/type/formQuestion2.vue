<template>
    <div>
        <a-form-model-item label="问题" prop="question">
            <a-input placeholder="请输入问题" v-model.trim="form.question"></a-input>
        </a-form-model-item>
        <a-form-model-item label="答案" prop="answers">
            <a-input placeholder="请输入答案" v-model.trim="form.answers"></a-input>
        </a-form-model-item>
        <a-form-model-item label="正确答案" prop="answerRight">
            <a-input placeholder="请输入正确答案" v-model.trim="form.answerRight"></a-input>
        </a-form-model-item>
    </div>
</template>
<script>
import Constants from "@/libs/utils/constants";
export default {
    name: "grade-question-type", //看拼音写汉字
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
            questionTypeList: [],
            questionSourceList: [],
        };
    },
    methods: {
        
        save() {
            this.onSubmit();
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