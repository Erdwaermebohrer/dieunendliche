<template>
  <div class="title-subtitle-link__wrapper">
    <div class="title-subtitle-link__wrapper--title">
      <h2 class="title" v-text="$prismic.asText(slice.primary.title1)" />
    </div>
    
    <div class="title-subtitle-link__wrapper--content">
      <div class="subtitle" v-html="$prismic.asText(slice.primary.subtitle)" />
      <div class="description" v-text="$prismic.asText(slice.primary.description)" />
      <div class="link__wrapper">
        <img
          v-if="slice.primary.link_title.length > 0"
          class="link__wrapper--icon"
          src="~assets/svg/arrow-right-white.svg"
        />
        <a
          class="link__wrapper--link"
          v-text="$prismic.asText(slice.primary.link_title)"
          @click="clickedButton(slice.primary.link)"
        />
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
    clickedButton: {
      type: Function,
    },
  },
};
</script>