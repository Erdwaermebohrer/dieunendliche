<template>
  <div class="header__wrapper">
    <div class="header__wrapper--logo">
      <img :src="inputData.logo.url" @click="$router.push('/')" />
    </div>
    <div class="header__wrapper--navigation">
      <ul class="navigation__wrapper--desktop">
        <nuxt-link
          class="link-item"
          v-for="(navigationItem, index) in inputData.navigation"
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
        <div class="logo__wrapper">
          <img
            class="logo"
            :src="inputData.logo.url"
            @click="navigateToHome"
          />
        </div>
        <ul class="sidebar__wrapper">
          <a
            class="sidebar__wrapper--item"
            v-for="(navigationItem, index) in inputData.navigation"
            :key="'item-' + index"
            @click="navigateToRoute(navigationItem.page)"
          >
            <li v-text="$prismic.asText(navigationItem.navigation_title)" />
          </a>
        </ul>
        <div class="button__wrapper">
          <button class="button" @click="toggleBurger" v-text="'Zurück'" />
          <span class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-header",
  props: {
    inputData: {
      type: Object,
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
    navigateToRoute(item) {
      this.isNavOpen = false;
      this.$router.push(this.$prismic.linkResolver(item));
    },
    navigateToHome() {
      this.isNavOpen = false;
      this.$router.push('/');
    }
  },
};
</script>