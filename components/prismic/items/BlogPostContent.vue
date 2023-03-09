<template>
  <div class="blog-post-content__wrapper">
    <div class="blog-post-content__wrapper--content">
      <div
        class="content"
        v-html="$prismic.asHtml(slice.primary.content)"
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