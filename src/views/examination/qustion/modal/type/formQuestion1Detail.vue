<template>
    <div>
        <a-form-model-item label="拼音">
            {{form.question}}
        </a-form-model-item>
        <a-form-model-item label="正确汉字">
            {{form.answerRight}}
        </a-form-model-item>
    </div>
</template>
<script>
export default {
    name: "grade-question-formQuestion1Detail", //看拼音写汉字
    props: {
        form: {
            type: Object,
            default: () => {},
        },
    }
};
</script>
<style scoped>
</style>