<template>
    <section class="section">
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
            restore @restore="restore"
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
import { listArticle, restoreArticle } from "@/api/article.js";
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
                per_page: 20,
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
        },
        edit(id) {
            this.$router.push({name: "article_edit", params: {id: id}})
        },
        restore(params) {
            restoreArticle(params.id).then(response => {
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
    }  
}
</style>
