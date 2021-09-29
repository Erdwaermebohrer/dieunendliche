<template>
  <div class="slice__wrapper">
    <div
      class="slice__wrapper--item"
      v-for="(slice, index) in slices"
      :key="'slice-' + index"
    >
      <template v-if="slice.slice_type === 'list'">
        <accordion :slice="slice" />
      </template>

      <template v-if="slice.slice_type === 'contentandcarousel'">
        <content-and-carousel
          :slice="slice"
          :clickedButton="redirectToExternalPage"
        />
      </template>

      <template v-if="slice.slice_type === 'contentcarouselwithindex'">
        <content-carousel-with-index
          :slice="slice"
        />
      </template>

      <template v-if="slice.slice_type === 'formfields'">
        <form-fields :slice="slice" :sendingForm="sendingForm" />
      </template>

      <template v-if="slice.slice_type === 'intro'">
        <intro :slice="slice" />
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

      <template v-if="slice.slice_type === 'process'">
        <process :slice="slice" />
      </template>

      <template v-if="slice.slice_type === 'steps'">
        <steps :slice="slice" />
      </template>

      <template v-if="slice.slice_type === 'titledescription'">
        <title-description :slice="slice" />
      </template>

      <template v-if="slice.slice_type === 'titledescriptionlink'">
        <title-description-link
          :slice="slice"
          :clickedButton="redirectToExternalPage"
        />
      </template>

      <template v-if="slice.slice_type === 'titlesubtitledescription'">
        <title-subtitle-description :slice="slice" />
      </template>

      <template v-if="slice.slice_type === 'titlesubtitlelink'">
        <title-subtitle-link
          :slice="slice"
          :clickedButton="redirectToExternalPage"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Accordion from "./items/Accordion.vue";
import ContentAndCarousel from "./items/ContentAndCarousel.vue";
import ContentCarouselWithIndex from  "./items/ContentCarouselWithIndex.vue";
import FormFields from "./items/FormFields.vue";
import Intro from "./items/Intro.vue";
import ImageWithContent from "./items/ImageWithContent.vue";
import ImageWithFacts from "./items/ImageWithFacts.vue";
import ImagesWithLink from "./items/ImagesWithLink.vue";
import ImagesWithRoles from "./items/ImagesWithRoles.vue";
import Process from "./items/Process.vue";
import Steps from "./items/Steps.vue";
import TitleDescription from "./items/TitleDescription.vue";
import TitleDescriptionLink from "./items/TitleDescriptionLink.vue";
import TitleSubtitleDescription from "./items/TitleSubtitleDescription.vue";
import TitleSubtitleLink from "./items/TitleSubtitleLink.vue";

export default {
  props: [
    "slices",
    "redirectToInternalPage",
    "redirectToExternalPage",
    "sendingForm",
  ],
  name: "slices-wrapper",
  components: {
    Accordion,
    ContentAndCarousel,
    ContentCarouselWithIndex,
    FormFields,
    Intro,
    ImageWithContent,
    ImageWithFacts,
    ImagesWithLink,
    ImagesWithRoles,
    Process,
    Steps,
    TitleDescription,
    TitleDescriptionLink,
    TitleSubtitleDescription,
    TitleSubtitleLink,
  },
};
</script>