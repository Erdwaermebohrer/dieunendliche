<template>
  <div class="content-carousel-index__wrapper">
    <div class="content-carousel-index__wrapper--title">
      <h2 class="title" v-html="$newline($prismic.asText(slice.primary.title))" />
    </div>
    <div class="content-carousel-index__wrapper--content">
      <div class="content__wrapper">
        <div
          class="content__wrapper--subtitle"
          v-html="$prismic.asText(slice.primary.description)"
        />
      </div>
    </div>
    <div class="content-carousel-index__wrapper--slider">
      <div class="content-carousel-index__wrapper--slider--title">
        <h2 class="title" v-html="$newline($prismic.asText(slice.primary.title2))" />
      </div>
      <div class="slider__wrapper">
        <div class="slider__wrapper--icons">
          <img
            class="icon"
            src="~assets/svg/arrow-right-yellow.svg"
            @click="$refs.slider.goToPrev()"
          />
          <img
            class="icon"
            src="~assets/svg/arrow-right-yellow.svg"
            @click="$refs.slider.goToNext()"
          />
        </div>

        <div class="slider__wrapper--content">

          <client-only>
            <agile ref="slider" :options="sliderOptions">
              <div
                class="slider-item"
                v-for="(slide, index) in slice.items"
                :key="'slide-' + index"
              >
                <div class="wrap">
                  <div class="slider-item__content">
                    <div
                      class="index"
                      v-text="index + 1 + '/' + slice.items.length"
                    />
                    <div class="title" v-text="$prismic.asText(slide.title)" />
                  </div>
                </div>
              </div>
            </agile>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    clickedButton: {
      type: Function,
    },
    slice: {
      type: Object,
    },
  },
  watch: {
    windowWidth: {
      handler(newValue) {
        if (newValue <= 760) {
          this.sliderOptions.slidesToShow = 1.2;
        } else if (newValue > 760 && newValue < 900) {
          this.sliderOptions.slidesToShow = 2;
        } else {
          this.sliderOptions.slidesToShow = 2.96;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      currentSlide: 1,
      sliderOptions: {
        navButtons: false,
        dots: false,
        slidesToShow: 3,
      },
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