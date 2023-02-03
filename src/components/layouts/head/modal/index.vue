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
        <a-form-model :model="form" :rules="rules" autocomplete="off" ref="loginForm">
            <a-form-model-item prop="userName">
                <a-input allow-clear placeholder="请输入用户名" v-model="form.userName">
                    <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="user" />
                </a-input>
            </a-form-model-item>
            <a-form-model-item prop="userPwd">
                <a-input-password allow-clear autocomplete="off" placeholder="请输入密码" v-model="form.userPwd">
                    <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="lock" />
                </a-input-password>
            </a-form-model-item>
            <!-- <a-form-model-item prop="code">
                <a-input allow-clear placeholder="请输入验证码" style="width:200px; float:left;" v-model="form.code">
                    <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="safety" />
                </a-input>
                <img :src="codeUrl" @click="getCode" height="32" style="float:right" width="140" />
            </a-form-model-item>
            <a-form-item prop="isCheck">
                <a-checkbox :checked="form.isCheck==1" @change="handleChange">股市有风险，入市请谨慎！</a-checkbox>
            </a-form-item>-->
        </a-form-model>
    </a-modal>
</template>
<script>
import { v4 } from "uuid";
import Constants from "@/libs/utils/constants";
import { LoginControl } from "@/api";
import { booleanCheck } from "@/libs/utils/decorator";
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
                userName: "",
                userPwd: "",
                uuid: "",
                // code: "",
                // isCheck: 0,
            },
            rules: {
                userName: [{ required: true, message: "用户名不可为空", trigger: "blur" }],
                userPwd: [{ required: true, message: "密码不可为空", trigger: "blur" }],
                //code: [{ required: true, message: "验证码不可为空", trigger: "blur" }],
                // isCheck: [
                //     {
                //         validator: booleanCheck.bind(this),
                //         message: "请阅读风险提示，并确认",
                //         trigger: "change",
                //     },
                // ],
            },
            codeUrl: null,
        };
    },
    methods: {
        handleChange(e) {
            this.form.isCheck = e ? 1 : 0;
        },
        cancelClick() {
            this.$emit("ok");
        },
        getCode() {
            this.form.uuid = v4();
            let parmes = { uuid: this.form.uuid };
            LoginControl.getCode(parmes).then((res) => {
                console.log("res:" + res);
                this.codeUrl = res.data.img;
            });
        },
        save() {
            let _slef = this;
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    // if (_self.form.isCheck) {
                    //     alert("#######");
                    //     return;
                    // }
                    LoginControl.LoginSubmit(_slef.form).then((res) => {
                        if (res.code === 10000) {
                            localStorage.setItem(Constants.LOGIN_PARMES.USER_NAME, res.data.username);
                            localStorage.setItem(Constants.LOGIN_PARMES.USER_TOKEN, res.data.token);
                            this.$emit("ok");
                        } else {
                            _self.$notification.error({
                                message: "提示",
                                description: "登录失败！",
                            });
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
    watch: {
        visible(newVal) {
            if (newVal) {
                this.getCode();
            }
            this.$options.data.call(this).form;
        },
    },
};
</script>
<style scoped>
</style>