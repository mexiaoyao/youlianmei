<template>
    <div>模板</div>
</template>
<script>
export default {
    name: "finance-detail-echarts",
    data() {
        return {
            id: 123,
        };
    },
    created() {
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
    },
};
</script>
<style scoped>
</style>