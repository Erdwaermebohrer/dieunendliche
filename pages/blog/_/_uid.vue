<template>
  <div :class="'page page__' + uid">
    <slices-wrapper :slices="slices" :page="page" />
  </div>
</template>

<script>
import SlicesWrapper from "../../../components/prismic/SlicesWrapper.vue";

export default {
  name: "blog-post",
  components: {
    "slices-wrapper": SlicesWrapper,
  },
  head() {
    return {
      title: this.$prismic.asText(this.page.meta_title)
        ? this.$prismic.asText(this.page.meta_title)
        : "CRU Scaffold",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$prismic.asText(this.page.meta_description)
            ? this.$prismic.asText(this.page.meta_description)
            : "CRU Scaffold",
        },
        {
          hid: "og:image",
          name: "image",
          property: "og:image",
          content: this.page.og_image ? this.page.og_image.url : "",
        },
        {
          hid: "og:title",
          name: "title",
          property: "og:title",
          content: this.$prismic.asText(this.page.meta_title)
            ? this.$prismic.asText(this.page.meta_title)
            : "CRU Scaffold",
        },
        {
          hid: "og:description",
          name: "description",
          property: "og:description",
          content: this.$prismic.asText(this.page.meta_description)
            ? this.$prismic.asText(this.page.meta_description)
            : "CRU Scaffold",
        },
      ],
    };
  },
  data() {
    return {
      page: [],
      slices: [],
      uid: "post",
    };
  },
  mounted() {
    if (this.page) {
      var originalLocation = localStorage.getItem('originalLocation');
      if(!originalLocation){
        originalLocation = document.location.protocol+'//'+
          document.location.hostname+
          document.location.pathname+
          document.location.search;
        localStorage.setItem('originalLocation',originalLocation);
      }

      window.dataLayer.push({
        event: "pageview",
        title: this.$prismic.asText(this.page.data.meta_title)
          ? this.$prismic.asText(this.page.data.meta_title)
          : "Nelly Solutions",
        uid: this.uid,
        originalLocation: originalLocation
      });
    }
  },
  async asyncData({ $prismic, params, error }) {
    try {
      var slug = params.uid;
      const result = await $prismic.api.getByUID("blog_post", slug);
      return {
        page: result,
        slices: result.data.body,
        uid: slug,
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>
