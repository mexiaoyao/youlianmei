<template>
    <div>
        请登录
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
        <login-modal />
    </div>
</template>
<script>
import LoginModal from "./modal/index.vue";
export default {
    name: "user-info",
    components: { LoginModal },
    data() {
        return {
            visible: false,
            isLogin: false, //是否登录
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
.user-avatar-a,
.username {
    line-height: 64px;
    color: #fff;
}
</style>