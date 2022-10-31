<template>
    <div>
        <a-row>版权所有：{{company}} 邮箱：{{email}}</a-row>
        <a-row>备案号：{{beian}}</a-row>
        <a-back-top />
    </div>
</template>
<script>
export default {
    name: "webBootem",
    data() {
        return {
            company: process.env.VUE_APP_COMPANY,
            email: process.env.VUE_APP_EMAIL,
            beian: process.env.VUE_APP_BEIAN,
        };
    },
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