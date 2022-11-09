<template>
	<div class="form-step__wrapper">
		<div class="form-step__wrapper--top">
			<div class="title" v-text="$prismic.asText(step.primary.title)"></div>
			<div
				class="description"
				v-html="$prismic.asHtml(step.primary.description)"
			></div>
		</div>
		<div class="form-step__wrapper--bottom">
			<slot name="fields"> </slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "form-step",
	props: {
		step: {
			type: Object
		}
	}
};
</script>