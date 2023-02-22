<template>
  <div class="contact-module__wrapper">
    <div class="contact-module__wrapper--left">
      <div class="title">
        <headline-component :inputData="slice.primary.title" />
      </div>
      <div class="subtitle">
        <headline-component :inputData="slice.primary.subtitle" />
      </div>
    </div>
    <div class="contact-module__wrapper--right">
      Right
    </div>
  </div>
</template>

<script>
import HeadlineComponent from "../custom/HeadlineComponent.vue";
export default {
  props: {
    slice: {
      type: Object,
    }
  },
  components: {
    HeadlineComponent
  },
};
</script>