import Vue from "vue";
import Router from "vue-router";

import routerData from "./router/routerData";

Vue.use(Router);

//解决重复路由点击控制台报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const recursionMenu = (menus, routers) => {
    menus.forEach(menu => {
        if (menu.path) {
            routers.push({
                path: menu.path,
                name: menu.meta.title,
                component: () => import(`./views${menu.path.replace(/\/:[a-zA-Z0-9]+\??/, "")}/index`),
                meta: menu.meta
            });
        }
        if (menu.children && menu.children.length > 0) {
            recursionMenu(menu.children, routers);
        }
    });
};
const routerChildren = [];
recursionMenu(routerData, routerChildren);

export default new Router({
    //mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/",
            name: "layouts",
            component: () => import("./components/layouts/index.vue"),
            children: [
                // {
                //     path: "/home",
                //     name: "home",
                //     component: () => import("./views/Home.vue")
                // },
                ...routerChildren
            ]
        }
    ]
});
