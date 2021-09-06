<template>
  <div class="slice__wrapper">
    <div
      class="slice__wrapper--item"
      v-for="(slice, index) in slices"
      :key="'slice-' + index"
    >
      <template v-if="slice.slice_type === 'image'">
        <full-width-image :slice="slice" />
      </template>

      <template v-if="slice.slice_type === 'list'">
        <simple-list :slice="slice" />
      </template>

      <template v-if="slice.slice_type === 'imagewithcontent'">
        <image-with-content
          :slice="slice"
          :clickedButton="redirectToExternalPage"
        />
      </template>

      <template v-if="slice.slice_type === 'imagewithfacts'">
        <image-with-facts :slice="slice" />
      </template>

      <template v-if="slice.slice_type === 'imageswithlink'">
        <images-with-link
          :slice="slice"
          :clickedButton="redirectToInternalPage"
        />
      </template>
    </div>
  </div>
</template>

<script>
import FullWidthImage from "./items/FullWidthImage.vue";
import ImageWithContent from "./items/ImageWithContent.vue";
import ImageWithFacts from "./items/ImageWithFacts.vue";
import ImagesWithLink from "./items/ImagesWithLink.vue";
import SimpleList from "./items/SimpleList.vue";

export default {
  props: ["slices", "redirectToInternalPage", "redirectToExternalPage"],
  name: "slices-wrapper",
  components: {
    FullWidthImage,
    ImageWithContent,
    ImageWithFacts,
    ImagesWithLink,
    SimpleList,
  },
};
</script>