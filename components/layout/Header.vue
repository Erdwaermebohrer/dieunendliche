<template>
  <div class="header__wrapper" :class="{'header__wrapper--hidden':showNav == false, 'white-header': isBlog}">
    <a class="header__wrapper--logo" @click="$router.push('/')">
      <img v-if="isBlog" src="~assets/svg/big-logo-black.svg" />
      <img v-else src="~assets/svg/big-logo-white.svg" />
    </a>
    <div class="header__wrapper--navigation">
      <ul class="navigation__wrapper--desktop">
        <li v-for="(navigationItem, index) in inputData.navigation">

          <a
            class="link-item"
            v-if="navigationItem.page.link_type == 'Web'"
            :href="navigationItem.page.url"
            :target="navigationItem.page.target"
             v-text="$prismic.asText(navigationItem.navigation_title)"
          />
          <nuxt-link
            class="link-item"
            v-if="navigationItem.page.link_type == 'Document'"
            :to="$prismic.linkResolver(navigationItem.page)"
             v-text="$prismic.asText(navigationItem.navigation_title)"
          />  


          
        </li>
        
      </ul>
      <div class="navigation__wrapper--mobile">
        <transition name="menu-button">
          <span
            class="burger__button"
            @click="toggleBurger"
            v-if="!isNavOpen"
            v-text="'Menü'"
          />
        </transition>
      </div>
      <div
        class="navigation__wrapper--sidebar"
        :class="{ active: isNavOpen }"
      >
        <div class="close-button__wrapper">
          <img
            class="icon"
            src="~assets/svg/close.svg"
            @click="toggleBurger"
          />
        </div>
        <ul class="sidebar__wrapper">
          <li v-for="(navigationItem, index) in inputData.navigation" @click="closeNav">


            <a
              class="sidebar__wrapper--item"
              v-if="navigationItem.page.link_type == 'Web'"
              :href="navigationItem.page.url"
              :target="navigationItem.page.target"
               v-text="$prismic.asText(navigationItem.navigation_title)"
            />
            <nuxt-link
              class="sidebar__wrapper--item"
              v-if="navigationItem.page.link_type == 'Document'"
              :to="$prismic.linkResolver(navigationItem.page)"
               v-text="$prismic.asText(navigationItem.navigation_title)"
            />  

            
          </li>
        </ul>
        <div class="button__wrapper">
          <span class="line" />
        </div>
      </div>
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
  watch: {
    $route: {
      handler(value) {
        this.currentRoute = value.name
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      isNavOpen: false,
      lastScrollTop: 0,
      showNav: true,
      currentRoute: ''
    };
  },
  computed: {
    isBlog() {
      return this.currentRoute === 'blog-all-uid' || this.currentRoute === 'blog'
    }
  },
  methods: {
    toggleBurger() {
      // if (this.isNavOpen) {
      //   gsap.timeline().to(".video-button__wrapper--item", {
      //     width: "110px",
      //     height: "110px",
      //     transform: "translate3d(0,0,0)",
      //     ease: "expo.inOut",
      //     duration: 1.5,
      //     zIndex: 20,
      //   });
      // } else {
      //   gsap.timeline().to(".video-button__wrapper--item", {
      //     width: "100%",
      //     height: "80%",
      //     transform: "translate3d(0,150px,0)",
      //     ease: "expo.inOut",
      //     duration: 1.5,
      //     zIndex: 20,
      //   });
      // }

      this.isNavOpen = !this.isNavOpen;
    },
    showHideHeader(){
      var st = window.pageYOffset || document.documentElement.scrollTop; 
      if(st > 100){
        if (st > this.lastScrollTop){
          this.showNav = false;
        } else {
          this.showNav = true;
        }
      } else{
        this.showNav = true;
      }
      this.lastScrollTop = st <= 0 ? 0 : st;
    },
    navigateToRoute(item) {
      this.isNavOpen = false;
      this.$router.push(this.$prismic.linkResolver(item));
    },

    closeNav() {
      this.isNavOpen = false;
    },
    navigateToHome() {
      this.isNavOpen = false;
      this.$router.push("/");
    },
  },
  beforeMount () {
    window.addEventListener('scroll', this.showHideHeader);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.showHideHeader);
  }
};
</script>