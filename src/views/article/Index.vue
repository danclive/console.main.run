<template>
    <section class="section">
        <div class="function">
            <m-button @click="$router.push({name: 'article_new'})">新建</m-button><m-button @click="$router.push({name: 'recycle'})">回收站</m-button>
        </div>
        <pagination
            :page="listQuery.page"
            :has_prev_page="has_prev_page"
            :has_next_page="has_next_page"
            @prev="prev_page"
            @next="next_page"
        ></pagination>
        <article-list
            :articles="articles"
            edit @edit="edit"
            remove @remove="remove"
        ></article-list>
        <pagination
            :page="listQuery.page"
            :has_prev_page="has_prev_page"
            :has_next_page="has_next_page"
            @prev="prev_page"
            @next="next_page"
        ></pagination>
    </section>
</template>

<script>
import Pagination from "@/components/common/Pagination"
import ArticleList from "@/components/article/ArticleList"
import { listArticle, deleteArticle } from "@/api/article.js";
export default {
    name: "article_index",
    components: {
        Pagination,
        ArticleList
    },
    data() {
        return {
            listQuery: {
                page: 1,
                per_page: 10
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
        edit(id) {
            this.$router.push({name: "article_edit", params: {id: id}})
        },
        remove(params) {
            deleteArticle(params.id).then(response => {
                this.articles.splice(params.index, 1);
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
        button {
            margin-right: 10px;
        }
    }
    
    .page {
        margin-top: 10px;
    }
}
</style>
