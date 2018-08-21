<template>
    <header class="header">
        <div class="logo">
            MAIN.RUN
        </div>
        <div class="setting">
            <m-button>注销</m-button>
        </div>
    </header>
</template>
<script>
export default {
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            //console.log(this.$store.state.user.id)
        }
    }
}
</script>

<style lang="stylus" scoped>
.header {
    flex: 0 0 auto;
    height: 65px;
    border-bottom: 1px solid #F5F5F5;
    display: flex;
    
    .logo {
        flex: 0 0 auto;
        width: 256px;
        text-align: center;
        line-height: 65px;
        font-size: 3rem;
        //background-color: #ff6600;
    }

    .setting {
        flex: 1 0 auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 65px;
    }
}
</style>