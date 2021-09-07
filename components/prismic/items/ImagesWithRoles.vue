<template>
  <div class="images-with-roles__wrapper" :style="{'background-color': slice.primary.color}">
    <h2 class="images-with-roles__wrapper--title"  v-text="$prismic.asText(slice.primary.title1)"/>
    <div class="images-with-roles__wrapper--images">
      <div v-for="(item, index) in slice.items" :key="'item-' + index" class="role-image__wrapper">
        <div class="role-image__wrapper--image">
          <img class="image" :src="item.image1.url" />
        </div>
        <div class="role-image__wrapper--content">
          <div class="name" v-text="$prismic.asText(item.name)"/>
          <div class="role" v-text="$prismic.asText(item.role)"/>
          <div class="link__wrapper">
            <img class="icon" src="~assets/svg/arrow-right-white.svg" />
            <a class="link" @click="clickedButton(item.link)" v-text="$prismic.asText(item.link_title)" />
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
    clickedButton: {
      type: Function,
    },
  },
};
</script>