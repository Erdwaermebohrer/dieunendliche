<template>
  <div class="footer__wrapper" :class="{'white-footer': isBlog}">
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
      <img v-if="!isBlog" class="logo" src="~assets/svg/small-logo-white.svg" />
      <img v-else class="logo" src="~assets/svg/small-logo-brown.svg" />
    </div>
    <div class="footer__wrapper--bottom">
      <div
        class="title"
        v-text="$prismic.asText(inputData.bottom_footer_title)"
      />
      <div class="logo__wrapper">
        <div v-for="(logo, index) in inputData.bottom_footer">
          <nuxt-link
            v-if="logo.link.link_type != 'Web'"
            :to="$prismic.linkResolver(logo.link)"
            :key="'logo-' + index"
          >
            <img
              class="logo__wrapper--item"
              :src="logo.image.url"
            />
          </nuxt-link>

          <a
            v-if="logo.link.link_type == 'Web'"
            :href="logo.link.url"
            :target="logo.link.target"
            :key="'logo-' + index"
          >
            <img
              class="logo__wrapper--item"
              :src="logo.image.url"
            />
          </a>
        </div>
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
    $route: {
      handler(value) {
        this.currentRoute = value.name
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
    isBlog() {
      return this.currentRoute === 'blog-all-uid' || this.currentRoute === 'blog'
    }
  },
  data() {
    return {
      isMobile: false,
      windowWidth: 0,
      currentRoute: ''
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