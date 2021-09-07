<template>
  <div class="image-with-slider__wrapper">
    <div class="image-with-slider__wrapper--image">
      <img class="image" :src="slice.primary.image.url" />
    </div>
    <div class="image-with-slider__wrapper--content">
      <div
        class="content__wrapper"
        :style="{ 'background-color': slice.primary.color }"
      >
        <h2
          class="content__wrapper--title"
          v-text="$prismic.asText(slice.primary.title)"
        />

        <div class="content__wrapper--slider">
          <div class="slider__header">
            <div
              class="slider__header--number"
              v-text="currentSlide + '/' + slice.items.length"
            />
            <img
              class="slider__header--icon"
              src="~assets/svg/arrow-right-green.svg"
              @click="$refs.slider.goToNext()"
            />
          </div>
          <div class="slider__content">
            <agile
              ref="slider"
              :options="sliderOptions"
              @after-change="showCurrentSlide($event)"
            >
              <div
                class="slider-item"
                v-for="(slide, index) in slice.items"
                :key="'slide-' + index"
                v-text="$prismic.asText(slide.description)"
              />
            </agile>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slice: {
      type: Object,
    },
  },
  data() {
    return {
      currentSlide: 1,
      sliderOptions: {
        navButtons: false,
        dots: false
      },
    };
  },
  methods: {
    showCurrentSlide(event) {
      this.currentSlide = event.currentSlide + 1;
    },
  },
};
</script>