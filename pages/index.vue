<template>
  <div :class="'page page__' + uid">
    <h1>{{ uid }} Page</h1>
    <slice-wrapper :slices="slices" />
  </div>
</template>

<script>
import SliceWrapper from '../components/prismic/SlicesWrapper.vue';

export default {
  components: {
    "slice-wrapper": SliceWrapper
  },
  head() {
    return {
      title: this.$prismic.asText(this.page.meta_title) ? this.$prismic.asText(this.page.meta_title): 'CRU Scaffold',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$prismic.asText(this.page.meta_description) ? this.$prismic.asText(this.page.meta_description): 'CRU Scaffold'
        },
        {
          hid: 'og:image',
          name: 'image',
          property: 'og:image',
           content: this.page.og_image.url ? this.page.og_image.url : ''
        },
        {
          hid: 'og:title',
          name: 'title',
          property: 'og:title',
          content: this.$prismic.asText(this.page.meta_title) ? this.$prismic.asText(this.page.meta_title): 'CRU Scaffold',
        },
        {
          hid: 'og:description',
          name: 'description',
          property: 'og:description',
          content: this.$prismic.asText(this.page.meta_description) ? this.$prismic.asText(this.page.meta_description): 'CRU Scaffold'
        }
      ]    
    };
  },
  data() {
    return {
      page: [],
      slices: [],
      uid: 'homepage'
    }
  },
  async asyncData({ $prismic, error }) {
    try {
      const result = await $prismic.api.getByUID('page', 'homepage')
      return {
        page: result.data,
        slices: result.data.body
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
}
</script>