<template>
    <div class="rowBorder">
        <a-row class="tr">
            <a-button @click="showModal()" type="primary">显示菜单</a-button>
            <a-button @click="createTest()" type="primary">生成PDF试卷</a-button>
            <a-button @click="isAnswerClick()" type="primary">{{isAnswer==false?"显示参考答案":"不显示答案"}}</a-button>
        </a-row>
        <a-row>
            <div class="rowBorder" ref="pdf" style="width:1200px;color:#000;">
                <div class="tc testH1">{{testTitle}}练习题</div>
                <div :key="index + 'key'" v-for="(item, index) in list">
                    <div>{{ getNumChange(index + 1)}}、{{item.title}}</div>
                    <!--看拼音写汉字 || 看汉子写拼音-->
                    <div class="rowBorder" v-if="item.type==1 || item.type==2 ">
                        <div
                            :key="i + 'key-i'"
                            class="tc"
                            style="min-width:160px; float: left;"
                            v-for="(row, i) in item.list"
                        >
                            <p>{{row.question}}</p>
                            <p style="color:#CCC;" v-if="!isAnswer">_______</p>
                            <p v-if="isAnswer">{{row.answerRight}}</p>
                        </div>
                        <div class="cl"></div>
                    </div>
                </div>
                <div class="tr">生成日期:{{createTime}}</div>
            </div>
        </a-row>
        <menu-modal />
    </div>
</template>
<script>
import moment from "moment";
import { downloadPDF } from "@/libs/utils/pdf.js";
import LangUtil from "@/libs/utils/langUtil";

import MenuModal from "./modal/menu";
export default {
    name: "grade-question-list",
    components: { MenuModal },
    provide() {
        return {
            test: this,
        };
    },
    data() {
        return {
            testTitle: "", //练习题标题
            createTime: "", //生成时间
            visible: true, //菜单显示状态
            list: [], //数据集合

            isAnswer: false,
        };
    },
    created() {
        this.getCreateTime();
    },
    methods: {
        isAnswerClick() {
            this.isAnswer = !this.isAnswer;
        },
        showModal() {
            this.visible = true;
        },
        createTest() {
            downloadPDF(this.$refs.pdf, this.testTitle);
        },
        getCreateTime() {
            moment.locale("zh-cn");
            this.createTime = moment().format("YYYY-MM-DD");
        },
        getNumChange(n) {
            return LangUtil.numChanage(n);
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