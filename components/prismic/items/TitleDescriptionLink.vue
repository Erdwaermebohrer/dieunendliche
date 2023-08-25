<template>
  <div class="title-description-link__wrapper" :style="{'background-color': slice.primary.color}">
    <div class="title-description-link__wrapper--title">
      <span class="title-description-link__wrapper--title__number" v-if="slice.primary.number">
        — {{slice.primary.number}}
      </span>
      <h2 class="title" v-text="$prismic.asText(slice.primary.title)" />
    </div>
    <div class="title-description-link__wrapper--content">
      <div
        class="description"
        v-html="$prismic.asText(slice.primary.description)"
      />
      <div class="link__wrapper">
        <div>
          <a 
            v-if="slice.primary.link && slice.primary.link.link_type != 'Web' && $prismic.asText(slice.primary.link_title)"
            class="link__wrapper--link"
            target="_blank"
            :href="$prismic.linkResolver(slice.primary.link)"
          >
            <img
              class="link__wrapper--icon"
              src="~assets/svg/arrow-right-white.svg"
            />
            <span>{{$prismic.asText(slice.primary.link_title)}}</span>
          </a>
          <a 
            v-if="slice.primary.link && slice.primary.link.link_type == 'Web'  && $prismic.asText(slice.primary.link_title)"
            class="link__wrapper--link"
            target="_blank"
            :href="slice.primary.link.url"
          >
            <img
              class="link__wrapper--icon"
              src="~assets/svg/arrow-right-white.svg"
            />
            <span>{{$prismic.asText(slice.primary.link_title)}}</span>
          </a>
          <div v-for="(item, index) in slice.items" v-if="item.link_title && item.link_url">
            <a
              class="link__wrapper--link"
              target="_blank"
              :href="$prismic.linkResolver(item.link_url)">
              <img
                class="link__wrapper--icon"
                src="~assets/svg/arrow-right-white.svg"
              />
              <span>{{$prismic.asText(item.link_title)}}</span>
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