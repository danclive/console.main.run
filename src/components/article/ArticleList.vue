<template>
    <div class="articles">
        <article class="article" v-for="(article, index) in articles" :key="article.id">
            <div class="article-img" v-if="article.image.length > 0">
                <img :src="article.image[0]">
            </div>
            <div class="article-content">
                <div class="article-title">
                    {{article.title}}<span v-if="article.status==2"> [草稿]</span>
                </div>
                <div class="article-info">
                    <span>{{article.create_at}}</span>
                    <!-- <span>文集: XXX</span>
                    <span>浏览: XXX</span> -->
                </div>
                <div class="article-function">
                    <m-button size="small" special v-if="preview" @click="click_preview(article.id)">预览</m-button>
                    <m-button size="small" special v-if="edit" @click="click_edit(article.id)">编辑</m-button>
                    <m-button size="small" special v-if="remove" @click="click_remove(article.id, index)">删除</m-button>
                    <m-button size="small" special v-if="restore" @click="click_restore(article.id, index)">还原</m-button>
                </div>
            </div>
        </article>
    </div>
</template>
<script>
export default {
    name: "ArticleList",
    props: {
        articles: {
            type: Array,
            default: []
        },
        preview: Boolean,
        edit: Boolean,
        remove: Boolean,
        restore: Boolean
    },
    methods: {
        click_preview(id) {
            this.$emit("preview", id);
        },
        click_edit(id) {
            this.$emit("edit", id);
        },
        click_remove(id, index) {
            this.$emit("remove", {id: id, index: index})
        },
        click_restore(id ,index) {
            this.$emit("restore", {id: id, index: index})
        }
    }
}
</script>
<style lang="stylus" scoped>
.articles {
    .article {
        height: 100px;
        margin-top: 10px;
        padding: 3px;
        box-shadow: inset 0 0 0 1px #F5F5F5;
        //cursor: pointer;
        display: flex;
        transition: box-shadow 0.15s ease-in-out;

        &:hover {
            box-shadow: inset 0 0 0 1px #f29e0d;
                
            .article-function {
                opacity: 1 !important;
            }
        }
            
        .article-img {
            width: 168px;
            flex: 0 0 auto;
                
            img {
                height: 100%;
                width: 100%;
            }
        }
            
        .article-content {
            flex: 1 0 auto;
            padding-left: 10px;

            .article-title {
                span {
                    color: #999999;
                }
            }
                
            .article-info {
                font-size: 1.4rem;
                color: #999999;
                padding: 4px 0 4px 0;
                    
                span {
                    margin-right: 10px;
                }
            }
                
            .article-function {
                opacity: 0.5;
                transition: opacity 0.3s ease-in-out;
                    
                button {
                    margin-right: 4px;
                }
            }
        }
    }
}
</style>
