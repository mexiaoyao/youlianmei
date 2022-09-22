<template>
    <div>
        <a-row>
            <Breadcrumb />
        </a-row>
        <a-row>模板{{$route.params.id}}</a-row>
    </div>
</template>
<script>
import Breadcrumb from "@/components/common/Breadcrumb";
export default {
    name: "finance-detail",
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
        init() {
            debugger;
            console.log("params.id:" + this.$route.params.id);
        },
    },
};
</script>
<style scoped>
</style>