<template>
    <div>
        <a-row>
            <Breadcrumb />
        </a-row>
        <a-row>健康脉搏</a-row>
    </div>
</template>
<script>
import Breadcrumb from "@/components/common/Breadcrumb";
export default {
    name: "finance-list",
    components: { Breadcrumb },
    data() {
        return {
            id: 123,
        };
    },
    watch: {},
    created() {
        this.init();
    },
    methods: {
        init() {},
    },
};
</script>
<style scoped>
</style>