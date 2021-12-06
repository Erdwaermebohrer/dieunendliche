<template>
  <div class="images-with-link__wrapper">
    <a
      class="images-with-link__wrapper--item"
      @click="clickedButton(item.link)"
      v-for="(item, index) in slice.items"
      :key="'image-' + index"
      :style="'border-bottom: 9px solid '+item.border_color"
    >

      <div v-if="item.color" class="images-with-link__wrapper--item__layer" :style="'background-color:'+item.color" />
      <img class="image" :data-src="item.image.url" v-lazy-load/>
      
      <div class="content__wrapper">
        <h2
          class="content__wrapper--title"
          v-text="$prismic.asText(item.title)"
        />
        <div class="content__wrapper--link">
          <img class="icon" src="~assets/svg/arrow-right-white.svg" />
          
          <span
            class="link"
            v-text="$prismic.asText(item.link_title)"
          />
        </div>
      </div>
    </a>
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