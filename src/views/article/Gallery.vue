<template>
    <section class="section">
        <div class="function">
            <!-- <m-button>上传</m-button> -->
            <vue-core-image-upload
                :class="['m-button small']"
                :crop="false"
                @imageuploaded="imageuploaded"
                text="上传"
                :headers="headers"
                :url="upload_url">
            </vue-core-image-upload>
        </div>
        <pagination
            :page="listQuery.page"
            :has_prev_page="has_prev_page"
            :has_next_page="has_next_page"
            @prev="prev_page"
            @next="next_page"
        ></pagination>
        <div class="list">
            <div class="item" v-for="media in medias" :key="media.id">
                <div class="box">
                    <div class="thumb">
                        <img :src="media.url + '?imageView2/1/w/280/h/200/q/75'">
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
import Pagination from "@/components/common/Pagination";
import VueCoreImageUpload from "vue-core-image-upload";
import { listMedia, detailMedia } from "@/api/media";
import { API_BASE_URL } from "@/config.js";
import LocalStore from "store";
export default {
    name: "Gallery",
    components: {
        Pagination,
        VueCoreImageUpload
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
            },
            headers: {
                token: LocalStore.get("token")
            },
            upload_url: API_BASE_URL + "/console/media"
        };
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
        },
        imageuploaded(res) {
            // if (res.errcode == 0) {
            //   this.src = 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png';
            // }
            console.log(res);
            if (res.success) {
                this.page = 1;
                this.fecthDate();
            }
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
