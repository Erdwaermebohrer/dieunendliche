<template>
	<div class="multi-step-form-section__wrapper">
		<form-slider :steps="steps"/>
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
	},
  data() {
    return {
      steps: []
    }
  },
  async fetch() {
    const items =  await this.$prismic.api.getByID(this.slice.primary.form.id);
    this.steps = items.data.body;
  }
};
</script>