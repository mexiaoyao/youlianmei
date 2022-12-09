<template>
    <div class="rowBorder">
        <a-row class="tr">
            <a-button @click="createTest()" type="primary">生成PDF试卷</a-button>
        </a-row>
        <a-row ref="pdf" style="color:#000;">
            <a-row class="tc testH1">{{testData.title}}练习题</a-row>
            <a-row>一、{{testData.one.title}}</a-row>
            <a-row></a-row>
            <a-row>二、{{testData.two.title}}</a-row>
            <a-row></a-row>
            <a-row>三、{{testData.three.title}}</a-row>
            <a-row></a-row>

            <a-row class="tr">生成日期:2022-12-07</a-row>
        </a-row>
        <menu-modal />
    </div>
</template>
<script>
import { downloadPDF } from "@/libs/utils/pdf.js";

import MenuModal from "./modal/menu";
export default {
    name: "grade-question-list",
    components: { MenuModal },
    provide() {
        return {
            testData: this.testData,
        };
    },
    data() {
        return {
            testData: {
                visible: false, //右侧浮动菜单是否显示
                title: "",
                one: {
                    title: "",
                },
                two: {
                    title: "",
                },
                three: {
                    title: "",
                },
            },
        };
    },
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