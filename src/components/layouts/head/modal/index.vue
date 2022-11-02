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
                    <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="user" />
                </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
                <a-input :type="password" placeholder="请输入密码" v-model="form.password">
                    <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="lock" />
                    <a-icon
                        @click="changeType()"
                        slot="suffix"
                        style="color:rgba(0,0,0,.25)"
                        type="eye"
                        v-if="delubukejian"
                    />
                    <a-icon
                        @click="changeType()"
                        slot="suffix"
                        style="color:rgba(0,0,0,.25)"
                        type="eye-invisible"
                        v-else
                    />
                </a-input>
            </a-form-model-item>
            <a-form-model-item prop="code">
                <a-input placeholder="请输入验证码" style="width:200px; float:left;" v-model="form.code">
                    <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="safety" />
                </a-input>
                <img :src="codeUrl" @click="getCode" height="32" style="float:right" width="140" />
            </a-form-model-item>
            <a-form-item prop="isCheck">
                <a-checkbox v-model="form.isCheck">股市有风险，入市请谨慎！</a-checkbox>
            </a-form-item>
        </a-form-model>
    </a-modal>
</template>
<script>
import { LoginControl } from "@/api";
export default {
    name: "layouts-head-userInfo-modal",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        // 自定义校验函数
        // rule：当前被校验对象
        // value: 用户输入的值
        const check = async (rule, value, callback) => {
            debugger;
            if (!value) {
                // 失败时执行
                return Promise.reject("警示信息必选");
            } else {
                // 成功时执行
                return Promise.resolve(); //成功
            }
        };
        return {
            form: {
                username: "",
                password: "",
                uuid: "",
                code: "",
                isCheck: false,
            },
            rules: {
                username: [{ required: true, message: "用户名不可为空", trigger: "blur" }],
                password: [{ required: true, message: "密码不可为空", trigger: "blur" }],
                code: [{ required: true, message: "验证码不可为空", trigger: "blur" }],
                isCheck: [{ validator: check, trigger: "change" }],
            },
            delubukejian: true, //眼睛显示隐藏
            password: "password",
            codeUrl: null,
        };
    },
    methods: {
        changeType() {
            if (this.delubukejian) {
                this.delubukejian = false;
                this.password = "text";
            } else {
                this.delubukejian = true;
                this.password = "password";
            }
        },
        cancelClick() {
            this.$emit("ok");
        },
        getCode() {
            let parmes = {};
            LoginControl.getCode(parmes).then((res) => {
                this.codeUrl = res.img;
                this.form.uuid = res.uuid;
            });
        },
        save() {
            let ss = this.form;
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