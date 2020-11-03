<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import MetaTags from './mixins/MetaTags';

const defaultLayout = 'main';

export default {
  name: 'App',
  mixins: [MetaTags],
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'Rethink Work.',
      // all titles will be injected into this template
      titleTemplate: '%s - Post Job in under a minute',
      meta: [
        {
          property: 'og:title',
          content: 'Rethink Work. - Post Job in under a minute',
          vmid: 'og:title',
        },
        {
          property: 'og:description',
          content: 'We focus on employers finding the right person for the job quickly, while lowering the entry bar for the freelancers.',
          vmid: 'og:description',
        },
        {
          property: 'og:url',
          content: this.ogSiteUrl,
          vmid: 'og:url',
        },
        {
          property: 'og:site_name',
          content: 'Post Job in under a minute',
          vmid: 'og:site_name',
        },
        {
          property: 'og:image',
          content: this.ogImageUrl,
          vmid: 'og:image',
        },
        {
          property: 'og:image:secure_url',
          content: this.ogImageUrl,
          vmid: 'og:image:secure_url',
        },
        {
          property: 'og:image:width',
          content: '1031',
          vmid: 'og:image:width',
        },
        {
          property: 'og:image:height',
          content: '386',
          vmid: 'og:image:height',
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image',
          vmid: 'twitter:card',
        },
        {
          property: 'twitter:title',
          content: 'Rethink Work. - Post Job in under a minute',
          vmid: 'twitter:title',
        },
        {
          property: 'twitter:description',
          content: 'We focus on employers finding the right person for the job quickly, while lowering the entry bar for the freelancers.',
          vmid: 'twitter:description',
        },
        {
          property: 'twitter:image',
          content: this.ogImageUrl,
          vmid: 'twitter:image',
        },
      ],
    };
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || defaultLayout}-layout`;
    },
  },
};
</script>
