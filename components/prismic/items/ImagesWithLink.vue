<template>
  <div class="images-with-link__wrapper">
    <div
      class="images-with-link__wrapper--item"
      v-for="(item, index) in slice.items"
      :key="'image-' + index"
    >
      <img class="image" :src="item.image.url" />
      <div class="content__wrapper">
        <h2
          class="content__wrapper--title"
          v-text="$prismic.asText(item.title)"
        />
        <div class="content__wrapper--link">
          <img class="icon" src="~assets/svg/arrow-right-white.svg" />
          <a
            @click="clickedButton(item.link)"
            class="link"
            v-text="$prismic.asText(item.link_title)"
          />
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