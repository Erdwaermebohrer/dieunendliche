const pkg = require("./package");

export default {
  target: "static",
  publicRuntimeConfig: {},
  privateRuntimeConfig: {},
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }]
  },
  css: [{ src: "@assets/scss/global.scss", lang: "scss" }],
  plugins: [
    { src: "~plugins/vue-agile.js", ssr: false },
    { src: "~plugins/cookieconsent.js", ssr: false },
    { src: "~/plugins/prismicLinks", ssr: false }
  ],
  modules: [
    "@nuxtjs/axios",
    "nuxt-lazy-load",
    "@nuxtjs/prismic",
    "@nuxtjs/pwa"
  ],
  pwa: {
    workbox: {
      clientsClaim: true
    },
    manifest: {
      name: "Nuxt Prismic Scaffold",
      lang: "de",
      useWebmanifestExtension: false
    },
    meta: { theme_color: "#000000", lang: "de", nativeUI: true },
    icon: "icon.png"
  },
  prismic: {
    endpoint: process.env.PRISMIC_API_ENDPOINT,
    disableGenerator: false,
    modern: true,
    preview: false,
    components: false
  },
  buildModules: ["@nuxtjs/prismic"],
  build: {
    extend(config, ctx) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
    }
  },
  generate: {
    fallback: "404.html"
  }
};
