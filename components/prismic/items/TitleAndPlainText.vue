<template>
  <div class="title-and-plain-text__wrapper">
    <div class="title-and-plain-text__wrapper--title">
      <h2 class="title" v-text="$prismic.asText(slice.primary.title)" />
    </div>
    <div class="title-and-plain-text__wrapper--content">
      <div
        class="content"
        v-html="$prismic.asText(slice.primary.content)"
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