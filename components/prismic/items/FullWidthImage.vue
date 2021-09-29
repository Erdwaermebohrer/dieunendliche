<template>
  <div class="full-width-image__wrapper">
    <img class="image" :data-src="slice.primary.image1.url" v-lazy-load/>
    <div class="video__wrapper">
      <video class="video__wrapper--item" autoplay playsinline muted loop>
        <source src="~static/intro-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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