<template>
  <div class="header__wrapper">
    <a class="header__wrapper--logo">
      <img :src="inputData.logo.url" @click="$router.push('/')" />
    </a>
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
      <transition name="sidebar">
        <div class="navigation__wrapper--sidebar" v-if="isNavOpen">
          <div class="logo__wrapper">
            <img class="logo" :src="inputData.logo.url" @click="navigateToHome" />
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
      </transition>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap/dist/gsap";

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
      if (this.isNavOpen) {
        gsap.timeline().to(".video__wrapper--item", {
          width: "130px",
          height: "130px",
          transform: "translate3d(0,0,0)",
          ease: "expo.inOut",
          duration: 1.5,
          zIndex: 20,
        });
      } else {
        gsap.timeline()
        .to(".video__wrapper--item", {
          width: "100%",
          height: "100%",
          transform: "translate3d(0,0,0)",
          ease: "expo.inOut",
          duration: 1.5,
          zIndex: 50,
        });
      }

      this.isNavOpen = !this.isNavOpen;
    },
    navigateToRoute(item) {
      this.isNavOpen = false;
      this.$router.push(this.$prismic.linkResolver(item));
    },
    navigateToHome() {
      this.isNavOpen = false;
      this.$router.push("/");
    },
  },
};
</script>