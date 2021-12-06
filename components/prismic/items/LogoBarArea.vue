<template>
  <div class="logobar__wrapper">
    <div class="logobar__wrapper--content">
      <h2 class="title"  v-text="$prismic.asText(slice.primary.title)"/>

      <div>
      	<div class="description"  v-html="$prismic.asText(slice.primary.description)"/>

      	<div class="logobar">
	        <img class="image" :data-src="item.logo.url" v-for="(item, index) in slice.items" :key="'item-' + index" v-lazy-load/>
	    </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slice: {
      type: Object,
    },
    clickedButton: {
      type: Function,
    },
  },
};
</script>