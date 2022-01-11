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
      uid: "internal",
      windowWidth: 0,
      documentHeight: 0,
      pageElement: null,
      pageHeight: 0,
      bodyHeight: 0,
      backgroundImageHeight: 0,
      imageScrollHeight: 0,
      viewPortHeight: 0,
      scrollTop: 0
    };
  },
  methods: {
     initBackground() {
      this.pageElement = document.getElementById("page");
      this.pageHeight = this.pageElement.offsetHeight;
      this.bodyHeight = document.body.clientHeight;
      this.backgroundImageHeight =
        document.getElementById("background-image").offsetHeight;

      this.imageScrollHeight = this.pageHeight - this.backgroundImageHeight;
      this.viewPortHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;

    },
    backgroundScroll(){
      this.pageElement = document.getElementById("page");
      this.pageHeight = this.pageElement.offsetHeight;
      this.bodyHeight = document.body.clientHeight;

      this.backgroundImageHeight = document.getElementById("background-image").offsetHeight;
      this.scrollTop = window.scrollY;

      var height = this.bodyHeight;

      // if(this.pageHeight > this.bodyHeight){
      //   height = this.pageHeight;
      // }

      var viewPortHeight =  window.innerHeight;
      var offset = viewPortHeight / 4;
      if(window.innerWidth < 600){
        offset = viewPortHeight / 3;
      }

      this.imageScrollHeight = height - this.backgroundImageHeight + offset;
      

      

       var scrollChange = (this.scrollTop*this.imageScrollHeight)/(height-this.viewPortHeight);


      if(document.getElementById("background-image-before").clientHeight != height){
        document.getElementById("background-image-before").style.height = height+'px';
      }
      
      gsap.set(document.getElementById("background-image"),{
        y:(scrollChange * 1.05),
        x:0
      });
      //document.getElementById("background-image").style.transform =
          "translate3d(0," + (scrollChange * 1.05) + "px, 0";
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
    this.backgroundScroll();
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