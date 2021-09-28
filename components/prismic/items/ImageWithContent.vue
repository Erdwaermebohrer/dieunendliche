<template>
  <div class="image-with-content__wrapper">
    <div class="image-with-content__wrapper--content">
      <div class="content__wrapper" :style="{'background-color': slice.primary.color}">
        <div v-if="slice.primary.number.length > 0" class="content__wrapper--number" v-text="$prismic.asText(slice.primary.number)" />
        <h2 class="content__wrapper--title" v-text="$prismic.asText(slice.primary.title1)"/>
        <div class="content__wrapper--description" v-html="$prismic.asText(slice.primary.description)" />
        <div class="content__wrapper--link">
          <img class="icon" src="~assets/svg/arrow-right-green.svg" />
          <a @click="clickedButton(slice.primary.link)" v-text="$prismic.asText(slice.primary.link_title)" class="link" />
        </div>
      </div>
    </div>
    <div class="image-with-content__wrapper--image">
      <img class="image" :data-src="slice.primary.image1.url" v-lazy-load/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slice: {
      type: Object,
    },
    clickedButton: {
      type: Function,
    },
  },
};
</script>