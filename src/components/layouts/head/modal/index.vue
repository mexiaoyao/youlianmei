<template>
    <a-modal
        :bodyStyle="{ maxHeight: '500px', overflowY: 'auto' }"
        :title="'登录'"
        :visible="visible"
        :width="400"
        @cancel="cancelClick"
        @ok="save"
        destroyOnClose
    >
        <a-form-model :model="form" :rules="rules" ref="loginForm">
            <a-form-model-item prop="username">
                <a-input placeholder="请输入用户名" v-model="form.username">
                    <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
                <a-input :type="password" placeholder="请输入密码" v-model="form.password">
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                    <a-icon slot="suffix" type="eye" v-if="delubukejian" style="color:rgba(0,0,0,.25)" @click="changeType()" />
                    <a-icon slot="suffix" type="eye-invisible" v-else style="color:rgba(0,0,0,.25)" @click="changeType()" />
                </a-input>
            </a-form-model-item>
        </a-form-model>
    </a-modal>
</template>
<script>
export default {
    name: "layouts-head-userInfo-modal",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            rules: {
                username: [{ required: true, message: "用户名不可为空", trigger: "blur" }],
                password: [{ required: true, message: "密码不可为空", trigger: "blur" }],
            },
            delubukejian: true, //眼睛显示隐藏
            password:"password"
        };
    },
    methods: {
        changeType() {
            if (this.delubukejian) {
                this.delubukejian = false
                this.password = 'text'
            } else {
                this.delubukejian = true
                this.password = 'password'
            }
        },
        cancelClick() {
            this.$emit("ok");
        },
        save() {
            let _slef = this;
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    console.log("-------------------------");
                    this.$emit("ok");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
    watch: {
        visible() {
            this.$options.data.call(this).form;
        },
    },
};
</script>
<style scoped>
</style>