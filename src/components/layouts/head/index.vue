<template>
    <div>
        <div class="logo">log</div>
        <app-menu />
    </div>
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
#components-layout-demo-top .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    padding: 0px;
    color: #fff;
    line-height: 31px;
    text-align: center;
    float: left;
}
</style>