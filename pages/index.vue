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
import { gsap } from "gsap/dist/gsap";

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
        : "Die Unendliche – Energie für Generationen",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$prismic.asText(this.page.meta_description)
            ? this.$prismic.asText(this.page.meta_description)
            : "Die Unendliche – Energie für Generationen",
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
            : "Die Unendliche – Energie für Generationen",
        },
        {
          hid: "og:description",
          name: "description",
          property: "og:description",
          content: this.$prismic.asText(this.page.meta_description)
            ? this.$prismic.asText(this.page.meta_description)
            : "Die Unendliche – Energie für Generationen",
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
      pageElement: null,
      pageHeight: 0,
      backgroundImageHeight: 0,
      imageScrollHeight: 0,
      viewPortHeight: 0,
      scrollTop: 0
    };
  },
  methods: {
    initBackground() {
      this.pageElement = document.getElementById("page");
      this.pageHeight = document.body.clientHeight;
      this.backgroundImageHeight =
        document.getElementById("background-image").offsetHeight;

      this.imageScrollHeight = this.pageHeight - this.backgroundImageHeight;
      this.viewPortHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;

      console.log('init background');
    },
    backgroundScroll(){
      this.pageHeight = document.body.clientHeight;
      this.backgroundImageHeight = document.getElementById("background-image").offsetHeight;
      this.scrollTop = window.scrollY;

      console.log('scroll background');


      this.imageScrollHeight = this.pageHeight - this.backgroundImageHeight;
      console.log('imageScrollHeight: '+this.imageScrollHeight);
      console.log('pageHeight: '+this.pageHeight);

      

       var scrollChange = (this.scrollTop*this.imageScrollHeight)/(this.pageHeight-this.viewPortHeight);


      if(document.getElementById("background-image-before").clientHeight != this.pageHeight){
        document.getElementById("background-image-before").style.height = this.pageHeight+'px';
      }
      
      // gsap.set(document.getElementById("background-image"),{
      //   y:(scrollChange * 1.05),
      //   x:0
      // });
      document.getElementById("background-image").style.transform =
          "translate3d(0," + (scrollChange) + "px, 0";
    },
    redirectToInternalPage(item) {
      this.$router.push(this.$prismic.linkResolver(item));
    },
    smoothScroll(id) {
      document.getElementById(id).scrollIntoView();
    },
  },
  mounted() {

    this.initBackground();
    setTimeout(() => {
      this.smoothScroll("page");
    }, 10);
  },

  beforeMount () {
    window.addEventListener('scroll', this.backgroundScroll);
    window.removeEventListener("resize", this.initBackground);
    
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.initBackground);
    window.removeEventListener('scroll', this.backgroundScroll);

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