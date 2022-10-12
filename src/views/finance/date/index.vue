<template>
    <div>
        <a-row>
            <Breadcrumb />
        </a-row>
        <a-row class="rowBorder">
            <a-calendar @select="clickSelect">
                <template slot="dateCellRender" slot-scope="value">
                    <a-card
                        :bodyStyle="{padding: '5px 10px'}"
                        :bordered="false"
                        :style="{backgroundColor:dateColor(value),color:'white'}"
                        class="cardp"
                    >
                        <p :title="'农历:'+dateChanage(value)">{{value.format("YYYY年MM月DD日")}}</p>
                        <p>{{isMarketDay(value) ? "交易日" : "非交易日"}}</p>
                        <p :key="index" v-for="(item,index) in getListData(value)">{{(index+1)+":"+item.content}}</p>
                    </a-card>
                </template>
                <template slot="monthCellRender" slot-scope="value">
                    <div class="notes-month" v-if="getMonthData(value)">
                        <section>{{ getMonthData(value) }}</section>
                        <span>Backlog number------------</span>
                    </div>
                </template>
            </a-calendar>
        </a-row>
        <add-modal :item="editObj" :visible="visible" @cancel="visible=false;editObj={}" @ok="addContent" />
    </div>
</template>
<script>
import calendarFormatter from "@/libs/utils/dateChanage";
import Breadcrumb from "@/components/common/Breadcrumb";

import AddModal from "./modal/index";
export default {
    name: "finance-date",
    components: { Breadcrumb, AddModal },
    data() {
        return {
            id: 123,
            listObj: [
                {
                    dateTime: "2022-06-06",
                    content: [
                        { type: 1, content: "春节" },
                        { type: 1, content: "特殊纪念日" },
                    ],
                },
                {
                    dateTime: "2022-06-07",
                    content: [{ type: 2, content: "测试" }],
                },
            ],
            visible: false,
            editObj: {}, //待处理数据
        };
    },
    created() {},
    methods: {
        /**
         * 公历转为农历
         * **/
        dateChanage(value) {
            let obj = calendarFormatter.solar2lunar(value.format("YYYY"), value.format("MM"), value.format("DD"));
            return obj.lYear + "年" + obj.IMonthCn + obj.IDayCn;
        },
        /**
         * 日期对应颜色
         * 周末：橘黄色(orange)，节假日：红色(red)，自定义：紫色（purple） 正常工作日：绿色(green)，
         * **/
        dateColor(value) {
            //周末 赋予红色
            if (!this.isWork(value)) {
                return "orange";
            }
            if (this.isFestival(value, 1)) {
                return "orange";
            }
            if (this.isFestival(value, 2)) {
                return "purple";
            }
            return "green";
        },
        /**
         * 是否是交易日
         * 是true 否false
         * **/
        isMarketDay(value) {
            if (this.isWork(value) && !this.isFestival(value, 1)) {
                return true;
            }
            return false;
        },

        /**
         * 判断是否是工作日
         * 是true 否false
         * **/
        isWork(value) {
            if (value.weekday() === 5 || value.weekday() === 6) {
                return false;
            }
            return true;
        },
        /**
         *判断是否是节假日
         type:1节假日，2自定义
         是true 否false
         * **/
        isFestival(value, type) {
            let content = this.listObj.find((item) => {
                return item.dateTime === value.format("YYYY-MM-DD");
            });
            if (!content) {
                return false;
            }
            return content.content.some((item, index, arr) => {
                return item.type === type;
            });
        },
        /**
         * 点击日期回调
         * **/
        clickSelect(value) {
            let dateTime = value.format("YYYY-MM-DD");
            let content = this.listObj.find((item) => {
                return item.dateTime === value.format("YYYY-MM-DD");
            });
            let obj = {};
            if (content) {
                obj = content;
            } else {
                obj = { dateTime: dateTime, content: [] };
            }
            this.editObj = obj;
            this.visible = true;
        },
        addContent(val) {
            let isDo = false;
            this.listObj.forEach((item) => {
                if (item.dateTime === val.dateTime) {
                    item.content = val.content;
                    isDo = true;
                }
            });
            if (!isDo) {
                this.listObj.push(val);
            }
            this.visible = false;
        },
        getListData(value) {
            let ret = this.listObj.find((item) => {
                return item.dateTime === value.format("YYYY-MM-DD");
            });
            return ret ? ret.content : [];
        },
        getMonthData(value) {
            if (value.month() === 8) {
                return 1394;
            }
        },
    },
};
</script>
<style scoped>
.cardp .ant-card-body {
    padding: 5px;
}
.cardp p {
    padding: 0;
    margin: 0;
}
</style>