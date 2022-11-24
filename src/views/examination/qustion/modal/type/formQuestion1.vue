<template>
    <div>
        111111
        <a-form-model-item label="拼音" prop="question">
            <a-input placeholder="请输入拼音" v-model.trim="form.question"></a-input>
        </a-form-model-item>
        <a-form-model-item label="汉字" prop="answers">
            <a-input placeholder="请输入汉字" v-model.trim="form.answers"></a-input>
        </a-form-model-item>
        <a-form-model-item label="正确汉字" prop="answerRight">
            <a-input placeholder="请输入正确汉字" v-model.trim="form.answerRight"></a-input>
        </a-form-model-item>
    </div>
</template>
<script>
export default {
    name: "grade-question-formQuestion1", //看拼音写汉字
    props: {
        type: {
            type: Number,
            default: 1,
        },
        item: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
        };
    },
    methods: {
        
        save() {
            
        },

    },
    watch: {
        type(newVal, oldVal) {
            Object.assign(this.form, this.$options.data.call(this).form, this.item);
        },
    },
};
</script>
<style scoped>
</style>