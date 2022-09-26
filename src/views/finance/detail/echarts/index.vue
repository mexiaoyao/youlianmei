<template>
    <div>
        <a-row>
            <a-form layout="inline">
                <a-form-item label="今日开盘价">
                    <a-checkbox :checked="form.todayOpenPrice" @click="form.todayOpenPrice = $event.target.checked" />
                </a-form-item>
                <a-form-item label="昨日收盘价">
                    <a-checkbox
                        :checked="form.yesterdayClosePrice"
                        @click="form.yesterdayClosePrice = $event.target.checked"
                    />
                </a-form-item>
                <a-form-item label="今日最高价">
                    <a-checkbox :checked="form.todayMaxPrice" @click="form.todayMaxPrice = $event.target.checked" />
                </a-form-item>
                <a-form-item label="今日最低价">
                    <a-checkbox :checked="form.todayMinPrice" @click="form.todayMinPrice = $event.target.checked" />
                </a-form-item>
                <a-form-item label="今日平均低价">
                    <a-checkbox
                        :checked="form.todayAveragePrice"
                        @click="form.todayAveragePrice = $event.target.checked"
                    />
                </a-form-item>
                <a-form-item label="成交金额">
                    <a-checkbox :checked="form.dealAmount" @click="form.dealAmount = $event.target.checked" />
                </a-form-item>
                <a-form-item label="股票总数">
                    <a-checkbox
                        :checked="form.sharesTotalNumber"
                        @click="form.sharesTotalNumber = $event.target.checked"
                    />
                </a-form-item>
                <a-form-item label="可流动股票总数">
                    <a-checkbox
                        :checked="form.sharesAllowTotalNumber"
                        @click="form.sharesAllowTotalNumber = $event.target.checked"
                    />
                </a-form-item>
            </a-form>
        </a-row>
        <a-row>
            <div id="echartsId" style="width:100%; height:300px;"></div>
        </a-row>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "finance-detail-echarts",
    data() {
        return {
            form: {
                todayOpenPrice: true,
                yesterdayClosePrice: false,
                todayMaxPrice: false,
                todayMinPrice: false,
                todayAveragePrice: false,
                dealAmount: false,
                sharesTotalNumber: false,
                sharesAllowTotalNumber: false,
            },
            echarts_data: {
                title: "", //echarts标题
                elegend: [], //echarts图例
                xAxis: [], //x轴日期
                series: [], //数据集合
            },
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getfinanceDetail();
        },
        getfinanceDetail() {
            axios.post("/ylm/finance/detail", {}).then((res) => {
                this.list = res.data.data.list || [];
                this.drawChart();
            });
        },

        drawChart() {
            let myChart = this.$echarts.init(document.getElementById("echartsId"));
            let option = {
                title: {
                    text: this.echarts_data.title,
                },
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: this.echarts_data.legend,
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: this.echarts_data.xAxis,
                },
                yAxis: {
                    type: "value",
                },
                series: this.echarts_data.series,
            };
            myChart.setOption(option);
        },
    },
};
</script>
<style scoped>
</style>