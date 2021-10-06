<template>
  <div class="footer__wrapper">
    <!-- <div class="video__wrapper">
      <video class="video__wrapper--item" autoplay playsinline muted loop>
        <source src="~static/intro-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div> -->
    <div class="footer__wrapper--navigation">
      <ul class="navigation__wrapper">
        <nuxt-link
          class="link-item"
          v-for="(navigationItem, index) in computedNavigation"
          :key="'item-' + index"
          :to="$prismic.linkResolver(navigationItem.page)"
        >
          <li v-text="$prismic.asText(navigationItem.navigation_title)" />
        </nuxt-link>
      </ul>
    </div>
    <div class="footer__wrapper--content">
      <div class="title" v-text="$prismic.asText(inputData.title)" />
      <img class="logo" :src="inputData.logo.url" />
    </div>
    <div class="footer__wrapper--bottom">
      <div
        class="title"
        v-text="$prismic.asText(inputData.bottom_footer_title)"
      />
      <div class="logo__wrapper">
        <img
          class="logo__wrapper--item"
          v-for="(logo, index) in inputData.bottom_footer"
          :key="'logo-' + index"
          :src="logo.image.url"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-footer",
  props: {
    inputData: {
      type: Object,
    },
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
  computed: {
    computedNavigation() {
      return this.isMobile
        ? this.inputData.navigation_mobile
        : this.inputData.navigation;
    },
  },
  data() {
    return {
      isMobile: false,
      windowWidth: 0,
    };
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.windowWidth = window.innerWidth;
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>