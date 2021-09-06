<template>
  <div class="image-with-content__wrapper">
    <div class="image-with-content__wrapper--content">
      <div class="content__wrapper">
        <h2 class="content__wrapper--title" v-text="$prismic.asText(slice.primary.title1)"/>
        <div class="content__wrapper--description" v-text="$prismic.asText(slice.primary.description)" />
        <div class="content__wrapper--link">
          <img class="icon" src="~assets/svg/arrow-right-green.svg" />
          <a v-text="$prismic.asText(slice.primary.link_title)" class="link" />
        </div>
      </div>
    </div>
    <div class="image-with-content__wrapper--image">
      <img class="image" :src="slice.primary.image1.url" />
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