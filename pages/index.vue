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

        this.documentHeight = document.body.clientHeight;
        if(document.getElementById("background-image-before").clientHeight != this.documentHeight){
          document.getElementById("background-image-before").style.height = this.documentHeight+'px';
        }


        if (this.windowWidth > 1940) {
          var scrollTop = window.scrollY * 40;
        } else if (this.windowWidth > 1800) {
          var scrollTop = window.scrollY * 50;
        } else if (this.windowWidth > 1700) {
          var scrollTop = window.scrollY * 58;
        } else if (this.windowWidth > 1610) {
          var scrollTop = window.scrollY * 65;
        } else if (this.windowWidth > 1500) {
          var scrollTop = window.scrollY * 70;
        } else if (this.windowWidth > 1400) {
          var scrollTop = window.scrollY * 71;
        } else if (this.windowWidth > 1300) {
          var scrollTop = window.scrollY * 78;
        } else if (this.windowWidth > 1200) {
          var scrollTop = window.scrollY * 85;
        } else if (this.windowWidth > 1100) {
          var scrollTop = window.scrollY * 90;
        } else if (this.windowWidth > 1000) {
          var scrollTop = window.scrollY * 103;
        } else if (this.windowWidth > 900) {
          var scrollTop = window.scrollY * 3;
        } else if (this.windowWidth > 800) {
          var scrollTop = window.scrollY * 10;
        } else if (this.windowWidth > 730) {
          var scrollTop = window.scrollY * 15;
        } else if (this.windowWidth > 600) {
          var scrollTop = window.scrollY * 25;
        } else {
          var scrollTop = window.scrollY * 60;
        }

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