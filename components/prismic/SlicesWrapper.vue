<template>
  <div class="slice__wrapper">
    <div
      class="slice__wrapper--item"
      v-for="(slice, index) in slices"
      :key="'slice-' + index"
    >
      <div>{{ slice }}</div>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  props: ["slices"],
  name: "slices-wrapper",
  components: {}
};
</script>