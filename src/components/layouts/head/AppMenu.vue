<template>
    <div class="menuTop">
        <a-menu mode="horizontal">
            <a-menu-item key="home">首页</a-menu-item>
            <a-sub-menu>
                <span class="submenu-title-wrapper" slot="title">金融行业</span>
                <a-menu-item key="setting:1">Option 1</a-menu-item>
                <a-menu-divider />
                <a-menu-item key="setting:2">Option 2</a-menu-item>
            </a-sub-menu>
            <a-menu-item key="alipay">健康管理</a-menu-item>
        </a-menu>
    </div>
</template>
<script>
export default {
    name: "app-menu",
    data() {
        return {
            id: 123
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {}
    }
};
</script>
<style scoped>
.menuTop {
    padding-top: 20px;
}
.ant-menu {
    background: none;
    color: #fff;
}
</style>