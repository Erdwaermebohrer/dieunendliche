<template>
  <div class="slice__wrapper">
    <div
      class="slice__wrapper--item"
      v-for="(slice, index) in slices"
      :key="'slice-' + index"
    >
      <template v-if="slice.slice_type === 'imageswithlink'">
        <images-with-link :slice="slice" :clickedButton="clickedButton" />
      </template>

      <template v-if="slice.slice_type === 'image'">
        <full-width-image :slice="slice" />
      </template>
    </div>
  </div>
</template>

<script>
import FullWidthImage from "./items/FullWidthImage.vue";
import ImagesWithLink from "./items/ImagesWithLink.vue";

export default {
  props: ["slices", "clickedButton"],
  name: "slices-wrapper",
  components: {
    FullWidthImage,
    ImagesWithLink,
  },
};
</script>