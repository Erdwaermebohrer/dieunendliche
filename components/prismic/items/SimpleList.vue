<template>
  <div class="simple-list__wrapper" :style="'background-color:' + slice.primary.color">
    <h2 class="simple-list__wrapper--title" v-text="$prismic.asText(slice.primary.title)" />
    <ul class="simple-list__wrapper--list">
      <li class="list-item" v-for="(item, index) in slice.items" :key="'list-item-' + index" v-text="$prismic.asText(item.title)" />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slice: {
      type: Object,
    }
  },
};
</script>