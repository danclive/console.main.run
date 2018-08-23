<template>
    <section class="section">
        <div class="function">
            
        </div>
        <div class="editor" :class="isFocus ? 'focus': ''">
            <code-mirror v-model="content" :options="editorOption" @inputRead="refresh" @focus="focus" @blur="blur"></code-mirror>
        </div>
    </section>
</template>

<script>
import CodeMirror from "@/components/article/CodeMirror";
require("codemirror/keymap/sublime.js");

export default {
    name: "edit",
    components: {
        CodeMirror
    },
    data() {
        return {
            content: '',
            editorOption: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: false,
                line: true,
                mode: "text/x-markdown",
                theme: "paraiso-light2",
                lineWrapping: true,
                keyMap: "sublime",
                highlightFormatting: true
            },
            isFocus: false
        }
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
        }
    },
    watch: {
        content(val, oldVal) {

        }
    },
    mounted() {
        //hljs.initHighlightingOnLoad();
    }
};
</script>

<style lang="stylus" scoped>
.section {
    height: 100%;
    
    .editor {
        box-shadow: inset 0 0 0 1px #F5F5F5;
        transition: box-shadow 0.15s ease-in-out;
        padding: 10px;
        
        &.focus {
            box-shadow: inset 0 0 0 1px #f29e0d;
        }
    }
}
</style>
<style>
.cm-s-paraiso-light2.CodeMirror { 
    //background: #e7e9db; 
    color: #41323f;
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

</style>
