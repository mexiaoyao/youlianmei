<template>
    <a-row type="flex">
        <a-col class="logo" flex="180px">Ant Design Vue</a-col>
        <a-col flex="auto">
            <app-menu />
        </a-col>
        <a-col flex="160px">
            <user-info />
        </a-col>
    </a-row>
</template>
<script>
import AppMenu from "./appMenu.vue";
import UserInfo from "./userInfo.vue";
export default {
    name: "head-indx",
    components: { AppMenu, UserInfo },
    data() {
        return {
            id: 123,
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
.lf {
    float: left;
}
.logo {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    line-height: 64px;
}
</style>