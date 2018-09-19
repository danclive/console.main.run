<template>
    <section class="section">
        <pagination
            :page="listQuery.page"
            :has_prev_page="has_prev_page"
            :has_next_page="has_next_page"
            @prev="prev_page"
            @next="next_page"
        ></pagination>
        <!-- <div class="collects">
            <div class="collect" v-for="(collect, index) in collects" :key="collect.id">
                <div class="collect-img" v-if="collect.image.length > 0">
                    <img :src="collect.image[0]">
                </div>
                <div class="collect-content">
                    <div class="collect-title">
                        {{collect.name}}
                    </div>
                    <div class="collect-info">
                        <span>{{collect.create_at}}</span>
                    </div>
                    <div class="collect-function">
                        <m-button size="small" special>编辑</m-button>
                        <m-button size="small" special>删除</m-button>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="collects Grid">
            <div class="collect Cell -c2of10">
                <div class="box">
                    <div class="img">
                        <img src="https://cdn.danclive.com/upload/FgJ-uotLV4XUXkTR84zIBA-zD8TJ.png">
                    </div>
                </div>
            </div>
            <div class="collect Cell -c2of10">
                <div class="box">
                    <div class="img">
                        <img src="https://cdn.danclive.com/upload/FgJ-uotLV4XUXkTR84zIBA-zD8TJ.png">
                    </div>
                </div>
            </div>
            <div class="collect Cell -c2of10">
                <div class="box">
                    <div class="img">
                        <img src="https://cdn.danclive.com/upload/FgJ-uotLV4XUXkTR84zIBA-zD8TJ.png">
                    </div>
                </div>
            </div>
            <div class="collect Cell -c2of10">
                <div class="box">
                    <div class="img">
                        <img src="https://cdn.danclive.com/upload/FgJ-uotLV4XUXkTR84zIBA-zD8TJ.png">
                    </div>
                </div>
            </div>
            <div class="collect Cell -c2of10">
                <div class="box">
                    <div class="img">
                        <img src="https://cdn.danclive.com/upload/FgJ-uotLV4XUXkTR84zIBA-zD8TJ.png">
                    </div>
                </div>
            </div>
            <div class="collect Cell -c2of10">
                <div class="box">
                    <div class="img">
                        <img src="https://cdn.danclive.com/upload/FgJ-uotLV4XUXkTR84zIBA-zD8TJ.png">
                    </div>
                </div>
            </div>
            <div class="collect Cell -c2of10">
                <div class="box">
                    <div class="img">
                        <img src="https://cdn.danclive.com/upload/FgJ-uotLV4XUXkTR84zIBA-zD8TJ.png">
                    </div>
                </div>
            </div>
        </div>
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
/*
.collects {
    .collect {
        height: 100px;
        display: flex;
        padding: 3px;
        box-shadow: inset 0 0 0 1px #F5F5F5;
        margin-top: 10px;

        &:hover {
            box-shadow: inset 0 0 0 1px #f29e0d;
            
            .collect-function {
                opacity: 1 !important;
            }
        }

        .collect-img {
            width: 168px;
            flex: 0 0 auto;
            
            img {
                height: 100%;
                width: 100%;
            }
        }
        
        .collect-content {
            flex: 1 0 auto;
            padding-left: 10px;
            
            .collect-title {
                span {
                    color: #999999;
                }
            }
            
            .collect-description {
                color: #999999;
            }
            
            .collect-info {
                font-size: 1.4rem;
                color: #999999;
                padding: 4px 0 4px 0;
                    
                span {
                    margin-right: 10px;
                }
            }
            
            .collect-function {
                opacity: 0.5;
                transition: opacity 0.3s ease-in-out;
                    
                button {
                    margin-right: 4px;
                }
            }
        }
    }
}
*/
.collects {
    // display: flex;
    // flex-flow: row wrap;
    // align-content: flex-start;
    
    .collect {
        //flex: 0 0 auto;
        padding: 5px;
        //width: calc(100% * 1 / 12);
        //width: 300px;
        
        .box {
            padding: 3px;
            box-shadow: inset 0 0 0 1px #F5F5F5;
            transition: box-shadow 0.15s ease-in-out;
            
            &:hover {
                box-shadow: inset 0 0 0 1px #f29e0d;
            }
            
            .img {
                width: 100%;
                
                img {
                    max-width: 100%;
                    height: auto;
                }
            }
        }
    }
}
</style>
