import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Main from "@/components/layouts/Main.vue";
import LocalStore from "store";

Vue.use(Router);

const router = new Router({
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
    routes: [
        {
            path: "/",
            //name: "home",
            component: Main,
            meta: {
                title: "控制台",
                icon: "form"
            },
            children: [
                {
                    path: "/",
                    name: "home",
                    component: () => import("@/views/Home"),
                    meta: {
                        title: "首页",
                        icon: ""
                    }
                }
            ]
        }, {
            path: "/article",
            //name: "article",
            component: Main,
            meta: {
                title: "内容管理",
                icon: "form"
            },
            children: [
                {
                    path: "/",
                    name: "article_index",
                    component: () => import("@/views/article/Index"),
                    meta: {
                        title: "文章",
                        icon: "form"
                    }
                }, {
                    path: "edit",
                    name: "article_new",
                    hidden: true,
                    component: () => import("@/views/article/Edit"),
                    meta: {
                        title: "新建",
                        icon: "form"
                    }
                }, {
                    path: "edit/:id([a-z0-9]{24})",
                    name: "article_edit",
                    hidden: true,
                    component: () => import("@/views/article/Edit"),
                    meta: {
                        title: "编辑",
                        icon: "form"
                    }
                }, {
                    path: "recycle",
                    name: "recycle",
                    hidden: true,
                    component: () => import("@/views/article/Recycle"),
                    meta: {
                        title: "回收站",
                        icon: "form"
                    }
                }, {
                    path: "collect",
                    name: "collect",
                    component: () => import("@/views/article/Collect"),
                    meta: {
                        title: "专题",
                        icon: "form"
                    }
                }, {
                    path: "gallery",
                    name: "gallery",
                    component: () => import("@/views/article/Gallery"),
                    meta: {
                        title: "图库",
                        icon: "form"
                    }
                }
            ]
        }, {
            path: "/statistics",
            //name: "statistics",
            component: Main,
            meta: {
                title: "统计分析",
                icon: ""
            },
            children: [
                {
                    path: "/",
                    name: "statistics_index",
                    component: () => import("@/views/Home.vue"),
                    meta: {
                        title: "用户留存",
                        icon: "form"
                    }
                }, {
                    path: "index2",
                    name: "statistics_index2",
                    component: () => import("@/views/Home.vue"),
                    meta: {
                        title: "流失用户",
                        icon: "form"
                    }
                }
            ]
        }, {
            path: "/login",
            name: "login",
            component: () => import("@/views/Login.vue")
        }, {
            path: "*",
            name: "404",
            component: Main,
            hidden: true
        }
    ]
});

router.beforeEach((to, form, next) => {
    if (to.name !== "login") {
        if (!LocalStore.get("token")) {
            next({
                path: "/login"
            })
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
