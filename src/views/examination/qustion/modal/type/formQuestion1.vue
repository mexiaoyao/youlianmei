<template>
    <div>
        <a-form-model-item label="拼音" prop="question" :rules="{ required: true, message: '请输入拼音', trigger: 'blur'}" >
            <a-input placeholder="请输入拼音" v-model.trim="form.question"></a-input>
        </a-form-model-item>
        <a-form-model-item label="正确汉字" prop="answerRight" :rules="{ required: true, message: '请输入正确汉字', trigger: 'blur'}">
            <a-input placeholder="请输入正确汉字" v-model.trim="form.answerRight"></a-input>
        </a-form-model-item>
    </div>
</template>
<script>
export default {
    name: "grade-question-formQuestion1", //看拼音写汉字
    props: {
        form: {
            type: Object,
            default: () => {},
        },
    },
    watch: {
        "form.type": {
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.form.intro = "";
                    this.form.question = "";
                    this.form.answers = "";
                    this.form.answerRight = "";
                }
            },
            immediate: true,
        },
    },
};
</script>
<style scoped>
</style>