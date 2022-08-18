<template>
    <div>
        <div class="app_header">
            <head-index />
        </div>
        <div class="app_content">
            <router-view />
        </div>
        <div class="app_footer">
            <footer-index />
        </div>
    </div>
</template>
<script>
import HeadIndex from "./head/index";
import FooterIndex from "./footer/index";
export default {
    name: "layouts",
    components: { HeadIndex, FooterIndex },
};
</script>
<style scoped>
.app_header {
    background: #141414;
}
.app_content {
    background: #f0f2f5;
}

.app_footer {
    text-align: center;
}
</style>
