<template>
    <div class="rowBorder">
        <a-row class="tr">
            <a-button @click="createTest()" type="primary">生成PDF试卷</a-button>
        </a-row>
        <a-row ref="pdf" style="color:#000;">
            <a-row class="tc testH1">{{testData.title}}练习题</a-row>

            <template>
                <a-row>一、{{testData.one.title}}</a-row>

            </template>

            <a-row class="tr">生成日期:{{createTime}}</a-row>
        </a-row>
        <menu-modal />
    </div>
</template>
<script>
import moment from 'moment';
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
            createTime:"",
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
    created() {
        this.getCreateTime();
    },
    methods: {
        createTest() {
            let docName = "语文试卷练习";
            downloadPDF(this.$refs.pdf, docName);
        },
        getCreateTime(){
            moment.locale('zh-cn');
            this.createTime = moment().format('LLL');
        }
    },
};
</script>
<style lang="less" scoped >
.testH1 {
    font-size: 24px;
    font-weight: bold;
}
</style>