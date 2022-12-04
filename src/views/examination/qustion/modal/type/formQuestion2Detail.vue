<template>
    <div>
        <a-form-model-item label="汉字词语" prop="question">
            {{form.question}}
        </a-form-model-item>
        <a-form-model-item label="拼音" prop="answerRight">
            {{form.answerRight}}
        </a-form-model-item>
    </div>
</template>
<script>
export default {
    name: "grade-question-type-formQuestion2Detail", //看拼音写汉字
    props: {
        form: {
            type: Object,
            default: () => {},
        },
    },
};
</script>
<style scoped>
</style>