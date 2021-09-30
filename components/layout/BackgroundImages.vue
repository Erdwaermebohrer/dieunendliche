<template>
  <div class="background-images__wrapper">
    <img
      class="background-images__wrapper--item"
      v-for="(image, index) in computedImages"
      :key="'image-' + index"
      :data-src="require(`@/assets/images/${image.image}`)"
      v-lazy-load
    />
  </div>
</template>

<script>
export default {
  props: {
    images: {
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
    computedImages() {
      return this.isMobile ? this.images.mobile : this.images.desktop;
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