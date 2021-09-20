<template>
  <div class="title-description-link__wrapper">
    <div class="title-description-link__wrapper--title">
      <h2 class="title" v-text="$prismic.asText(slice.primary.title)" />
    </div>
    <div class="title-description-link__wrapper--content">
      <div
        class="description"
        v-html="$prismic.asText(slice.primary.description)"
      />
      <div class="link__wrapper">
        <img
          class="link__wrapper--icon"
          src="~assets/svg/arrow-right-green.svg"
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