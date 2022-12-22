<template>
    <div class="rowBorder">
        <a-row class="tr">
            <a-button @click="showModal()" type="primary">显示菜单</a-button>
            <a-button @click="createTest()" type="primary">生成PDF试卷</a-button>
        </a-row>
        <a-row ref="pdf" style="color:#000;">
            <a-row class="tc testH1">{{testTitle}}练习题</a-row>
            <div :key="index + 'key'" v-for="(item, index) in list">
                <a-row>{{ getNumChange(index + 1)}}、{{item.title}}</a-row>
                <!--看拼音写汉字-->
                <a-row class="rowBorder" v-if="item.type==1">
                    <a-card :key="i + 'key-i'" style="width:160px" v-for="(row, i) in item.list">
                        <p>
                            <a-icon class="orange" type="question" />
                            {{row.question}}
                        </p>
                        <p>{{row.answers}}</p>
                        <p>
                            <a-icon class="green" type="check" />
                            {{row.answerRight}}
                        </p>
                    </a-card>
                </a-row>
            </div>
            <a-row class="tr">生成日期:{{createTime}}</a-row>
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
        };
    },
    created() {
        this.getCreateTime();
    },
    methods: {
        showModal() {
            this.visible = true;
        },
        createTest() {
            let docName = "语文试卷练习";
            downloadPDF(this.$refs.pdf, docName);
        },
        getCreateTime() {
            moment.locale("zh-cn");
            this.createTime = moment().format("YYYY-MM-DD HH:mm:ss");
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