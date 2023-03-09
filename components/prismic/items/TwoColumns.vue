<template>
  <div class="two-columns__wrapper">
    <div class="two-columns__wrapper--content">
      <div
        class="content"
        v-html="$prismic.asHtml(slice.primary.column_one)"
      />
      <div
        class="content"
        v-html="$prismic.asHtml(slice.primary.column_two)"
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