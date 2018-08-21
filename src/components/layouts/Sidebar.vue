<template>
    <nav class="sidebar">
        <ul class="sidebar-content">
            <li v-for="route in routes" class="group">
                <div v-if="!route.hidden&&route.meta" class="group-title">
                    <m-icon v-if="route.meta&&route.meta.icon" :icon-class="route.meta.icon"/>
                    {{route.meta.title}}
                </div>
                <ul v-if="!route.hidden">
                    <li
                        v-for="child in route.children" v-if="!child.hidden&&child.meta"
                        :class="[child.name == $route.name ? 'active': '']"
                    >
                        <router-link :to="{name: child.name}">
                            <m-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"/>
                            {{child.meta.title}}
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    name: "sidebar",
    created() {

    },
    methods: {
        linkTo(name) {
            //this.$router.push({name: name})
        }
    },
    computed: {
        routes() {
            const routes = this.$router.options.routes;
            return routes;
        }
    }
}
</script>
<style lang="stylus" scoped>
.sidebar {
    width: 256px;
    flex: 0 0 auto;
    border-right: 1px solid #F5F5F5;

    ul {
        list-style: none;
        padding-left: 0;
    }

    li {
        padding-left: 0;
    }

    .sidebar-content {
        margin-top: 2.4rem;

        .group {
            .group-title {
                padding-left: 20px;
                color: #999999;
            }

            ul {
                li {
                    a {
                        padding: 5px 0 5px 40px;
                        color: #61686b;
                        height: 100%;
                        width: 100%;
                        display: block;
                        border-left: solid 4px #ffffff;

                        &:hover {
                            background-color: #eee;
                            transition: border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
                            border-left: solid 4px #f58500;
                        }

                        &.router-link-exact-active {
                            border-left: solid 4px #17aa56 !important;
                        }
                    }
                }
            }
        }
    }
}

</style>
