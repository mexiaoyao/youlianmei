<template>
    <div>
        <a-form-model-item label="汉字词语" prop="question">
            <a-input placeholder="请输入汉字词语" v-model.trim="form.question"></a-input>
        </a-form-model-item>
        <a-form-model-item label="拼音" prop="answerRight">
            <a-input placeholder="请输入拼音" v-model.trim="form.answerRight"></a-input>
        </a-form-model-item>
    </div>
</template>
<script>
export default {
    name: "grade-question-formQuestion2", //看拼音写汉字
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
                    this.form.question = "";
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