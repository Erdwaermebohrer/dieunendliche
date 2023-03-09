<template>
	<div :id="slice.primary.id" class="stage-component__wrapper">
		<div class="stage-component__wrapper--left">
			<div class="content__wrapper--bottom">
				<div class="subtitle">
					<headline-component :inputData="slice.primary.subtitle" />
				</div>
				<div class="title">
					<headline-component
						:inputData="slice.primary.title"
						:className="'h3'"
					/>
				</div>
				<div
					class="description"
					v-html="$prismic.asHtml(slice.primary.description)"
				/>
        <nuxt-link
          class="link"
          :to="slice.primary.link.url"
        >
          <span>→</span>
          <span>{{ $prismic.asText(slice.primary.link_title) }}</span>
        </nuxt-link>
			</div>
		</div>
		<div class="stage-component__wrapper--right">
			<div class="img">
				<img
					v-lazy-load
					:data-src="slice.primary.image.url"
					:alt="slice.primary.image.alt"
				/>
			</div>
		</div>
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
