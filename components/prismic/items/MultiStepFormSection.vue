<template>
		<form-slider :inputData="inputData" :steps="steps"/>
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
      inputData: {},
      steps: []
    }
  },
  async fetch() {
    const items =  await this.$prismic.api.getByID(this.slice.primary.form.id);
    this.steps = items.data.body;
    this.inputData = items.data;
  }
};
</script>