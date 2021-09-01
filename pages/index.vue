<template>
  <div class="page page__home">
    <h1>Home Page</h1>
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
      const result = await $prismic.api.getSingle('homepage');
      return {
        page: result.data
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
}
</script>