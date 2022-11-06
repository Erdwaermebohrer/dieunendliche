<template>
	<div class="multi-step-form-section__wrapper">
		{{ slice }}
		<form-slider />
	</div>
</template>

<script>
import FormSlider from '@/components/custom/form/FormSlider.vue';
export default {
	props: {
		slice: {
			type: Object
		}
	},
	components: {
		"form-slider": FormSlider,
	}
};
</script>