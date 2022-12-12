<template>
    <div class="rowBorder">
        <a-row class="tr">
            <a-button @click="createTest()" type="primary">生成PDF试卷</a-button>
        </a-row>
        <a-row ref="pdf" style="color:#000;">
            <a-row class="tc testH1">{{testTitle}}练习题</a-row>
            <div v-for="(item, index) in list" :key="index + 'key'">
                <a-row>{{ getNumChange(index + 1)}}、{{item.title}}</a-row>

            </div>
            <a-row class="tr">生成日期:{{createTime}}</a-row>
        </a-row>
        <menu-modal />
    </div>
</template>
<script>
import moment from 'moment';
import { downloadPDF } from "@/libs/utils/pdf.js";
import LangUtil from "@/libs/utils/langUtil";

import MenuModal from "./modal/menu";
export default {
    name: "grade-question-list",
    components: { MenuModal },
    provide() {
        return {
            test:this,
        };
    },
    data() {
        return {
            testTitle: "",       //练习题标题
            createTime: "",     //生成时间
            visible: true,     //菜单显示状态
            list:[],            //数据集合
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
            this.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
        },
        getNumChange(n){
            return LangUtil.numChanage(n);
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