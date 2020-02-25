<template>
  <div>
    <label v-if="label">{{label}}</label>
    <ckeditor :editor="editor"
              v-model="editorData"
              :config="editorConfig"
              @ready="prefill"/>
    <validation-messages v-if="validation" :title="placeholder || label" :validation="validation"/>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import UnderlinePlugin from '@ckeditor/ckeditor5-basic-styles/src/underline';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import ValidationMessages from './ValidationMessages.vue';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'WysiwygTextareaGroup',
  components: {
    ValidationMessages,
  },
  data() {
    return {
      editorData: '',
      editor: ClassicEditor,
      editorConfig: {
        plugins: [
          EssentialsPlugin,
          BoldPlugin,
          ItalicPlugin,
          LinkPlugin,
          ParagraphPlugin,
          UnderlinePlugin,
          Alignment,
          CodeBlock,
          Heading,
        ],
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'alignment',
            '|',
            'link',
            'codeBlock',
            '|',
            'undo',
            'redo',
          ],
        },
      },
    };
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: null,
    },
    validation: {
      type: Object,
      default: null,
    },
  },
  computed: {
    state() {
      if (this.validation) {
        return this.validation.$dirty ? !this.validation.$error : null;
      }

      return null;
    },
  },
  watch: {
    editorData() {
      this.$emit('input', this.editorData);
    },
  },
  methods: {
    prefill() {
      this.editorData = this.value || '';
    },
  },
};
</script>

<style>
  .ck-editor__editable {
    min-height: 400px !important;
  }
</style>
