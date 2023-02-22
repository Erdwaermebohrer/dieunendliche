<template>
  <div class="headline-component__wrapper" v-if="$prismic.asText(inputData)">
    <template v-if="inputData[0].type === 'heading1'">
      <h1 :class="className" v-text="$prismic.asText(inputData)" />
    </template>
    <template v-if="inputData[0].type === 'heading2'">
      <h2 :class="className" v-text="$prismic.asText(inputData)" />
    </template>
    <template v-if="inputData[0].type === 'heading3'">
      <h3 :class="className" v-text="$prismic.asText(inputData)" />
    </template>
    <template v-if="inputData[0].type === 'heading4'">
      <h4 :class="className" v-text="$prismic.asText(inputData)" />
    </template>
    <template v-if="inputData[0].type === 'heading5'">
      <h5 :class="className" v-text="$prismic.asText(inputData)" />
    </template>
    <template v-if="inputData[0].type === 'heading6'">
      <h6 :class="className" v-text="$prismic.asText(inputData)" />
    </template>
  </div>
</template>
<script>
export default {
  name: "headline-component",
  props: {
    className: {
      type: String | Array,
    },
    inputData: {
      type: Array,
    },
  },
};
</script>
<style scoped>
.hyphens {
  hyphens: auto;
}
</style>
