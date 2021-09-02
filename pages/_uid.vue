<template>
  <div class="page page__internal">
    <h1>Internal Page</h1>
    {{ page }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: []
    }
  },
  async asyncData({ app, $prismic, params, error, store }) {
    try {
      const result = await $prismic.api.getByUID('page', params.uid)
      return {
        page: result.data
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
}
</script>