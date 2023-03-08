<template>
  <div class="slice__wrapper">
    <slot name="slices">
      <div
        class="slice__wrapper--item"
        v-for="(slice, index) in slices"
        :key="'slice-' + index"
      >

        <template v-if="slice.slice_type === 'articles'">
          <articles :slice="slice" />
        </template>

        <template v-if="slice.slice_type === 'blogstage'">
          <blog-stage :slice="slice" />
        </template>

        <template v-if="slice.slice_type === 'blog_post_stage'">
          <blog-post-stage :slice="slice" :page="page" />
        </template>

        <template v-if="slice.slice_type === 'blogpostcontent'">
          <blog-post-content :slice="slice" />
        </template>

        <template v-if="slice.slice_type === 'contactmodule'">
          <contact-module :slice="slice" />
        </template>

        <template v-if="slice.slice_type === 'twocolumns'">
          <two-columns :slice="slice" />
        </template>

        <template v-if="slice.slice_type === 'choose_articles'">
          <choose-articles :slice="slice" :page="page"/>
        </template>

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
          <content-carousel-with-index :slice="slice" />
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

        <template v-if="slice.slice_type === 'titlewithcontent'">
          <title-with-content :slice="slice" />
        </template>

        <template v-if="slice.slice_type === 'titleandplaintext'">
          <title-and-plain-text :slice="slice" />
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

        <template v-if="slice.slice_type === 'logo_bar'">
          <logo-bar
            :slice="slice"
          />
        </template>

        <template v-if="slice.slice_type === 'multistepsection'">
          <multi-step-form-section
            :slice="slice"
          />
        </template>
      </div>
    </slot>
  </div>
</template>

<script>
import Accordion from "./items/Accordion.vue";
import Articles from "./items/Articles.vue";
import BlogStage from "./items/BlogStage.vue";
import BlogPostStage from "./items/BlogPostStage.vue";
import BlogPostContent from "./items/BlogPostContent.vue";
import ContactModule from "./items/ContactModule.vue";
import ContentAndCarousel from "./items/ContentAndCarousel.vue";
import ContentCarouselWithIndex from "./items/ContentCarouselWithIndex.vue";
import ChooseArticles from "./items/ChooseArticles.vue";
import FormFields from "./items/FormFields.vue";
import Intro from "./items/Intro.vue";
import ImageWithContent from "./items/ImageWithContent.vue";
import ImageWithFacts from "./items/ImageWithFacts.vue";
import ImagesWithLink from "./items/ImagesWithLink.vue";
import ImagesWithRoles from "./items/ImagesWithRoles.vue";
import Process from "./items/Process.vue";
import Steps from "./items/Steps.vue";
import TitleAndPlainText from "./items/TitleAndPlainText.vue";
import TitleWithContent from "./items/TitleWithContent.vue";
import TitleDescription from "./items/TitleDescription.vue";
import TitleDescriptionLink from "./items/TitleDescriptionLink.vue";
import TitleSubtitleDescription from "./items/TitleSubtitleDescription.vue";
import TitleSubtitleLink from "./items/TitleSubtitleLink.vue";
import TwoColumns from "./items/TwoColumns.vue";
import LogoBar from "./items/LogoBarArea.vue";
import MultiStepFormSection from "./items/MultiStepFormSection.vue";

export default {
  props: [
    "page",
    "slices",
    "redirectToInternalPage",
    "redirectToExternalPage",
    "sendingForm",
  ],
  name: "slices-wrapper",
  components: {
    Accordion,
    Articles,
    BlogStage,
    BlogPostStage,
    BlogPostContent,
    ContactModule,
    ContentAndCarousel,
    ContentCarouselWithIndex,
    ChooseArticles,
    FormFields,
    Intro,
    ImageWithContent,
    ImageWithFacts,
    ImagesWithLink,
    ImagesWithRoles,
    Process,
    Steps,
    TitleAndPlainText,
    TitleWithContent,
    TitleDescription,
    TitleDescriptionLink,
    TitleSubtitleDescription,
    TitleSubtitleLink,
    TwoColumns,
    LogoBar,
    MultiStepFormSection
  },
};
</script>