import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Main from "@/components/layouts/Main";
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
                    component: () => import("@/views/Home"),
                    meta: {
                        title: "文章管理",
                        icon: "form"
                    }
                }, {
                    path: "edit",
                    name: "article_edit",
                    hidden: true,
                    component: () => import("@/views/Home"),
                    meta: {
                        title: "文章编辑",
                        icon: "form"
                    }
                }, {
                    path: "comment",
                    name: "article_comment",
                    component: () => import("@/views/Home"),
                    meta: {
                        title: "评论管理",
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
                    component: () => import("@/views/Home"),
                    meta: {
                        title: "用户留存",
                        icon: "form"
                    }
                }, {
                    path: "index2",
                    name: "statistics_index2",
                    component: () => import("@/views/Home"),
                    meta: {
                        title: "流失用户",
                        icon: "form"
                    }
                }
            ]
        }, {
            path: "/login",
            name: "login",
            component: () => import("@/views/Login")
        }, {
            path: "*",
            name: "404",
            component: Main,
            hidden: true
        }
        // {
        //     path: "/about",
        //     name: "about",
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () =>
        //       import(/* webpackChunkName: "about" */ "@/views/About.vue")
        // }
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
