<template>
    <section class="section">
        <pagination
            :page="listQuery.page"
            :has_prev_page="has_prev_page"
            :has_next_page="has_next_page"
            @prev="prev_page"
            @next="next_page"
        ></pagination>
        <div class="list-style-sep Grid">
            <div class="item Cell -c2of10" v-for="(collect, index) in collects" :key="collect.id">
                <div class="box">
                    <div class="img" v-if="collect.image.length > 0">
                        <img :src="collect.image[0]">
                    </div>
                    <div class="content">
                        <div class="title">
                            {{collect.name}}
                        </div>
                        <div class="info">
                            <span>{{collect.create_at}}</span>
                        </div>
                        <div class="function">
                            <m-button size="small" special>编辑</m-button>
                            <m-button size="small" special>删除</m-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
import { listCollect, deleteArticle } from "@/api/collect.js"
export default {
    name: "collect",
    components: {
        Pagination
    },
    data() {
        return {
            listQuery: {
                page: 1,
                per_page: 10
            },
            collects: [],
            count: 0
        }
    },
    created() {
        this.fecthDate();
    },
    methods: {
        fecthDate() {
            listCollect(this.listQuery).then(response => {
                this.collects = response.data.collects;
                this.count = response.data.count;
                console.log(response)
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
}
</style>
