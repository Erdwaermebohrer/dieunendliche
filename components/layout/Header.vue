<template>
  <div class="header__wrapper">
    <div class="header__wrapper--logo">
      <span @click="$router.push('/')">Logo</span>
    </div>
    <div class="header__wrapper--navigation">
      <ul class="navigation__wrapper--desktop">
        <nuxt-link
          class="link-item"
          v-for="(navigationItem, index) in inputData"
          :key="'item-' + index"
          :to="$prismic.linkResolver(navigationItem.page)"
        >
          <li v-text="$prismic.asText(navigationItem.navigation_title)" />
        </nuxt-link>
      </ul>
      <div class="navigation__wrapper--mobile">
        <button
          class="burger__button"
          :class="{ active: isNavOpen }"
          @click="toggleBurger"
        >
          <span class="burger__button--bar" />
          <span class="burger__button--bar" />
          <span class="burger__button--bar" />
        </button>
      </div>
      <div class="navigation__wrapper--sidebar" v-if="isNavOpen">
        <ul class="sidebar__wrapper">
          <nuxt-link
            v-for="(navigationItem, index) in inputData"
            :key="'item-' + index"
            :to="$prismic.linkResolver(navigationItem.page)"
          >
            <li v-text="$prismic.asText(navigationItem.navigation_title)" />
          </nuxt-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-header",
  props: {
    inputData: {
      type: Array,
    },
  },
  data() {
    return {
      isNavOpen: false,
    };
  },
  methods: {
    toggleBurger() {
      this.isNavOpen = !this.isNavOpen;
    },
  },
};
</script>