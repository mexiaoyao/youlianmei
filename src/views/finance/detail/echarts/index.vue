<template>
    <div>
        <a-row>
            <a-form layout="inline">
                <a-form-item label="今日开盘价">
                    <a-checkbox :value="todayOpenPrice" />
                </a-form-item>
                <a-form-item label="昨日收盘价">
                    <a-checkbox :value="yesterdayClosePrice" />
                </a-form-item>
                <a-form-item label="今日最高价">
                    <a-checkbox :value="todayMaxPrice" />
                </a-form-item>
                <a-form-item label="今日最低价">
                    <a-checkbox :value="todayMaxPrice" />
                </a-form-item>
                <a-form-item label="今日平均低价">
                    <a-checkbox :value="todayMaxPrice" />
                </a-form-item>
                <a-form-item label="成交金额">
                    <a-checkbox :value="todayMaxPrice" />
                </a-form-item>
                <a-form-item label="股票总数">
                    <a-checkbox :value="todayMaxPrice" />
                </a-form-item>
                <a-form-item label="可流动股票总数">
                    <a-checkbox :value="todayMaxPrice" />
                </a-form-item>
                <a-form-item label="成交的股票数">
                    <a-checkbox :value="todayMaxPrice" />
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
            todayOpenPrice: false,
            yesterdayClosePrice: false,
            todayMaxPrice: false,
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
                    text: "Stacked Line",
                },
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
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
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        name: "Email",
                        type: "line",
                        stack: "Total",
                        data: [120, 132, 101, 134, 90, 230, 210],
                    },
                    {
                        name: "Union Ads",
                        type: "line",
                        stack: "Total",
                        data: [220, 182, 191, 234, 290, 330, 310],
                    },
                    {
                        name: "Video Ads",
                        type: "line",
                        stack: "Total",
                        data: [150, 232, 201, 154, 190, 330, 410],
                    },
                    {
                        name: "Direct",
                        type: "line",
                        stack: "Total",
                        data: [320, 332, 301, 334, 390, 330, 320],
                    },
                    {
                        name: "Search Engine",
                        type: "line",
                        stack: "Total",
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                    },
                ],
            };
            myChart.setOption(option);
        },
    },
};
</script>
<style scoped>
</style>