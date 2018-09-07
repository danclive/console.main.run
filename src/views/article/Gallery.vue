<template>
    <section class="section">
        <div class="function">
            <m-button>上传</m-button>
        </div>
        <div class="media-list">
            <div class="page">
                <span><m-button @click="prev_page" :disabled="!has_prev_page">上一页</m-button></span>
                <span>第{{listQuery.page}}页</span>
                <span><m-button @click="next_page" :disabled="!has_next_page">下一页</m-button></span>
            </div>
            <div class="list">
                <div class="box" v-for="(media, index) in medias" :key="media.id">
                    <div class="item" :class="{active: media.active}" @click="itemClick(index, media.id)">
                        <img :src="media.url + '?imageView2/1/w/265/h/150/q/75'">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { listMedia, detailMedia } from "@/api/media"
export default {
    name: "gallery",
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
    //display: flex;
    
    .media-list {
        //flex: 0 0 auto;
        margin: 0 auto;
        width: 1200px;
        
        .page {
            text-align: center;
            
            span {
                margin: 0 5px 0 5px;
            }
        }
        
        .list {
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;
            
            .box {
                flex: 0 1 auto;
                width: calc(100% / 5);
                padding: 2px;

                .item {
                    //flex: 0 0 auto;
                    padding: 3px;
                    box-shadow: inset 0 0 0 1px #F5F5F5;
                    transition: box-shadow 0.15s ease-in-out;
                    
                    img {
                        width: 100%;
                        //height: 150px;
                    }
                    
                    &.active {
                        box-shadow: inset 0 0 0 1px #f29e0d;
                    }
                }
            }
        }
    }
    
    .media-info {
        flex: 1 0 auto;
        
        .info {
            width: 100%;
            padding-top: 20px;
            text-align: center;
            img {
                width: 400px;
            }
        }
    }
}
</style>
