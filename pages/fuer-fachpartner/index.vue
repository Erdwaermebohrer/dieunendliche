<template>
  <div class="page page__partners">
    <h1>Fachpartner Page</h1>
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
      const result = await $prismic.api.getSingle('partners');
      return {
        page: result.data
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
}
</script>