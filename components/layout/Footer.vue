<template>
  <div class="footer__wrapper">
    <div class="footer__wrapper--navigation">
      <ul class="navigation__wrapper">
        <nuxt-link
          class="link-item"
          v-for="(navigationItem, index) in inputData.navigation"
          :key="'item-' + index"
          :to="$prismic.linkResolver(navigationItem.page)"
        >
          <li v-text="$prismic.asText(navigationItem.navigation_title)" />
        </nuxt-link>
      </ul>
    </div>
    <div class="footer__wrapper--content">
      <div class="title" v-text="$prismic.asText(inputData.title)" />
      <img class="logo" :src="inputData.logo.url" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-footer',
  props: {
    inputData: {
      type: Object
    }
  }
}
</script>