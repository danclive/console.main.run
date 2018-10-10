<template>
    <section class="section">
        <div class="box">
            <div class="function">
                <m-button class="" special size="small" @click="button1click" v-show="button1">发布</m-button>
                <m-button class="" special size="small" @click="button2click" v-show="button2">更新</m-button>
                <m-button class="" special size="small" @click="button3click" v-show="button3">保存草稿</m-button>
                <m-button class="" special size="small" @click="openPreview">预览</m-button>
            </div>
        </div>
        <div class="box">
            <div class="title">
                <m-input type="text" v-model="article.title" placeholder="标题"></m-input>
            </div>
            <div class="description">
                <m-textarea :rows="5" class="m-textarea" v-model="article.summary" placeholder="摘要"></m-textarea>
            </div>
        </div>
        <div class="box">
            <!-- <div class="thumb">
                <div class="form">
                    <div class="field half first">
                        <label>封面图1</label>
                        <m-input size="small" special lable="标题" v-model="article.image[0]"></m-input>
                        <div class="image">
                            <img :src="article.image[0]">
                        </div>
                    </div>
                    <div class="field half">
                        <label>封面图2</label>
                        <m-input size="small" special lable="标题" v-model="article.image[1]"></m-input>
                        <div class="image">
                            <img :src="article.image[1]">
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div> -->
        </div>
        <div class="box">
            <div class="editor">
                <code-mirror v-model="article.content" :options="editorOption" @inputRead="refresh" @focus="focus" @blur="blur"></code-mirror>
            </div>
        </div>
        <div class="preview" v-if="canPreview">
            <div class="preview-main">
                <div class="close"><m-button class="" special size="small" @click="colsePreview">关闭</m-button></div>
                <div class="title"><h1>{{article.title}}</h1></div>
                <div class="content" v-html="renderHtml"></div>
            </div>
        </div>
        <!-- <div class="section-content">
            <div class="wrapper">
                <div class="title">
                    <label>标题</label>
                    <m-input size="big" special lable="标题" v-model="article.title"></m-input>
                </div>
                <div class="description">
                    <label>摘要</label>
                    <m-textarea v-model="article.summary"></m-textarea>
                </div>
                <label>正文</label>
                <div class="editor" :class="isFocus ? 'focus': ''">
                    <code-mirror v-model="article.content" :options="editorOption" @inputRead="refresh" @focus="focus" @blur="blur"></code-mirror>
                </div>
            </div>
        </div>
        <div class="section-function">
            <m-button class="fit" special @click="button1click" v-show="button1">发布</m-button>
            <m-button class="fit" special @click="button2click" v-show="button2">更新</m-button>
            <m-button class="fit" special @click="button3click" v-show="button3">保存草稿</m-button>
            <m-button class="fit" special>预览</m-button>
        </div> -->
    </section>
</template>

<script>
import CodeMirror from "@/components/article/CodeMirror";
require("codemirror/keymap/sublime.js");
require("codemirror/addon/scroll/simplescrollbars.js");
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import { detailArticle, newArticle, updateArticle } from "@/api/article.js";

export default {
    name: "edit",
    components: {
        CodeMirror
    },
    data() {
        return {
            editorOption: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: true,
                mode: "gfm",
                theme: "paraiso-light2",
                lineWrapping: true,
                keyMap: "sublime",
                highlightFormatting: true,
                scrollbarStyle: "simple",
                inputStyle: "contenteditable"
            },
            isFocus: false,
            isUpdate: false,
            article: {
                id: "",
                title: "",
                image: [],
                content: "",
                summary: "",
                collects: [],
                status: 0
            },
            button1: false,
            button2: false,
            button3: false,
            renderHtml: '',
            canPreview: false
        }
    },
    created() {
        this.create();
    },
    mounted() {

        document.onkeydown=function (e) { 
            e=window.event||e;
            var key=e.keyCode;
            if(key== 83 && e.ctrlKey){
                /*延迟，兼容FF浏览器  */
                setTimeout(function(){
                    //alert('ctrl+s'); 
                },1); 
                    
                return false;      
            }    
        };
    },
    methods: {
        refresh(editor) {
            editor.refresh();
        },
        focus(editor) {
            this.isFocus = true;
        },
        blur(editor) {
            this.isFocus = false;
        },
        create() {
            const article_id = this.$route.params.id;

            if (article_id) {
                this.isUpdate = true;
                this.article.id = article_id;
                this.fetchData()
            } else {
                this.isUpdate = false;
                this.button1 = true;
                this.button3 = true;
            }
        },
        fetchData() {
            detailArticle(this.article.id).then(response => {
                this.article = response.data;

                this.button1 = false;
                this.button3 = false;

                if (this.article.status == 0) {
                    this.button2 = true;
                } else if (this.article.status == 2) {
                    this.button1 = true;
                    this.button3 = true;
                }
            });
        },
        button1click() {
            this.article.status = 0;

            if (this.article.id) {
                updateArticle(this.article.id, this.article).then(response => {
                    //console.log(response)
                    //this.$router.push({name: "article_edit", params: {id: response.data.article_id}});
                });
            } else {
                newArticle(this.article).then(response => {
                    //console.log(response)
                    this.$router.push({name: "article_edit", params: {id: response.data.article_id}});
                });
            }

            //this.create();
        },
        button2click() {
            updateArticle(this.article.id, this.article).then(response => {
                //console.log(response)
                //this.$router.push({name: "article_edit", params: {id: response.data.article_id}});
            });

            //this.create();
        },
        button3click() {
            if (this.article.id) {
                updateArticle(this.article.id, this.article).then(response => {
                    //console.log(response)
                    //this.$router.push({name: "article_edit", params: {id: response.data.article_id}});
                });
            } else {
                this.article.status = 2;

                newArticle(this.article).then(response => {
                    //console.log(response)
                    this.$router.push({name: "article_edit", params: {id: response.data.article_id}});
                });
            }

            //this.create();
        },
        openPreview() {
            const md = new MarkdownIt({
                html: true,
                typographer:  true,
                highlight: function(str, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return (
                                '<pre class="hljs"><code>' +
                                hljs.highlight(lang, str, true).value +
                                "</code></pre>"
                            );
                        } catch (__) {}
                    }

                    // return (
                    //   '<pre class="hljs"><code>' +
                    //   md.utils.escapeHtml(str) +
                    //   "</code></pre>"
                    // );
                    //return hljs.highlightAuto(str).value;
                    return (
                        '<pre class="hljs"><code>' +
                        hljs.highlightAuto(str).value +
                        "</code></pre>"
                    );
                }
            });

            this.renderHtml = md.render(this.article.content);
            this.canPreview = true;
        },
        colsePreview() {
            this.canPreview = false;
        }
    },
    watch: {
        "$route" (val, old) {
            const article_id = this.$route.params.id;

            if (article_id) {
                this.isUpdate = true;
                this.article.id = article_id;
                this.fetchData()
            } else {
                this.isUpdate = false;
                this.button1 = true;
                this.button3 = true;
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.section {
    height: 100%;
    
    .box {
        
        .function {
            border-bottom: 1px solid #F5F5F5;
            padding: 10px 0;
            
            button {
                margin-right: 4px;
            }
        }
        
        .title {
            input {
                box-shadow: none;
                border-bottom: 1px solid #F5F5F5;
            }
        }
        
        .description {
            textarea {
                box-shadow: none;
                border-bottom: 1px solid #F5F5F5;
            }
        }
        
        .thumb {
            border-bottom: 1px solid #F5F5F5;
            
            .image {
                padding: 5px 0 0 0;
                img {
                    max-width: 20%;
                }
            }
        }
        
        .editor {
            font-size: 1.6rem;
        }
    }
    
    .preview {
        position: fixed;
        background-color: rgba(0, 0, 0, 0.4);
        height: 100%;
        width: 100%;
        top: 0;
        right: 0;
        z-index: 999;
        
        .preview-main {
            position: relative;
            margin: 0 auto;
            max-width: 1200px;
            height: 100%;
            background: #ffffff;
            overflow-y: auto;
            padding: 10px;
            
            .close {
                position: absolute;
                right: 10px;
            }
            
            .title {
                text-align: center;
            }
            
            .content {
                img {
                    max-width: 100%;
                }
            }
        }
    }

    //display: flex;
    
    // .section-content {
    //     flex: 1 0 auto;

    //     .wrapper {
    //         margin: 0 auto;
    //         width: 760px;

    //         .editor {
    //             box-shadow: inset 0 0 0 1px rgba(252, 173, 38, .5);
    //             transition: box-shadow 0.15s ease-in-out;
    //             padding: 10px;
                
    //             &.focus {
    //                 box-shadow: inset 0 0 0 1px #f29e0d;
    //             }
    //         }
    //     }
    // }
    
    // .section-function {
    //     //background: #ff6600;
    //     flex: 0 0 auto;
    //     width: 300px;
    // }
}

</style>
<style>
.cm-s-paraiso-light2.CodeMirror { 
    //background: #e7e9db; 
    color: #41323f;
    //height: 760px;
}
.cm-s-paraiso-light2 div.CodeMirror-selected {
    background: #b9b6b0;
}
.cm-s-paraiso-light2 .CodeMirror-line::selection, .cm-s-paraiso-light2 .CodeMirror-line > span::selection, .cm-s-paraiso-light2 .CodeMirror-line > span > span::selection { background: #b9b6b0; }
.cm-s-paraiso-light2 .CodeMirror-line::-moz-selection, .cm-s-paraiso-light2 .CodeMirror-line > span::-moz-selection, .cm-s-paraiso-light2 .CodeMirror-line > span > span::-moz-selection { background: #b9b6b0; }
.cm-s-paraiso-light2 .CodeMirror-gutters {
    //background: #e7e9db;
    background: #fff;
    border-right: 0px;
}
.cm-s-paraiso-light2 .CodeMirror-guttermarker { color: black; }
.cm-s-paraiso-light2 .CodeMirror-guttermarker-subtle { color: #8d8687; }
.cm-s-paraiso-light2 .CodeMirror-linenumber {
    color: #8d8687;
}
.cm-s-paraiso-light2 .CodeMirror-cursor { border-left: 1px solid #776e71; }

.cm-s-paraiso-light2 span.cm-comment { color: #e96ba8; }
.cm-s-paraiso-light2 span.cm-atom { color: #815ba4; }
.cm-s-paraiso-light2 span.cm-number { color: #815ba4; }

.cm-s-paraiso-light2 span.cm-property, .cm-s-paraiso-light2 span.cm-attribute { color: #48b685; }
.cm-s-paraiso-light2 span.cm-keyword { color: #ef6155; }
.cm-s-paraiso-light2 span.cm-string { color: #fec418; }

.cm-s-paraiso-light2 span.cm-variable { color: #48b685; }
.cm-s-paraiso-light2 span.cm-variable-2 { color: #06b6ef; }
.cm-s-paraiso-light2 span.cm-def { color: #f99b15; }
.cm-s-paraiso-light2 span.cm-bracket { color: #41323f; }
.cm-s-paraiso-light2 span.cm-tag { color: #ef6155; }
.cm-s-paraiso-light2 span.cm-link { color: #815ba4; }
.cm-s-paraiso-light2 span.cm-error { background: #ef6155; color: #776e71; }

.cm-s-paraiso-light2 .CodeMirror-activeline-background { background: #CFD1C4; }
.cm-s-paraiso-light2 .CodeMirror-matchingbracket { text-decoration: underline; color: white !important; }


.CodeMirror-simplescroll-horizontal div, .CodeMirror-simplescroll-vertical div {
  position: absolute;
  background: #ccc;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #bbb;
  border-radius: 2px;
}

.CodeMirror-simplescroll-horizontal, .CodeMirror-simplescroll-vertical {
  position: absolute;
  z-index: 6;
  background: #eee;
}

.CodeMirror-simplescroll-horizontal {
  bottom: 0; left: 0;
  height: 8px;
}
.CodeMirror-simplescroll-horizontal div {
  bottom: 0;
  height: 100%;
}

.CodeMirror-simplescroll-vertical {
  right: 0; top: 0;
  width: 8px;
}
.CodeMirror-simplescroll-vertical div {
  right: 0;
  width: 100%;
}
</style>
