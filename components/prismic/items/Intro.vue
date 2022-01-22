<template>
  <div class="intro__wrapper">
    <div class="intro__wrapper--media">
      <!-- <img class="image" :data-src="slice.primary.image.url" v-lazy-load/> -->
      <img class="image" />
      <div class="video__wrapper">
        <video class="video__wrapper--item" autoplay playsinline muted loop>
          <source src="~static/intro-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <div class="intro__wrapper--content" :class="{'vertical': slice.primary.title_direction}">
      <h1 class="title" v-html="$newline($prismic.asText(slice.primary.title))" />
      <div
        v-if="slice.primary.title2.length > 0"
        class="title"
        v-text="$prismic.asText(slice.primary.title2)"
      />
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
};
</script>