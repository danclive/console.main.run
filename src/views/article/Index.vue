<template>
    <section class="section">
        <div class="function">
            <m-button>新建</m-button>
        </div>
        <div class="articles">
            <article class="article">
                <div class="article-img">
                    <img src="https://cdn1.01io.com/temp/1.png">
                </div>
                <div class="article-content">
                    <div class="article-title">
                        Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。
                    </div>
                    <div class="article-info">
                        <span>0000-00-00 00:00:00</span>
                        <span>分类: XXX</span>
                        <span>文集: XXX</span>
                        <span>浏览: XXX</span>
                    </div>
                    <div class="article-function">
                        <m-button size="small" special>预览</m-button>
                        <m-button size="small" special>编辑</m-button>
                        <m-button size="small" special>删除</m-button>
                    </div>
                </div>
            </article>
            <article class="article">
                <div class="article-img">
                    <img src="https://cdn1.01io.com/temp/2.png">
                </div>
                <div class="article-content">
                    <div class="article-title">
                        Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。
                    </div>
                    <div class="article-info">
                        <span>0000-00-00 00:00:00</span>
                        <span>分类: XXX</span>
                        <span>文集: XXX</span>
                        <span>浏览: XXX</span>
                    </div>
                    <div class="article-function">
                        <m-button size="small" special>预览</m-button>
                        <m-button size="small" special>编辑</m-button>
                        <m-button size="small" special>删除</m-button>
                    </div>
                </div>
            </article>
            <article class="article">
                <div class="article-img">
                    <img src="https://cdn1.01io.com/temp/3.png">
                </div>
                <div class="article-content">
                    <div class="article-title">
                        Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。
                    </div>
                    <div class="article-info">
                        <span>0000-00-00 00:00:00</span>
                        <span>分类: XXX</span>
                        <span>文集: XXX</span>
                        <span>浏览: XXX</span>
                    </div>
                    <div class="article-function">
                        <m-button size="small" special>预览</m-button>
                        <m-button size="small" special>编辑</m-button>
                        <m-button size="small" special>删除</m-button>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>

<script>
import { login } from "@/api/user.js";
export default {
    name: "article_index",
    methods: {

    }
    //Y3Vyc29yOnYyOpK5MjAxOC0wNC0wOFQxNjoyODozOCswODowMM4HMb0b
};
</script>

<style lang="stylus" scoped>
.section {
    height: 100%;
    
    .function {
        margin-bottom: 10px;
    }
    
    .articles {
        .article {
            height: 100px;
            margin-bottom: 10px;
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
