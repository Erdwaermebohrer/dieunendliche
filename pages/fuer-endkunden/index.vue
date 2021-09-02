<template>
  <div class="page page__clients">
    <h1>Endkunden Page</h1>
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
  async asyncData({ $prismic, error }) {
    try {
      const result = await $prismic.api.getSingle('clients');
      return {
        page: result.data
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
}
</script>