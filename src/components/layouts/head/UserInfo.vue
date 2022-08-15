<template>
    <a-dropdown>
        <div>
            <a-avatar icon="user" shape="circle" />
            <span class="username">郑雷</span>
        </div>
        <a-menu slot="overlay" style="min-width: 120px">
            <a-menu-item>
                <span>修改密码</span>
            </a-menu-item>
            <a-menu-item>
                <span>退出</span>
            </a-menu-item>
        </a-menu>
    </a-dropdown>
</template>
<script>
export default {
    name: "user-info",
    data() {
        return {
            id: 123
        };
    },
    watch: {},
    created() {
        this.init();
    },
    methods: {
        init() {}
    }
};
</script>
<style scoped>
.user-avatar-a,
.username {
    line-height: 64px;
    color: #fff;
}
</style>