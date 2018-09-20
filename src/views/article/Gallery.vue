<template>
    <section class="section">
        <div class="function">
            <m-button>上传</m-button>
        </div>
        <pagination
            :page="listQuery.page"
            :has_prev_page="has_prev_page"
            :has_next_page="has_next_page"
            @prev="prev_page"
            @next="next_page"
        ></pagination>
        <div class="list-style-sep Grid">
            <div class="item Cell -c2of10" v-for="(media, index) in medias" :key="media.id">
                <div class="box">
                    <div class="img">
                        <img :src="media.url + '?imageView2/1/w/600/h/256/q/75'">
                    </div>
                    <div class="content">
                        <div class="title">
                            {{media.filename}}
                        </div>
                        <div class="info">
                            {{media.url}}
                        </div>
                        <div class="info">
                            <span>width: {{media.width}}px</span>
                            <span>height: {{media.height}}px</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Pagination from "@/components/common/Pagination"
import { listMedia, detailMedia } from "@/api/media"
export default {
    name: "gallery",
    components: {
        Pagination
    },
    data() {
        return {
            listQuery: {
                page: 1,
                per_page: 20
            },
            medias: [],
            count: 0,
            activeIndex: 0,
            media: {
                id: "",
                filename: "",
                filesize: 0,
                width: 0,
                height: 0,
                url: ""
            }
        }
    },
    created() {
        this.fecthDate();
    },
    methods: {
        fecthDate() {
            listMedia(this.listQuery).then(response => {
                this.medias = response.data.medias;
                this.count = response.data.count;
            });
        },
        fetchDetail(id) {
            detailMedia(id).then(response => {
                this.media = response.data;
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
        itemClick(index, id) {
            const prev_item = this.medias[this.activeIndex];
            prev_item.active = false;
            this.$set(this.medias, this.activeIndex, prev_item);

            const item = this.medias[index];
            item.active = true;
            this.$set(this.medias, index, item);
    
            this.activeIndex = index;

            this.fetchDetail(id);
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
}
</style>
