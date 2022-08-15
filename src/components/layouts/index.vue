<template>
    <div>
        <div class="app_header">
            <head-index />
        </div>
        <div class="app_content">
            <router-view />
        </div>
        <div class="app_footer">
            <a-row>版权所有：{{company}} 邮箱：{{email}}</a-row>
            <a-row>备案号：{{beian}}</a-row>
        </div>
    </div>
</template>
<script>
import HeadIndex from "./head/index";
export default {
    name: "layouts",
    components: { HeadIndex },
    data() {
        return {
            company: process.env.VUE_APP_COMPANY,
            email: process.env.VUE_APP_EMAIL,
            beian: process.env.VUE_APP_BEIAN
        };
    }
};
</script>
<style scoped>
.app_header {
    background-color: #18a8ff;
}
.app_footer {
    text-align: center;
}
</style>>
