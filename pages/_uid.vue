<template>
  <div id="page" :class="'page page__' + uid">
    <background-images :images="selectedBackgroundImages" />
    <slice-wrapper
      :slices="slices"
      :redirectToExternalPage="redirectToExternalPage"
      :redirectToInternalPage="redirectToInternalPage"
      :sendingForm="sendingForm"
    />
  </div>
</template>

<script>
import BackgroundImages from "../components/layout/BackgroundImages.vue";
import SliceWrapper from "../components/prismic/SlicesWrapper.vue";

export default {
  components: {
    "background-images": BackgroundImages,
    "slice-wrapper": SliceWrapper,
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
          content: this.page.og_image.url ? this.page.og_image.url : "",
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
  watch: {
    "$route.params": {
      handler(value) {
        this.selectedBackgroundImages = this.backgrondImages[value.uid];
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      backgrondImages: {
        about: {
          desktop: [
            {
              image: "bg-01.jpg",
            },
            {
              image: "bg-02.jpg",
            },
            {
              image: "bg-03.jpg",
            },
          ],
          mobile: [
            {
              image: "bg-01.jpg",
            },
          ],
        },
        endkunden: {
          desktop: [
            {
              image: "bg-01.jpg",
            },
            {
              image: "bg-02.jpg",
            },
            {
              image: "bg-03.jpg",
            },
          ],
          mobile: [
            {
              image: "bg-01.jpg",
            },
            {
              image: "bg-02.jpg",
            },
            {
              image: "bg-03.jpg",
            },
          ],
        },
        fachpartner: {
          desktop: [
            {
              image: "bg-01.jpg",
            },
            {
              image: "bg-02.jpg",
            },
            {
              image: "bg-03.jpg",
            },
          ],
          mobile: [
            {
              image: "bg-01.jpg",
            },
            {
              image: "bg-02.jpg",
            },
            {
              image: "bg-03.jpg",
            },
          ],
        },
        datenschutz: {
          desktop: [
            {
              image: "bg-01.jpg",
            },
            {
              image: "bg-02.jpg",
            },
            {
              image: "bg-03.jpg",
            },
          ],
          mobile: [
            {
              image: "bg-01.jpg",
            },
            {
              image: "bg-02.jpg",
            },
            {
              image: "bg-03.jpg",
            },
          ],
        },
        impressum: {
          desktop: [
            {
              image: "bg-01.jpg",
            },
            {
              image: "bg-02.jpg",
            },
            {
              image: "bg-03.jpg",
            },
          ],
          mobile: [
            {
              image: "bg-01.jpg",
            },
            {
              image: "bg-02.jpg",
            },
            {
              image: "bg-03.jpg",
            },
          ],
        },
      },
      page: [],
      slices: [],
      uid: "internal",
      selectedBackgroundImages: null,
    };
  },
  methods: {
    redirectToInternalPage(item) {
      this.$router.push(this.$prismic.linkResolver(item.link));
    },
    redirectToExternalPage(item) {
      window.open(item.url, "_blank").focus();
    },
    sendingForm(form) {
      //process request here
      console.log(form);
    },
    smoothScroll(id) {
      document.getElementById(id).scrollIntoView();
    },
  },
  mounted() {
    setTimeout(() => {
      this.smoothScroll("page");
    }, 10);
  },
  async asyncData({ $prismic, params, error }) {
    try {
      const result = await $prismic.api.getByUID("page", params.uid);
      return {
        page: result.data,
        slices: result.data.body,
        uid: params.uid,
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>