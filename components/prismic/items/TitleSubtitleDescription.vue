<template>
  <div class="title-subtitle-description__wrapper">
    <div class="title-subtitle-description__wrapper--title">
      <h2 class="title" v-text="$prismic.asText(slice.primary.title1)" />
    </div>
    
    <div class="title-subtitle-description__wrapper--content">
      <div class="subtitle" v-html="$prismic.asText(slice.primary.subtitle)" />
      <div class="description__wrapper">
        <div class="description__wrapper--content" v-text="$prismic.asText(slice.primary.description)" />
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
};
</script>