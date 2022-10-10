<template>
    <div class="menuTop">
        <a-menu :openKeys="openKeys" @openChange="menuOpenChange" mode="horizontal" v-model="selectedKeys">
            <template v-for="item in menus">
                <a-menu-item :key="item.key" @click="menuClick(item.path)" v-if="!item.children">
                    <span>{{ item.meta.title }}</span>
                </a-menu-item>
                <sub-menu :key="item.key + 'sub'" :menuInfo="item" v-else />
            </template>
        </a-menu>
    </div>
</template>
<script>
import SubMenu from "./subMenu";
import routerData from "@/router/routerData";
export default {
    name: "app-menu",
    components: {
        "sub-menu": SubMenu,
    },
    data() {
        return {
            openKeys: [],
            selectedKeys: [],
        };
    },
    computed: {
        menus() {
            //return routerData.filter((m) => !(m.key === "account" && localStorage.getItem(StorageConstant.ADMIN_ACCOUNT_TYPE) !== "super"));
            return routerData;
        },
    },
    created() {
        //this.getDefaultMenuKeys();
    },
    methods: {
        //获取当前URL打开的菜单
        getDefaultMenuKeys() {
            if (null != this.menus && this.menus.length > 0) {
                // let ss = this.menus
                //     .filter((item) => {
                //         console.log("1");
                //         return item;
                //     })
                //     .find((item) => {
                //         console.log("2");
                //         return true;
                //     });
                let menu = this.menus
                    .map((item) => item.children)
                    .flat()
                    .find((item) => {
                        if (null != item && undefined != item && null != item.path) {
                            return this.$route.path.includes(item.path);
                        }
                        return false;
                    });
                if (menu) {
                    this.openKeys = [menu.key.split(".")[0]];
                    this.selectedKeys = [menu.key];
                } else {
                    this.openKeys = [""];
                    this.selectedKeys = [""];
                }
            }
        },
        menuOpenChange(openKeys) {
            if (openKeys.length > 0) {
                this.openKeys = [[...openKeys].pop()];
            } else {
                this.openKeys = [];
            }
        },
        menuClick(path) {
            this.$router.push(path.replace(":appId", this.$route.params.appId));
        },
    },
};
</script>
<style scoped>
.menuTop {
    width: 100%;
    height: 100%;
    position: relative;
}
.ant-menu {
    background: none;
    color: #fff;
    position: absolute;
    bottom: -2px;
    left: 0px;
}
</style>