<template>
  <div class="container">
    <app-header :inputData="header" />
    <Nuxt />
    <app-footer :inputData="footer" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';

export default {
  components: {
    "app-header": Header,
    "app-footer": Footer
  },
  computed: {
  ...mapGetters({
      header: 'header',
      footer: 'footer'
    })
}
};
</script>
<style lang="scss">
</style>