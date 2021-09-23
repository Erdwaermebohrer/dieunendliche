<template>
  <div class="slice__wrapper">
    <div
      class="slice__wrapper--item"
      v-for="(slice, index) in slices"
      :key="'slice-' + index"
    >
      <template v-if="slice.slice_type === 'formfields'">
        <form-fields :slice="slice" :sendingForm="sendingForm" />
      </template>

      <template v-if="slice.slice_type === 'intro'">
        <intro :slice="slice" />
      </template>

      <template v-if="slice.slice_type === 'image'">
        <full-width-image :slice="slice" />
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

      <template v-if="slice.slice_type === 'imageswithroles'">
        <images-with-roles
          :slice="slice"
          :clickedButton="redirectToExternalPage"
        />
      </template>

      <template v-if="slice.slice_type === 'imagewithslider'">
        <image-with-slider :slice="slice" />
      </template>

      <template v-if="slice.slice_type === 'list'">
        <simple-list :slice="slice" />
      </template>

      <template v-if="slice.slice_type === 'steps'">
        <steps :slice="slice" />
      </template>

      <template v-if="slice.slice_type === 'titleanddescription'">
        <title-and-description :slice="slice" />
      </template>

      <template v-if="slice.slice_type === 'titledescriptionlink'">
        <title-description-link
          :slice="slice"
          :clickedButton="redirectToExternalPage"
        />
      </template>
    </div>
  </div>
</template>

<script>
import FormFields from "./items/FormFields.vue";
import FullWidthImage from "./items/FullWidthImage.vue";
import Intro from "./items/Intro.vue";
import ImageWithContent from "./items/ImageWithContent.vue";
import ImageWithFacts from "./items/ImageWithFacts.vue";
import ImagesWithLink from "./items/ImagesWithLink.vue";
import ImagesWithRoles from "./items/ImagesWithRoles.vue";
import ImageWithSlider from "./items/ImageWithSlider.vue";
import SimpleList from "./items/SimpleList.vue";
import TitleAndDescription from "./items/TitleAndDescription.vue";
import TitleDescriptionLink from "./items/TitleDescriptionLink.vue";
import Steps from './items/Steps.vue';

export default {
  props: [
    "slices",
    "redirectToInternalPage",
    "redirectToExternalPage",
    "sendingForm",
  ],
  name: "slices-wrapper",
  components: {
    FormFields,
    FullWidthImage,
    Intro,
    ImageWithContent,
    ImageWithFacts,
    ImagesWithLink,
    ImagesWithRoles,
    ImageWithSlider,
    SimpleList,
    TitleAndDescription,
    TitleDescriptionLink,
    Steps,
  },
};
</script>