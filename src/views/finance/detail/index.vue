<template>
    <div>
        <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="折线图">
                <shares-echarts />
            </a-tab-pane>
            <a-tab-pane key="2" tab="数据详情">
                <shares-tables />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
import SharesEcharts from "./echarts";
import SharesTables from "./tables";
export default {
    name: "finance-detail",
    components: { SharesEcharts, SharesTables },
    data() {
        return {
            list: [],
        };
    },
};
</script>
<style scoped>
</style>