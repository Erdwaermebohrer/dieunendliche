<template>
  <div class="content-and-carousel__wrapper">
    <div class="content-and-carousel__wrapper--title">
      <h2 class="title" v-html="$newline($prismic.asText(slice.primary.title))" />
    </div>
    <div class="content-and-carousel__wrapper--content">
      <div class="content__wrapper">
        <div
          class="content__wrapper--subtitle"
          v-if="$prismic.asText(slice.primary.big_title)"
          v-html="$prismic.asText(slice.primary.big_title)"
        />
        <div
          class="content__wrapper--description"
          v-html="$prismic.asText(slice.primary.description)"
        />
      </div>
    </div>
    <div class="content-and-carousel__wrapper--slider">
      <div class="slider__wrapper">
        <div class="slider__wrapper--content">
          <div>
            <h3 class="slider-item__headline" v-if="$prismic.asText(slice.primary.featured_small_title)" v-text="$prismic.asText(slice.primary.featured_small_title)" />
              <div>
                <div
                  class="slider-item lsider-item--featured" >
                  <div class="wrap">
                    <div class="slider-item__content">
                      <div
                        class="author"
                        v-text="$prismic.asText(slice.primary.featured_author)"
                      />
                      <div class="title" v-text="$prismic.asText(slice.primary.featured_title)" />
                    </div>
                    <a
                      class="slider-item__link"
                      @click="clickedButton(slice.primary.featured_link)"
                      target="_blank"
                    >
                      <img class="icon" src="~assets/svg/arrow-right-green.svg" />
                      <span
                        class="link"
                        v-text="$prismic.asText(slice.primary.featured_link_title)"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="slider-item__headline" v-if="$prismic.asText(slice.primary.slider_title)" v-text="$prismic.asText(slice.primary.slider_title)" />

              <div class="slider__wrapper--icons">
                <img
                  class="icon icon--prev"
                  src="~assets/svg/arrow-right-brown.svg"
                  @click="$refs.slider.goToPrev()"
                />
                <img
                  class="icon"
                  src="~assets/svg/arrow-right-brown.svg"
                  @click="$refs.slider.goToNext()"
                />
              </div>

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
                          class="author"
                          v-text="$prismic.asText(slide.author)"
                        />
                        <div class="title" v-text="$prismic.asText(slide.title)" />
                      </div>
                      <a
                        class="slider-item__link"
                        @click="clickedButton(slide.link)"
                        target="_blank"
                      >
                        <img class="icon" src="~assets/svg/arrow-right-green.svg" />
                        <span
                          class="link"
                          v-text="$prismic.asText(slide.link_title)"
                        />
                      </a>
                    </div>
                  </div>
                </agile>
              </client-only>
            </div>
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
          this.sliderOptions.slidesToShow = 2;
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
        slidesToShow: 2,
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