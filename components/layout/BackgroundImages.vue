<template>
  <div id="background-image-before" class="background-image-before"  :style="{'height':documentHeight+'px'}">
    <div id="background-image" class="background-images__wrapper">
      <img
        class="background-images__wrapper--item"
        v-for="(image, index) in computedImages"
        :key="'image-' + index"
        :data-src="image.image.url"
        v-lazy-load
      />
    </div>
    <div class="video-footer__wrapper" v-if="showVideo">
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
  data() {
    return {
      showVideo: true
    };
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
    documentHeight: {
      handler(newValue) {
        if(this.documentHeight <= this.windowHeight*2.5){
          this.showVideo = false;
        } else{
          this.showVideo = true;
        }
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
      windowHeight: 0,
      documentHeight: 0
    };
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.documentHeight = document.body.clientHeight;
    },
  },
  mounted() {
    this.documentHeight = document.body.clientHeight;
    this.windowHeight = window.innerHeight;

    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.windowWidth = window.innerWidth;
    });

    if(this.documentHeight <= this.windowHeight*2){
      this.showVideo = false;
    } else{
      this.showVideo = true;
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>