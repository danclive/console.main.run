<template>
    <section class="section">
        <div class="page">
            <span><m-button @click="prev_page" :disabled="!has_prev_page">上一页</m-button></span>
            <span>第{{listQuery.page}}页</span>
            <span><m-button @click="next_page" :disabled="!has_next_page">下一页</m-button></span>
        </div>
        <div class="articles">
            <article class="article" v-for="(article, index) in articles" :key="article.id">
                <!-- <div class="article-img">
                    <img src="https://cdn1.01io.com/temp/1.png">
                </div> -->
                <div class="article-content">
                    <div class="article-title">
                        {{article.title}}
                    </div>
                    <div class="article-info">
                        <span>{{article.create_at}}</span>
                        <span>分类: XXX</span>
                        <span>文集: XXX</span>
                        <span>浏览: XXX</span>
                    </div>
                    <div class="article-function">
                        <!-- <m-button size="small" special>预览</m-button> -->
                        <m-button size="small" special @click="$router.push({name: 'article_edit', params: {id: article.id}})">编辑</m-button>
                        <m-button size="small" special @click="restore_item(article.id, index)">还原</m-button>
                    </div>
                </div>
            </article>
        </div>
        <div class="page">
            <span><m-button @click="prev_page" :disabled="!has_prev_page">上一页</m-button></span>
            <span>第{{listQuery.page}}页</span>
            <span><m-button @click="next_page" :disabled="!has_next_page">下一页</m-button></span>
        </div>
    </section>
</template>

<script>
import { listArticle, restoreArticle } from "@/api/article.js";
export default {
    name: "article_index",
    data() {
        return {
            listQuery: {
                page: 1,
                per_page: 10,
                status: 3
            },
            articles: [],
            count: 0
        }
    },
    created() {
        this.fecthDate();
    },
    methods: {
        fecthDate() {
            listArticle(this.listQuery).then(response => {
                //console.log(response)
                this.articles = response.data.articles;
                this.count = response.data.count;
            });
        },
        next_page() {
            this.listQuery.page += 1;
            this.fecthDate();
        },
        prev_page() {
            this.listQuery.page -= 1;
            this.fecthDate();
        },
        restore_item(id, index) {
            restoreArticle(id).then(response => {
                this.articles.splice(index, 1);
            });
        }
    },
    computed: {
        has_next_page() {
            if (this.listQuery.page * this.listQuery.per_page >= this.count) {
                return false;
            } else {
                return true;
            }
        },
        has_prev_page() {
            if (this.listQuery.page === 1) {
                return false;
            } else {
                return true;
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.section {
    height: 100%;
    
    .function {
        //margin-bottom: 10px;
    }
    
    .page {
        margin-top: 10px;
        text-align: center;
        
        span {
            margin: 0 5px 0 5px;
        }
    }
    
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
                //background-color: #ff6600;
                
                .article-title {

                }
                
                // .article-description {
                //     font-size: 1.4rem;
                //     color: #999999;
                //     line-height: 1.2;
                //     max-width: 1100px;
                // }
                
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
            
            // .article-function {
            //     width: 168px;
            //     flex: 0 0 auto;
            // }
            
        }
    }
}
</style>
