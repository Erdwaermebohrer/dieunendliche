<template>
  <div class="image-with-facts__wrapper">
    <div class="image-with-facts__wrapper--image">
      <img class="image" :src="slice.primary.image1.url" />
    </div>
    <div class="image-with-facts__wrapper--content">
      <div class="content__wrapper">
        <h2
          class="content__wrapper--title"
          v-text="$prismic.asText(slice.primary.title1)"
        />
        <div class="content__wrapper--items">
          <div class="items__wrapper" v-for="(item, index) in slice.items" :key="'item-' + index">
            <div class="items__wrapper--number" v-text="$prismic.asText(item.number)"/>
            <div class="items__wrapper--text" v-text="$prismic.asText(item.title1)" />
          </div>
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
  },
};
</script>