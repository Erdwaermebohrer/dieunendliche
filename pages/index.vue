<template>
  <div id="page" :class="'page page__' + uid">
    <background-images
      :desktop="page.desktop_background_images"
      :mobile="page.mobile_background_images"
    />
    <slice-wrapper
      :slices="slices"
      :redirectToInternalPage="redirectToInternalPage"
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
  transition: "page",
  watch: {
    windowWidth: {
      handler(newValue) {
        newValue <= 760 ? (this.isMobile = true) : (this.isMobile = false);
        this.windowWidth = newValue;
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      isMobile: false,
      page: [],
      slices: [],
      uid: "homepage",
      windowWidth: 0,
    };
  },
  methods: {
    backgroundScroll() {
      var page = document.getElementById("page");
      var pageHeight = page.offsetHeight;
      var backgroundImageHeight =
        document.getElementById("background-image").offsetHeight;

      var imageScrollHeight = pageHeight - backgroundImageHeight;
      var viewPortHeight = window.innerHeight;

      

      window.addEventListener("scroll", () => {
        pageHeight = page.offsetHeight;
        backgroundImageHeight = document.getElementById("background-image").offsetHeight;

        if (this.windowWidth < 700){
          imageScrollHeight = pageHeight - backgroundImageHeight + 640;
        } else if (this.windowWidth < 1000){
          imageScrollHeight = pageHeight - backgroundImageHeight + 440;
        } else{
          imageScrollHeight = pageHeight - backgroundImageHeight + 220;
        }
        
        var scrollTop = window.scrollY;

        var scrollChange = (scrollTop*imageScrollHeight)/(pageHeight-viewPortHeight);


        this.documentHeight = document.body.clientHeight;
        if(document.getElementById("background-image-before").clientHeight != this.documentHeight){
          document.getElementById("background-image-before").style.height = this.documentHeight+'px';
        }
        
        document.getElementById("background-image").style.transform =
            "translate3d(0," + (scrollChange) + "px, 0";
      });
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    redirectToInternalPage(item) {
      this.$router.push(this.$prismic.linkResolver(item));
    },
    smoothScroll(id) {
      document.getElementById(id).scrollIntoView();
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.windowWidth = window.innerWidth;
    });
    this.backgroundScroll();
    setTimeout(() => {
      this.smoothScroll("page");
    }, 10);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  async asyncData({ $prismic, error }) {
    try {
      const result = await $prismic.api.getByUID("page", "homepage");
      return {
        page: result.data,
        slices: result.data.body,
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>