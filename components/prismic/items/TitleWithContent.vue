<template>
	<div class="title-with-content__wrapper">
		<div class="title">
			<headline-component :inputData="slice.primary.title" :className="'h5'" />
		</div>
		<div
			class="description"
			v-html="$prismic.asHtml(slice.primary.content)"
		/>
	</div>
</template>
<script>
import HeadlineComponent from "../custom/HeadlineComponent.vue";
import LinkComponent from "../custom/LinkComponent.vue";

export default {
  props: {
    slice: {
      type: Object,
    },
  },
  components: {
    HeadlineComponent,
    LinkComponent,
  },
};
</script>

