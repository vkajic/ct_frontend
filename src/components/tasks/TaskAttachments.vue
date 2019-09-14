<template>
  <ul v-if="attachments.length">
    <li v-for="a in attachments" :key="a.id">
      <a target="_blank" :href="`http://ct-task-attachments.s3.amazonaws.com/${a.fileName}`">
        {{a.fileName}}
      </a>
    </li>
  </ul>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'TaskAttachments',
  props: {
    attachments: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
