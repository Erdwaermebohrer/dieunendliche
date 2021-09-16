<template>
  <div class="container">
    <transition name="fade-preloader" mode="in-out">
      <app-preloader v-if="pageLoading"/>
    </transition>
    <app-header :inputData="header" />
    <Nuxt />
    <app-footer :inputData="footer" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "../components/layout/Header.vue";
import Footer from "../components/layout/Footer.vue";
import Preloader from "../components/layout/Preloader.vue";

export default {
  components: {
    "app-header": Header,
    "app-footer": Footer,
    "app-preloader": Preloader,
  },
  computed: {
    ...mapGetters({
      header: "header",
      footer: "footer",
      pageLoading: "pageLoading",
    }),
  },
  methods: {
    ...mapActions(["setPageLoading"]),
  },
  mounted() {
    setTimeout(() => {
      this.setPageLoading(false);
    }, 1500);
  },
};
</script>