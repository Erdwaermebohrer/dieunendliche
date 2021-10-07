<template>
  <div>
    <div id="background-image" class="background-images__wrapper">
      <img
        class="background-images__wrapper--item"
        v-for="(image, index) in computedImages"
        :key="'image-' + index"
        :data-src="image.image.url"
        v-lazy-load
      />
    </div>
    <div class="video-footer__wrapper">
      <video class="video-footer__wrapper--item" autoplay playsinline muted loop>
        <source src="~static/intro-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    desktop: {
      type: Array,
    },
    mobile: {
      type: Array,
    },
  },
  watch: {
    windowWidth: {
      handler(newValue) {
        newValue <= 991 ? (this.isMobile = true) : (this.isMobile = false);
        this.windowWidth = newValue;
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    computedImages() {
      return this.isMobile ? this.mobile : this.desktop;
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