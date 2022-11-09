<template>
  <div  class="container">
    <transition v-if="currentRoute !== '/form'" name="fade-preloader" mode="in-out">
      <app-preloader v-if="pageLoading" />
    </transition>
    <app-header v-if="currentRoute !== '/form'" :inputData="header" />
    <Nuxt />
    <app-footer :inputData="footer" />
  </div>
</template>

<script>
import { gsap } from "gsap/dist/gsap";
import { mapActions, mapGetters } from "vuex";
import Header from "../components/layout/Header.vue";
import Footer from "../components/layout/Footer.vue";
import Preloader from "../components/layout/Preloader.vue";

export default {
  components: {
    "app-header": Header,
    "app-footer": Footer,
    "app-preloader": Preloader,
  },
  watch: {
    $route: {
      handler(value) {
        this.currentRoute = value.path;
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      showCursor: false,
      currentRoute: ''
    };
  },
  computed: {
    ...mapGetters({
      header: "header",
      footer: "footer",
      pageLoading: "pageLoading",
    }),
  },
  methods: {
    ...mapActions(["setPageLoading"]),
    moveCursor(e) {
      const cursor = this.$refs["cursor"];
      var moveY = e.clientY;
      var moveX = e.clientX;
      var background = "transparent";
      var eClasses = e.target.classList;

      gsap.to(cursor, {
        duration: 0.4,
        ease: "Expo.easeOut",
        top: moveY + "px",
        left: moveX + "px",
      });

      if (eClasses) {
        if (
          eClasses.contains("btn--primary") ||
          eClasses.contains("cursor--white")
        ) {
          background = "#fff";
        } else {
          background = "transparent";
        }
      } else {
        background = "transparent";
      }

      if (
        e.target.nodeName == "A" ||
        e.target.nodeName == "BUTTON" ||
        e.target.nodeName == "INPUT" ||
        e.target.closest("a") ||
        e.target.closest("button") ||
        e.target.closest("input") ||
        eClasses.contains("cursor--hover")
      ) {
        gsap.to(cursor, {
          duration: 1,
          ease: "Expo.easeOut",
          background: background,
          scale: 1,
        });
      } else {
        gsap.to(cursor, {
          duration: 1,
          ease: "Expo.easeOut",
          background: background,
          scale: 0.5,
        });
      }
    },
    setBodyBackground() {
      document.body.style.backgroundColor = "transparent";
    },
  },
  mounted() {
    this.setBodyBackground();
    setTimeout(() => {
      this.setPageLoading(false);
    }, 1500);
    setTimeout(() => {
      this.showCursor = true;
    }, 2300);
  },
};
</script>