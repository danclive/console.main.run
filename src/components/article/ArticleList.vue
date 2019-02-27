<template>
    <div class="list">
        <div class="item" v-for="(article, index) in articles" :key="article.id">
            <div class="box">
                <div class="thumb">
                    <img v-if="article.image.length > 0" :src="article.image[0]">
                    <div v-else class="hold"></div>
                </div>
                <div class="content">
                    <div class="title">
                        {{article.title}}<span v-if="article.status==2"> [草稿]</span>
                    </div>
                    <div class="info">
                        <span>{{article.create_at}}</span>
                    </div>
                    <!-- <div class="info">
                        <span>{{article.create_at}}</span>
                    </div> -->
                </div>
                <div class="function">
                    <div class="el">
                        <m-button size="small" v-if="edit" @click="click_edit(article.id)">编辑</m-button>
                    </div>
                    <div class="el">
                        <m-button size="small" v-if="remove" @click="click_remove(article.id, index)">删除</m-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ArticleList",
    props: {
        articles: {
            type: Array,
            default: function() {
                return [];
            }
        },
        edit: Boolean,
        remove: Boolean,
        restore: Boolean
    },
    methods: {
        click_edit(id) {
            this.$emit("edit", id);
        },
        click_remove(id, index) {
            this.$emit("remove", { id: id, index: index });
        },
        click_restore(id, index) {
            this.$emit("restore", { id: id, index: index });
        }
    }
};
</script>
<style lang="stylus" scoped>

</style>
