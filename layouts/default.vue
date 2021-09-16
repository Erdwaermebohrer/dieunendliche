<template>
  <div @mousemove="moveCursor" class="container">
    <transition name="fade-preloader" mode="in-out">
      <app-preloader v-if="pageLoading" />
    </transition>
    <app-header :inputData="header" />
    <Nuxt />
    <app-footer :inputData="footer" />
    <video
      class="cursor"
      ref="cursor"
      id="cursor"
      autoplay
      playsinline
      muted
      loop
    >
      <source src="~static/intro-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
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
          scale: 0.3,
        });
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.setPageLoading(false);
    }, 1500);
  },
};
</script>