<template>
  <div id="page" :class="'page page__error'">
    <div>
      <div id="background-image" class="background-images__wrapper">
        <img
          v-if="!isMobile"
          class="background-images__wrapper--item"
          data-src="~assets/images/error_desktop.jpg"
          v-lazy-load
        />
        <img
          v-else
          class="background-images__wrapper--item"
          data-src="~assets/images/error_mobile.jpg"
          v-lazy-load
        />
      </div>
    </div>
    <slice-wrapper>
      <template v-slot:slices>
        <div class="intro__wrapper">
          <div class="intro__wrapper--media">
            <img class="image" />
            <div class="video__wrapper">
              <video
                class="video__wrapper--item"
                autoplay
                playsinline
                muted
                loop
              >
                <source src="~static/intro-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="video-button__wrapper">
              <video
                class="video-button__wrapper--item"
                autoplay
                playsinline
                muted
                loop
              >
                <source src="~static/intro-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div class="intro__wrapper--content">
            <div class="title" v-text="'404'" />
          </div>
        </div>
        <div class="title-and-plain-text__wrapper">
          <div class="title-and-plain-text__wrapper--title">
            <h2
              class="title"
              v-text="
                'Die Seite, die Sie suchen, konnte nicht gefunden werden.'
              "
            />
          </div>
        </div>
      </template>
    </slice-wrapper>
  </div>
</template>

<script>
import SliceWrapper from "../components/prismic/SlicesWrapper.vue";

export default {
  components: {
    "slice-wrapper": SliceWrapper,
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
  data() {
    return {
      isMobile: false,
      uid: "error",
      windowWidth: 0,
    };
  },
  methods: {
    backgroundScroll() {
      var page = document.getElementById("page");
      var pageHeight = page.offsetHeight;
      var backgroundImageHeight =
        document.getElementById("background-image").offsetHeight;

      var imageScrollHeight = pageHeight - backgroundImageHeight;
      var viewPortHeight = window.innerHeight;

      window.addEventListener("scroll", () => {
        if (this.windowWidth > 1300) {
          var scrollTop = window.scrollY * 80;

          if (scrollTop > 2500) {
            var scrollChange =
              ((scrollTop + viewPortHeight) *
                (imageScrollHeight / pageHeight)) /
              160;
            document.getElementById("background-image").style.transform =
              "translate3d(0," + (scrollChange - 20) + "px, 0";
          } else {
            document.getElementById("background-image").style.transform =
              "translate3d(0,0,0)";
          }
        } else {
          var scrollTop = window.scrollY * 123;

          if (scrollTop > 500) {
            var scrollChange =
              ((scrollTop + viewPortHeight) *
                (imageScrollHeight / pageHeight)) /
              119;

            document.getElementById("background-image").style.transform =
              "translate3d(0," + (scrollChange - 20) + "px, 0";
          } else {
            document.getElementById("background-image").style.transform =
              "translate3d(0,0,0)";
          }
        }
      });
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    redirectToInternalPage(item) {
      this.$router.push(this.$prismic.linkResolver(item));
    },
    smoothScroll(id) {
      document.getElementById(id).scrollIntoView();
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.windowWidth = window.innerWidth;
    });
    this.backgroundScroll();
    setTimeout(() => {
      this.smoothScroll("page");
    }, 10);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>