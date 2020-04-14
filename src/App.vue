<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import MetaTags from './mixins/MetaTags.js';

export default {
  name: 'App',
  mixins: [MetaTags],
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'Rethink Work.',
      // all titles will be injected into this template
      titleTemplate: '%s - CryptoTask',
      meta: [
        {
          property: 'og:title',
          content: 'Rethink Work. - CryptoTask',
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
          content: 'CryptoTask',
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
          content: 'Rethink Work. - CryptoTask',
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
};
</script>
