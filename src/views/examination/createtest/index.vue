<template>
    <div class="rowBorder">
        <a-row class="tr">
            <a-button @click="createTest()" type="primary">生成PDF试卷</a-button>
        </a-row>
        <a-row ref="pdf" style="color:#000;">
            <a-row class="tc testH1">语文练习题</a-row>

            <a-row class="tr">生成日期:2022-12-07</a-row>
        </a-row>
    </div>
</template>
<script>
import { downloadPDF } from "@/libs/utils/pdf.js";

import { GradeDictControl, GradeQuestionControl } from "@/api";

export default {
    name: "grade-question-list",
    computed: {},
    provide() {
        return {
            testData: this.testData,
        };
    },
    data() {
        return {
            testData: {},
        };
    },
    watch: {},
    created() {},
    methods: {
        createTest() {
            let docName = "语文试卷练习";
            downloadPDF(this.$refs.pdf, docName);
        },
    },
};
</script>
<style lang="less" scoped >
.testH1 {
    font-size: 24px;
    font-weight: bold;
}
</style>