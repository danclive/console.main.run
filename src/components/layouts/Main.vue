<template>
    <div class="main">
        <my-header></my-header>
        <div class="content">
            <sidebar></sidebar>
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
import MyHeader from "./Header";
import MyFooter from "./Footer";
import Sidebar from "./Sidebar";

export default {
    components: {
        MyHeader,
        MyFooter,
        Sidebar
    }
};
</script>

<style lang="stylus" scoped>
.main {
    position: relative;
    min-height: 100%;
    display: flex;
    flex-direction: column;

    .content {
        flex: 1 0 auto;
        display: flex;

        .container {
            flex: 1 0 auto;
            width: 0;
            padding: 10px;
        }
    }
}
</style>
