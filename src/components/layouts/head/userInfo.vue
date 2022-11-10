<template>
    <div>
        <span @click="loginShow" style="color:#FFFFFF; cursor: pointer;" v-if="!userName">请登录</span>
        <a-dropdown v-else>
            <div>
                <a-avatar icon="user" shape="circle" />
                <span class="username">{{userName}}</span>
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
        <login-modal :visible="visible" @ok="visible=false;" />
    </div>
</template>
<script>
import Constants from "@/libs/utils/constants";
import LoginModal from "./modal/index.vue";
export default {
    name: "user-info",
    components: { LoginModal },
    data() {
        return {
            visible: false,
        };
    },
    computed: {
        userName() {
            return localStorage.getItem(Constants.LOGIN_PARMES.USER_NAME) || "";
        },
    },
    watch: {},
    created() {
        this.init();
    },
    methods: {
        init() {},
        loginShow() {
            this.visible = true;
        },
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