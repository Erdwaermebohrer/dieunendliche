<template>
  <div id="page" :class="'page page__' + uid">
    <background-images
      :desktop="page.desktop_background_images"
      :mobile="page.mobile_background_images"
    />
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
      uid: "internal",
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
        if (this.windowWidth > 1200) {
          var scrollTop = window.scrollY * 80;

          if (scrollTop > 2500) {
            var scrollChange =
              ((scrollTop + viewPortHeight) *
                (imageScrollHeight / pageHeight)) /
              160;
            document.getElementById("background-image").style.transform =
              "translate3d(0," + (scrollChange - 20) + "px, 0";
          } else {
            document.getElementById("background-image").style.transform =
              "translate3d(0,0,0)";
          }
        } else {
          var scrollTop = window.scrollY * 120;

          if (scrollTop > 2500) {
            var scrollChange =
              ((scrollTop + viewPortHeight) *
                (imageScrollHeight / pageHeight)) /
              160;

            console.log(scrollChange);
            document.getElementById("background-image").style.transform =
              "translate3d(0," + (scrollChange - 20) + "px, 0";
          } else {
            document.getElementById("background-image").style.transform =
              "translate3d(0,0,0)";
          }
        }
      });
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
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