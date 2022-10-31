<template>
    <a-layout class="layout" id="components-layout-demo-top">
        <a-layout-header>
            <head-index />
        </a-layout-header>
        <a-layout-content style="padding: 0 50px; height: calc(100% - 103px);">
            <Breadcrumb />
            <div class="contentMain">
                <router-view />
            </div>
        </a-layout-content>
        <a-layout-footer style="height:90px; text-align: center">
            <footer-index />
        </a-layout-footer>
    </a-layout>
</template>
<script>
import HeadIndex from "./head/index";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterIndex from "./footer/index";
export default {
    name: "layouts",
    components: { HeadIndex, Breadcrumb, FooterIndex },
};
</script>
<style scoped>
#components-layout-demo-top {
    width: 100%;
    height: 100%;
}
#components-layout-demo-top .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
}
</style>
