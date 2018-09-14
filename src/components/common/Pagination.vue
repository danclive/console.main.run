<template>
    <div class="page">
        <span><m-button @click="prev_page" :disabled="!has_prev_page">上一页</m-button></span>
        <span>第{{page}}页</span>
        <span><m-button @click="next_page" :disabled="!has_next_page">下一页</m-button></span>
    </div>
</template>
<script>
export default {
    name: "Pagination",
    props: {
        page: {
            type: [String, Number],
            default: 1
        },
        has_prev_page: Boolean,
        has_next_page: Boolean
    },
    methods: {
        prev_page(event) {
            this.$emit("prev", event)
        },
        next_page(event) {
            this.$emit("next", event)
        }
    }
}
</script>
<style lang="stylus" scoped>
.page {
    text-align: center;
    
    span {
        margin: 0 5px 0 5px;
    }
}
</style>
