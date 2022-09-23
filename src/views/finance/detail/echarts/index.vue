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
            <div id="echartsId"></div>
        </a-row>
    </div>
</template>
<script>
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
            let parme = Object.assign(this.form, timeRange);
            axios.post("/ylm/finance/detail", parme).then((res) => {
                this.list = res.data.data.list || [];
            });
        },
        drawChart() {
            let myChart = this.$echarts.init(document.getElementById("echartsId"));
            let option = {};
            myChart.setOption(option);
        },
    },
};
</script>
<style scoped>
</style>