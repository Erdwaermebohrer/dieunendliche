<template>
  <div class="title-description__wrapper">
    <div class="title-description__wrapper--title">
      <h2 class="title" v-html="$newline($prismic.asText(slice.primary.title))" />
    </div>
    <div class="title-description__wrapper--content">
      <div
          class="title-description__wrapper--subtitle"
          v-if="$prismic.asText(slice.primary.big_title)"
          v-html="$prismic.asText(slice.primary.big_title)"
        />
      <div
        class="description"
        v-html="$prismic.asText(slice.primary.description)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slice: {
      type: Object,
    }
  },
};
</script>