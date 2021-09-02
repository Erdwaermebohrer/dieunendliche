<template>
  <div :class="'page page__' + uid">
    <h1>{{ uid }} Page</h1>
    <slice-wrapper :slices="slices" />
  </div>
</template>

<script>
import SliceWrapper from '../components/prismic/SlicesWrapper.vue';

export default {
  components: {
    "slice-wrapper": SliceWrapper
  },
  data() {
    return {
      slices: [],
      uid: 'internal'
    }
  },
  async asyncData({ $prismic, params, error }) {
    try {
      const result = await $prismic.api.getByUID('page', params.uid)
      return {
        slices: result.data.body,
        uid: params.uid
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
}
</script>