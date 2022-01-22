<template>
  <div class="logobar__wrapper">
    <div class="logobar__wrapper--content">
      <h2 class="title"  v-text="$prismic.asText(slice.primary.title)"/>

      <div>
      	<div class="description"  v-html="$prismic.asText(slice.primary.description)"/>

      	<div class="logobar">
          <div  v-for="(item, index) in slice.items" :key="'item-' + index">
            <nuxt-link
              v-if="item.link.link_type != 'Web'"
              :to="$prismic.linkResolver(item.link)"
              :key="'logo-' + index"
            >
              <picture >
               <img class="image" :data-src="item.logo.url" v-lazy-load/>
              </picture>
            </nuxt-link>

            <a
              v-if="item.link.link_type == 'Web'"
              :href="item.link.url"
              :target="item.link.target"
              :key="'logo-' + index"
            >
              <picture>
               <img class="image" :data-src="item.logo.url" v-lazy-load/>
              </picture>
            </a>
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