<template>
    <div class="app-breadcrumb">
        <span class="tips">您的位置：</span>
        <a-breadcrumb separator=">">
            <a-breadcrumb-item :key="item.path" v-for="(item, index) in breadcrumbList">
                <router-link
                    :to="item.path"
                    v-if="index != 0 && index != breadcrumbList.length - 1"
                >{{ item.meta.title }}</router-link>
                <span v-else>{{ item.meta.title }}</span>
            </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>

<script>
import routerData from "@/router/routerData";

export default {
    name: "app-breadcrumb",
    computed: {
        breadcrumbList() {
            let menus = [...routerData],
                path = "",
                breadcrum = [];

            this.$route.matched[1].path
                .split("/")
                .splice(1)
                .map((item, _index) => {
                    path += "/" + item;
                    for (let menu of menus) {
                        if (menu.path == path) {
                            breadcrum.push(menu);
                            menus = menu.children;
                            break;
                        }
                    }
                });
            return breadcrum;
        },
    },
};
</script>

<style lang="less" scoped>
.app-breadcrumb {
    display: flex;
    padding: 14px 0px;

    .tips {
        color: rgba(0, 0, 0, 0.45);
    }
}
</style>
