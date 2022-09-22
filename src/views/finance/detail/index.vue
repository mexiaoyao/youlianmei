<template>
    <div>
        <a-row>
            <Breadcrumb />
        </a-row>
        <a-row class="rowPdMar">
            <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="折线图">
                    <shares-echarts />
                </a-tab-pane>
                <a-tab-pane key="2" tab="数据详情">
                    <shares-tables />
                </a-tab-pane>
            </a-tabs>
        </a-row>
    </div>
</template>
<script>
import Breadcrumb from "@/components/common/Breadcrumb";
import SharesEcharts from "./echarts";
import SharesTables from "./tables";
export default {
    name: "finance-detail",
    components: { Breadcrumb, SharesEcharts, SharesTables },
    data() {
        return {
            list: [],
        };
    },
};
</script>
<style scoped>
</style>