<template>
    <div class="rowBorder">
        <a-row>
            <a-form layout="inline">
                <a-form-item label="今日开盘价">
                    <a-checkbox :checked="form.todayOpenPrice" @click="form.todayOpenPrice = $event.target.checked" />
                </a-form-item>
                <a-form-item label="昨日收盘价">
                    <a-checkbox
                        :checked="form.yesterdayClosePrice"
                        @click="form.yesterdayClosePrice = $event.target.checked;showTypeMet()"
                    />
                </a-form-item>
                <a-form-item label="今日最高价">
                    <a-checkbox
                        :checked="form.todayMaxPrice"
                        @click="form.todayMaxPrice = $event.target.checked;showTypeMet()"
                    />
                </a-form-item>
                <a-form-item label="今日最低价">
                    <a-checkbox
                        :checked="form.todayMinPrice"
                        @click="form.todayMinPrice = $event.target.checked;showTypeMet()"
                    />
                </a-form-item>
                <a-form-item label="今日平均低价">
                    <a-checkbox
                        :checked="form.todayAveragePrice"
                        @click="form.todayAveragePrice = $event.target.checked;showTypeMet()"
                    />
                </a-form-item>
                <a-form-item label="成交的股票数">
                    <a-checkbox
                        :checked="form.dealSharesNumber"
                        @click="form.dealSharesNumber = $event.target.checked;showTypeMet()"
                    />
                </a-form-item>
                <a-form-item label="成交金额">
                    <a-checkbox
                        :checked="form.dealAmount"
                        @click="form.dealAmount = $event.target.checked;showTypeMet()"
                    />
                </a-form-item>
                <a-form-item label="股票总数">
                    <a-checkbox
                        :checked="form.sharesTotalNumber"
                        @click="form.sharesTotalNumber = $event.target.checked;showTypeMet()"
                    />
                </a-form-item>
                <a-form-item label="可流动股票总数">
                    <a-checkbox
                        :checked="form.sharesAllowTotalNumber"
                        @click="form.sharesAllowTotalNumber = $event.target.checked;showTypeMet()"
                    />
                </a-form-item>
            </a-form>
        </a-row>
        <a-row>
            <div id="echartsId" style="width:100%; height:600px;"></div>
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
                dealSharesNumber: false,
                dealAmount: false,
                sharesTotalNumber: false,
                sharesAllowTotalNumber: false,
            },
            echarts_data: {
                title: "", //echarts标题
                legend: [], //echarts图例
                xAxis: [], //x轴日期
                series: [], //数据集合
            },
            list: [], //初始化数据
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
                this.showTypeMet();
            });
        },

        showTypeMet() {
            this.echarts_data = {
                title: "", //echarts标题
                legend: [], //echarts图例
                xAxis: [], //x轴日期
                series: [], //数据集合
            };
            this.echarts_data.title = null != this.list && this.list.length > 0 ? this.list[0].sharesName : "";
            this.checkBoxSelected(null, "legend");
            this.checkBoxSelected(this.list, "xAxis");
            this.checkBoxSelected(this.list, "series");
            this.drawChart();
        },

        /**
         * type "legend"
         * list 数据集合
         * **/
        checkBoxSelected(list, type) {
            if (type === "legend") {
                if (this.form.todayOpenPrice) {
                    this.echarts_data.legend.push("今日开盘价");
                }
                if (this.form.yesterdayClosePrice) {
                    this.echarts_data.legend.push("昨日收盘价");
                }
                if (this.form.todayMaxPrice) {
                    this.echarts_data.legend.push("今日最高价");
                }
                if (this.form.todayMinPrice) {
                    this.echarts_data.legend.push("今日最低价");
                }
                if (this.form.todayAveragePrice) {
                    this.echarts_data.legend.push("今日平均价");
                }
                if (this.form.dealSharesNumber) {
                    this.echarts_data.legend.push("成交的股票数");
                }
                if (this.form.dealAmount) {
                    this.echarts_data.legend.push("成交金额");
                }
                if (this.form.sharesTotalNumber) {
                    this.echarts_data.legend.push("股票总数");
                }
                if (this.form.sharesAllowTotalNumber) {
                    this.echarts_data.legend.push("可流动股票总数");
                }
            }
            if (type === "xAxis") {
                if (null != list && list.length > 0) {
                    list.forEach((element) => {
                        this.echarts_data.xAxis.push(element.sharesDate);
                    });
                }
            }
            if (type === "series" && null != list && list.length > 0) {
                let todayOpenPrice = [];
                let yesterdayClosePrice = [];
                let todayMaxPrice = [];
                let todayMinPrice = [];
                let todayAveragePrice = [];
                let dealSharesNumber = [];
                let dealAmount = [];
                let sharesTotalNumber = [];
                let sharesAllowTotalNumber = [];
                let series = [];
                list.forEach((element) => {
                    if (this.form.todayOpenPrice) {
                        todayOpenPrice.push(element.todayOpenPrice);
                    }
                    if (this.form.yesterdayClosePrice) {
                        yesterdayClosePrice.push(element.yesterdayClosePrice);
                    }
                    if (this.form.todayMaxPrice) {
                        todayMaxPrice.push(element.todayMaxPrice);
                    }
                    if (this.form.todayMinPrice) {
                        todayMinPrice.push(element.todayMinPrice);
                    }
                    if (this.form.todayAveragePrice) {
                        todayAveragePrice.push(element.todayAveragePrice);
                    }
                    if (this.form.dealSharesNumber) {
                        dealSharesNumber.push(element.dealSharesNumber);
                    }
                    if (this.form.dealAmount) {
                        dealAmount.push(element.dealAmount);
                    }
                    if (this.form.sharesTotalNumber) {
                        sharesTotalNumber.push(element.sharesTotalNumber);
                    }
                    if (this.form.sharesAllowTotalNumber) {
                        sharesAllowTotalNumber.push(element.sharesAllowTotalNumber);
                    }
                });
                if (this.form.todayOpenPrice) {
                    series.push({
                        name: "今日开盘价",
                        type: "line",
                        data: todayOpenPrice,
                    });
                }
                if (this.form.yesterdayClosePrice) {
                    series.push({
                        name: "昨日收盘价",
                        type: "line",
                        data: yesterdayClosePrice,
                    });
                }
                if (this.form.todayMaxPrice) {
                    series.push({
                        name: "今日最高价",
                        type: "line",
                        data: todayMaxPrice,
                    });
                }
                if (this.form.todayMinPrice) {
                    series.push({
                        name: "今日最低价",
                        type: "line",
                        data: todayMinPrice,
                    });
                }
                if (this.form.todayAveragePrice) {
                    series.push({
                        name: "今日平均价",
                        type: "line",
                        data: todayAveragePrice,
                    });
                }
                if (this.form.dealSharesNumber) {
                    series.push({
                        name: "成交的股票数",
                        type: "line",
                        data: dealSharesNumber,
                    });
                }
                if (this.form.dealAmount) {
                    series.push({
                        name: "成交金额",
                        type: "line",
                        data: dealAmount,
                    });
                }
                if (this.form.sharesTotalNumber) {
                    series.push({
                        name: "股票总数",
                        type: "line",
                        data: sharesTotalNumber,
                    });
                }
                if (this.form.sharesAllowTotalNumber) {
                    series.push({
                        name: "可流动股票总数",
                        type: "line",
                        data: sharesAllowTotalNumber,
                    });
                }
                this.echarts_data.series = series;
            }
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
            myChart.setOption(option, true); //setOption(option,boolean) boolean true可随着数据变化重新初始化
        },
    },
};
</script>
<style scoped>
</style>