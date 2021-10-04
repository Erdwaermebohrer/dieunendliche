<template>
  <div class="background-images__wrapper">
    <img
      class="background-images__wrapper--item"
      v-for="(image, index) in computedImages"
      :key="'image-' + index"
      :data-src="image.image.url"
      v-lazy-load
    />
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
        newValue <= 760 ? (this.isMobile = true) : (this.isMobile = false);
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