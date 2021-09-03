<template>
  <div class="full-width-image__wrapper">
    <img class="image" :src="slice.primary.image1.url" />
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