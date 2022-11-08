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

<style lang="scss">
.form-step__wrapper {
	min-height: 500px;

	&--top {
		margin-top: 60px;

		.title {
			font-size: 46px;
			font-weight: 300;
			line-height: 58px;
			color: #857373;
		}

		.description {
			font-size: 22px;
			font-weight: 400;
			line-height: 27.9px;
			color: #857373;

      p {
        max-width: 620px;
      }

			p,
			ul,
			li {
				font-size: 22px;
				font-weight: 400;
				line-height: 27.9px;
				color: #857373;
			}
		}
	}

	&--bottom {
    position: relative;
		display: flex;
	}
}
</style>